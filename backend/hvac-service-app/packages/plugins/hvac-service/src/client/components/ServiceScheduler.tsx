import React, { FC, useState, useEffect } from 'react';
import { Calendar, Badge, Modal, Form, Select, Input, DatePicker, Button, message } from 'antd';
import { useAPIClient, useRequest } from '@nocobase/client';
import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;

interface ServiceRequest {
  id: string;
  title: string;
  status: string;
  priority: string;
  scheduledDate: string;
  customer: {
    id: string;
    name: string;
  };
  assignedTechnician?: {
    id: string;
    name: string;
  };
}

interface Technician {
  id: string;
  name: string;
  specialization: string;
  status: string;
}

interface Customer {
  id: string;
  name: string;
}

export const ServiceScheduler: FC = () => {
  const api = useAPIClient();
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);
  const [form] = Form.useForm();

  // Fetch service requests
  const { loading: requestsLoading, refresh: refreshRequests } = useRequest(
    {
      url: 'serviceRequests:list',
      params: {
        appends: ['customer', 'assignedTechnician'],
      },
    },
    {
      onSuccess: (data) => {
        setServiceRequests(data.data);
      },
    },
  );

  // Fetch technicians
  const { loading: techniciansLoading } = useRequest(
    {
      url: 'technicians:list',
    },
    {
      onSuccess: (data) => {
        setTechnicians(data.data);
      },
    },
  );

  // Fetch customers
  const { loading: customersLoading } = useRequest(
    {
      url: 'customers:list',
    },
    {
      onSuccess: (data) => {
        setCustomers(data.data);
      },
    },
  );

  const loading = requestsLoading || techniciansLoading || customersLoading;

  const dateCellRender = (value: moment.Moment) => {
    const date = value.format('YYYY-MM-DD');
    const listData = serviceRequests.filter((item) => {
      return item.scheduledDate && moment(item.scheduledDate).format('YYYY-MM-DD') === date;
    });

    return (
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {listData.map((item) => (
          <li key={item.id} style={{ marginBottom: '3px' }}>
            <Badge
              status={getBadgeStatus(item.status)}
              text={`${item.title.substring(0, 12)}${item.title.length > 12 ? '...' : ''}`}
            />
          </li>
        ))}
      </ul>
    );
  };

  const getBadgeStatus = (status: string) => {
    switch (status) {
      case 'new':
        return 'processing';
      case 'scheduled':
        return 'warning';
      case 'in_progress':
        return 'warning';
      case 'on_hold':
        return 'default';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleDateSelect = (date: moment.Moment) => {
    setSelectedDate(date);
    setIsModalVisible(true);
    form.setFieldsValue({
      scheduledDate: date,
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleCreateServiceRequest = async (values: any) => {
    try {
      await api.resource('serviceRequests').create({
        values: {
          ...values,
          status: 'scheduled',
          scheduledDate: values.scheduledDate.toISOString(),
        },
      });
      message.success('Service request scheduled successfully');
      setIsModalVisible(false);
      form.resetFields();
      refreshRequests();
    } catch (error) {
      message.error('Failed to schedule service request');
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Calendar dateCellRender={dateCellRender} onSelect={handleDateSelect} loading={loading} />

      <Modal
        title="Schedule Service Request"
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateServiceRequest}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter a title' }]}
          >
            <Input placeholder="Service Request Title" />
          </Form.Item>

          <Form.Item
            name="customerId"
            label="Customer"
            rules={[{ required: true, message: 'Please select a customer' }]}
          >
            <Select placeholder="Select Customer">
              {customers.map((customer) => (
                <Option key={customer.id} value={customer.id}>
                  {customer.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="technicianId"
            label="Technician"
          >
            <Select placeholder="Select Technician">
              {technicians
                .filter((tech) => tech.status === 'available')
                .map((technician) => (
                  <Option key={technician.id} value={technician.id}>
                    {technician.name} - {technician.specialization}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="serviceType"
            label="Service Type"
            rules={[{ required: true, message: 'Please select a service type' }]}
          >
            <Select placeholder="Select Service Type">
              <Option value="installation">Installation</Option>
              <Option value="repair">Repair</Option>
              <Option value="maintenance">Maintenance</Option>
              <Option value="inspection">Inspection</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="priority"
            label="Priority"
            initialValue="medium"
            rules={[{ required: true, message: 'Please select a priority' }]}
          >
            <Select placeholder="Select Priority">
              <Option value="low">Low</Option>
              <Option value="medium">Medium</Option>
              <Option value="high">High</Option>
              <Option value="emergency">Emergency</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="scheduledDate"
            label="Scheduled Date & Time"
            rules={[{ required: true, message: 'Please select a date and time' }]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <TextArea rows={4} placeholder="Service request description" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              Schedule
            </Button>
            <Button onClick={handleModalCancel}>Cancel</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ServiceScheduler;