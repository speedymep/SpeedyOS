import React from 'react';
import { Card, Row, Col, Statistic, List, Tag, Calendar, Badge } from 'antd';
import { 
  UserOutlined, 
  ToolOutlined, 
  ClockCircleOutlined, 
  CheckCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { useRequest } from '@nocobase/client';
import moment from 'moment';

const priorityColors = {
  low: 'blue',
  medium: 'green',
  high: 'orange',
  emergency: 'red'
};

const statusIcons = {
  new: <ExclamationCircleOutlined style={{ color: '#1890ff' }} />,
  assigned: <UserOutlined style={{ color: '#52c41a' }} />,
  scheduled: <ClockCircleOutlined style={{ color: '#faad14' }} />,
  in_progress: <ToolOutlined style={{ color: '#722ed1' }} />,
  completed: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
  cancelled: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />
};

export const HVACDashboard = () => {
  const { data: customers } = useRequest({
    resource: 'customers',
    action: 'list',
    params: {
      pageSize: 1000
    }
  });

  const { data: technicians } = useRequest({
    resource: 'technicians',
    action: 'list',
    params: {
      pageSize: 1000
    }
  });

  const { data: serviceRequests } = useRequest({
    resource: 'serviceRequests',
    action: 'list',
    params: {
      pageSize: 1000,
      sort: ['-createdAt'],
      appends: ['customer', 'technician']
    }
  });

  const { data: equipment } = useRequest({
    resource: 'equipment',
    action: 'list',
    params: {
      pageSize: 1000
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
        content: `${item.customer?.name || 'Unknown'}: ${item.description.substring(0, 30)}...`
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
              text={<span style={{ fontSize: '10px' }}>{item.content}</span>} 
            />
          </li>
        ))}
      </ul>
    );
  };

  const recentServiceRequests = serviceRequests?.data?.slice(0, 5) || [];
  
  const pendingServiceRequests = serviceRequests?.data?.filter(
    item => ['new', 'assigned', 'scheduled', 'in_progress'].includes(item.status)
  ) || [];

  return (
    <div style={{ padding: '24px' }}>
      <h1>HVAC Service Dashboard</h1>
      
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Total Customers" 
              value={customers?.data?.length || 0} 
              prefix={<UserOutlined />} 
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Total Technicians" 
              value={technicians?.data?.length || 0} 
              prefix={<ToolOutlined />} 
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Pending Service Requests" 
              value={pendingServiceRequests.length} 
              prefix={<ClockCircleOutlined />} 
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Total Equipment" 
              value={equipment?.data?.length || 0} 
              prefix={<ToolOutlined />} 
            />
          </Card>
        </Col>
      </Row>
      
      <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
        <Col span={12}>
          <Card title="Recent Service Requests">
            <List
              dataSource={recentServiceRequests}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Tag color={priorityColors[item.priority]}>{item.priority}</Tag>
                  ]}
                >
                  <List.Item.Meta
                    avatar={statusIcons[item.status]}
                    title={`${item.customer?.name || 'Unknown Customer'}`}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Service Schedule">
            <Calendar 
              fullscreen={false} 
              dateCellRender={dateCellRender} 
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HVACDashboard;