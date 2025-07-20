import React, { useState } from 'react';
import { Calendar, Badge, Modal, Form, Input, Select, DatePicker, Button, message } from 'antd';
import { useRequest } from '@nocobase/client';
import moment from 'moment';

const { TextArea } = Input;
const { Option } = Select;

const priorityColors = {
  low: 'blue',
  medium: 'green',
  high: 'orange',
  emergency: 'red'
};

export const TechnicianSchedule = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [form] = Form.useForm();

  const { data: technicians } = useRequest({
    resource: 'technicians',
    action: 'list',
    params: {
      pageSize: 1000
    }
  });

  const { data: customers } = useRequest({
    resource: 'customers',
    action: 'list',
    params: {
      pageSize: 1000
    }
  });

  const { data: serviceRequests, refresh } = useRequest({
    resource: 'serviceRequests',
    action: 'list',
    params: {
      pageSize: 1000,
      appends: ['customer', 'technician']
    }
  });

  const { run: createServiceRequest } = useRequest({
    resource: 'serviceRequests',
    action: 'create',
  }, {
    manual: true,
    onSuccess: () => {
      message.success('Service request created successfully');
      setIsModalVisible(false);
      form.resetFields();
      refresh();
    },
    onError: () => {
      message.error('Failed to create service request');
    }
  });

  const getListData = (value) => {
    if (!serviceRequests?.data) return [];
    
    return serviceRequests.data
      .filter(item => {
        if (!item.scheduledDate) return false;
        const scheduledDate = moment(item.scheduledDate);
        return scheduledDate.isSame(value, 'day');
      })
      .map(item => ({
        type: item.priority,
        content: `${item.customer?.name || 'Unknown'}: ${item.description.substring(0, 30)}...`,
        technician: item.technician?.name || 'Unassigned'
      }));
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {listData.map((item, index) => (
          <li key={index}>
            <Badge 
              color={priorityColors[item.type] || 'blue'} 
              text={<span style={{ fontSize: '10px' }}>{item.content} ({item.technician})</span>} 
            />
          </li>
        ))}
      </ul>
    );
  };

  const handleDateSelect = (value) => {
    setSelectedDate(value);
    setIsModalVisible(true);
    form.setFieldsValue({
      scheduledDate: value
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = (values) => {
    createServiceRequest({
      values: {
        ...values,
        status: 'scheduled',
        scheduledDate: values.scheduledDate.toISOString()
      }
    });
  };

  return (
    <div style={{ padding: '24px' }}>
      <h1>Technician Schedule</h1>
      <p>Click on a date to schedule a new service request</p>
      
      <Calendar 
        dateCellRender={dateCellRender} 
        onSelect={handleDateSelect}
      />
      
      <Modal
        title="Schedule Service Request"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="customer"
            label="Customer"
            rules={[{ required: true, message: 'Please select a customer' }]}
          >
            <Select placeholder="Select a customer">
              {customers?.data?.map(customer => (
                <Option key={customer.id} value={customer.id}>{customer.name}</Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            name="technician"
            label="Technician"
            rules={[{ required: true, message: 'Please select a technician' }]}
          >
            <Select placeholder="Select a technician">
              {technicians?.data?.map(technician => (
                <Option key={technician.id} value={technician.id}>{technician.name}</Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter a description' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          
          <Form.Item
            name="priority"
            label="Priority"
            initialValue="medium"
          >
            <Select>
              <Option value="low">Low</Option>
              <Option value="medium">Medium</Option>
              <Option value="high">High</Option>
              <Option value="emergency">Emergency</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="scheduledDate"
            label="Scheduled Date"
            rules={[{ required: true, message: 'Please select a date' }]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm" />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Schedule Service
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TechnicianSchedule;