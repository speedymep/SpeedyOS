import React, { FC, useEffect, useState } from 'react';
import { Card, Col, Row, Statistic, Table, Tag, Typography, Space } from 'antd';
import { useAPIClient, useRequest } from '@nocobase/client';
import { 
  UserOutlined, 
  ToolOutlined, 
  ScheduleOutlined, 
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  StopOutlined
} from '@ant-design/icons';

const { Title } = Typography;

const statusColors = {
  new: 'blue',
  scheduled: 'purple',
  in_progress: 'orange',
  on_hold: 'gold',
  completed: 'green',
  cancelled: 'red',
};

const priorityColors = {
  low: 'green',
  medium: 'blue',
  high: 'orange',
  emergency: 'red',
};

export const Dashboard: FC = () => {
  const api = useAPIClient();
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalTechnicians: 0,
    totalServiceRequests: 0,
    completedServiceRequests: 0,
  });
  const [recentServiceRequests, setRecentServiceRequests] = useState([]);

  const { loading: statsLoading } = useRequest(
    {
      url: 'customers:count',
    },
    {
      onSuccess: (data) => {
        setStats((prev) => ({ ...prev, totalCustomers: data.data }));
      },
    },
  );

  const { loading: techLoading } = useRequest(
    {
      url: 'technicians:count',
    },
    {
      onSuccess: (data) => {
        setStats((prev) => ({ ...prev, totalTechnicians: data.data }));
      },
    },
  );

  const { loading: serviceLoading } = useRequest(
    {
      url: 'serviceRequests:count',
    },
    {
      onSuccess: (data) => {
        setStats((prev) => ({ ...prev, totalServiceRequests: data.data }));
      },
    },
  );

  const { loading: completedLoading } = useRequest(
    {
      url: 'serviceRequests:count',
      params: {
        filter: {
          status: 'completed',
        },
      },
    },
    {
      onSuccess: (data) => {
        setStats((prev) => ({ ...prev, completedServiceRequests: data.data }));
      },
    },
  );

  const { loading: recentLoading } = useRequest(
    {
      url: 'serviceRequests:list',
      params: {
        sort: ['-requestDate'],
        pageSize: 5,
        appends: ['customer', 'assignedTechnician'],
      },
    },
    {
      onSuccess: (data) => {
        setRecentServiceRequests(data.data);
      },
    },
  );

  const loading = statsLoading || techLoading || serviceLoading || completedLoading || recentLoading;

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
      render: (customer) => customer?.name || 'N/A',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={statusColors[status] || 'default'}>
          {status?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => (
        <Tag color={priorityColors[priority] || 'default'}>
          {priority?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Technician',
      dataIndex: 'assignedTechnician',
      key: 'assignedTechnician',
      render: (technician) => technician?.name || 'Not Assigned',
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>HVAC Service Dashboard</Title>
      
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Customers"
              value={stats.totalCustomers}
              prefix={<UserOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Technicians"
              value={stats.totalTechnicians}
              prefix={<ToolOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Service Requests"
              value={stats.totalServiceRequests}
              prefix={<ScheduleOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Completed Requests"
              value={stats.completedServiceRequests}
              prefix={<CheckCircleOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Recent Service Requests" style={{ marginBottom: '24px' }}>
        <Table
          dataSource={recentServiceRequests}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={false}
        />
      </Card>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Service Request Status">
            <Space direction="vertical" style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span><Tag color="blue">NEW</Tag> New Requests</span>
                <span>Awaiting scheduling</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span><Tag color="purple">SCHEDULED</Tag> Scheduled</span>
                <span>Appointment set</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span><Tag color="orange">IN PROGRESS</Tag> In Progress</span>
                <span>Work being performed</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span><Tag color="gold">ON HOLD</Tag> On Hold</span>
                <span>Temporarily paused</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span><Tag color="green">COMPLETED</Tag> Completed</span>
                <span>Work finished</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span><Tag color="red">CANCELLED</Tag> Cancelled</span>
                <span>Service cancelled</span>
              </div>
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Priority Levels">
            <Space direction="vertical" style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span><Tag color="green">LOW</Tag> Low Priority</span>
                <span>Routine maintenance</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span><Tag color="blue">MEDIUM</Tag> Medium Priority</span>
                <span>Standard service</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span><Tag color="orange">HIGH</Tag> High Priority</span>
                <span>Urgent attention needed</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span><Tag color="red">EMERGENCY</Tag> Emergency</span>
                <span>Immediate response required</span>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;