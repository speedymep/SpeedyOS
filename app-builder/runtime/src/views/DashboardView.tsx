import styled from 'styled-components';
import FeatherIcon from 'feather-icons-react';

const DashboardContainer = styled.div`
  padding: 1.5rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const StatCard = styled.div`
  background-color: #1E2A3A;
  border-radius: 0.5rem;
  padding: 1rem;
`;

const StatTitle = styled.div`
  color: #B0BEC5;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div<{ color?: string }>`
  font-size: 2rem;
  font-weight: bold;
  color: ${props => props.color || '#FFFFFF'};
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 1.5rem;
`;

const DashboardCard = styled.div`
  background-color: #1E2A3A;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  color: #FFFFFF;
  display: flex;
  align-items: center;
`;

const CardBadge = styled.span`
  background-color: #00E676;
  color: #000000;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  margin-left: 0.75rem;
`;

const CardButton = styled.button`
  background-color: #00B2FF;
  color: #FFFFFF;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: bold;
  cursor: pointer;
`;

const MessageItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background-color: #121926;
  margin-bottom: 0.75rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const MessageAvatar = styled.div<{ bgColor: string }>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: ${props => props.bgColor};
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 0.75rem;
`;

const MessageContent = styled.div`
  flex: 1;
`;

const MessageName = styled.div`
  font-weight: bold;
  color: #FFFFFF;
  margin-bottom: 0.25rem;
`;

const MessageText = styled.div`
  color: #B0BEC5;
  font-size: 0.875rem;
`;

const MessageTime = styled.div`
  color: #607D8B;
  font-size: 0.75rem;
`;

const MessageStatus = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #00E676;
  margin-left: 0.5rem;
`;

const WorkOrderItem = styled.div`
  position: relative;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #121926;
  margin-bottom: 0.75rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const WorkOrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const WorkOrderNumber = styled.div`
  color: #00B2FF;
  font-weight: bold;
`;

const WorkOrderPriority = styled.div<{ priority: string }>`
  background-color: ${props => {
    switch (props.priority) {
      case 'High': return '#FF3D00';
      case 'Medium': return '#FFA000';
      case 'Low': return '#00E676';
      default: return '#B0BEC5';
    }
  }};
  color: ${props => props.priority === 'Low' ? '#000000' : '#FFFFFF'};
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: bold;
`;

const WorkOrderCustomer = styled.div`
  color: #FFFFFF;
  font-weight: bold;
  margin-bottom: 0.25rem;
`;

const WorkOrderService = styled.div`
  color: #B0BEC5;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
`;

const WorkOrderStatus = styled.div`
  color: #B0BEC5;
  font-size: 0.875rem;
`;

const WorkOrderActions = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #607D8B;
  cursor: pointer;
`;

const TechnicianItem = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #121926;
  margin-bottom: 0.75rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const TechnicianHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const TechnicianName = styled.div`
  color: #FFFFFF;
  font-weight: bold;
`;

const TechnicianStatus = styled.div<{ status: string }>`
  background-color: ${props => {
    switch (props.status) {
      case 'On Site': return '#00B2FF';
      case 'Available': return '#00E676';
      case 'En Route': return '#00B2FF';
      default: return '#B0BEC5';
    }
  }};
  color: ${props => props.status === 'Available' ? '#000000' : '#FFFFFF'};
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: bold;
`;

const TechnicianLocation = styled.div`
  display: flex;
  align-items: center;
  color: #B0BEC5;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
`;

const TechnicianJob = styled.div`
  display: flex;
  align-items: center;
  color: #B0BEC5;
  font-size: 0.875rem;
`;

const QuickActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const QuickActionButton = styled.button<{ bgColor: string; textColor: string }>`
  background-color: ${props => props.bgColor};
  color: ${props => props.textColor};
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    margin-right: 0.5rem;
  }
`;

const WorkflowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const WorkflowStep = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  flex: 1;
  
  &:last-child {
    flex: 0;
  }
`;

const WorkflowIcon = styled.div<{ active: boolean; completed: boolean }>`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${props => props.completed ? '#00E676' : props.active ? '#00B2FF' : '#607D8B'};
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WorkflowLine = styled.div<{ active: boolean; completed: boolean }>`
  height: 2px;
  background-color: ${props => props.completed ? '#00E676' : props.active ? '#00B2FF' : '#607D8B'};
  flex: 1;
  margin: 0 0.5rem;
`;

interface DashboardViewProps {
  data: any;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ data }) => {
  return (
    <DashboardContainer>
      <StatsGrid>
        <StatCard>
          <StatTitle>Active Jobs</StatTitle>
          <StatValue color="#00B2FF">{data.dashboardStats.activeJobs}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>SMS Response Rate</StatTitle>
          <StatValue color="#00E676">{data.dashboardStats.smsResponseRate}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>Tech Utilization</StatTitle>
          <StatValue color="#FFA000">{data.dashboardStats.techUtilization}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>Customer Satisfaction</StatTitle>
          <StatValue color="#00E5B8">{data.dashboardStats.customerSatisfaction}</StatValue>
        </StatCard>
      </StatsGrid>
      
      <DashboardGrid>
        <div>
          <DashboardCard>
            <CardHeader>
              <CardTitle>
                <FeatherIcon icon="message-circle" size={20} style={{ marginRight: '0.5rem' }} />
                Ninja Communications
                <CardBadge>5 Unread</CardBadge>
              </CardTitle>
            </CardHeader>
            
            {data.messages.map((message: any) => (
              <MessageItem key={message.id}>
                <MessageAvatar bgColor={message.sender.id === '1' ? '#1E88E5' : message.sender.id === '2' ? '#E91E63' : '#FF9800'}>
                  {message.sender.name.charAt(0)}
                </MessageAvatar>
                <MessageContent>
                  <MessageName>{message.sender.name}</MessageName>
                  <MessageText>{message.content}</MessageText>
                </MessageContent>
                <MessageTime>{message.sentAt.substring(11, 16)}</MessageTime>
                {!message.read && <MessageStatus />}
              </MessageItem>
            ))}
          </DashboardCard>
        </div>
        
        <div>
          <DashboardCard>
            <CardHeader>
              <CardTitle>
                <FeatherIcon icon="clipboard" size={20} style={{ marginRight: '0.5rem' }} />
                Active Work Orders
              </CardTitle>
              <CardButton>New Order</CardButton>
            </CardHeader>
            
            {data.workOrders.map((workOrder: any) => (
              <WorkOrderItem key={workOrder.id}>
                <WorkOrderHeader>
                  <WorkOrderNumber>#{workOrder.workOrderNumber}</WorkOrderNumber>
                  <WorkOrderPriority priority={workOrder.priority}>{workOrder.priority}</WorkOrderPriority>
                </WorkOrderHeader>
                <WorkOrderCustomer>{workOrder.customer.name}</WorkOrderCustomer>
                <WorkOrderService>{workOrder.serviceType}</WorkOrderService>
                <WorkOrderStatus>{workOrder.status}</WorkOrderStatus>
                <WorkOrderActions>
                  <FeatherIcon icon="more-vertical" size={18} />
                </WorkOrderActions>
              </WorkOrderItem>
            ))}
          </DashboardCard>
        </div>
        
        <div>
          <DashboardCard>
            <CardHeader>
              <CardTitle>
                <FeatherIcon icon="users" size={20} style={{ marginRight: '0.5rem' }} />
                Team Status
              </CardTitle>
            </CardHeader>
            
            {data.technicians.map((technician: any) => (
              <TechnicianItem key={technician.id}>
                <TechnicianHeader>
                  <TechnicianName>{technician.name}</TechnicianName>
                  <TechnicianStatus status={technician.status}>{technician.status}</TechnicianStatus>
                </TechnicianHeader>
                <TechnicianLocation>
                  <FeatherIcon icon="map-pin" size={14} style={{ marginRight: '0.5rem', color: '#607D8B' }} />
                  {technician.currentLocation}
                </TechnicianLocation>
                <TechnicianJob>
                  <FeatherIcon icon="clipboard" size={14} style={{ marginRight: '0.5rem', color: '#607D8B' }} />
                  Job: {technician.currentJob ? `#${technician.currentJob}` : 'None'}
                </TechnicianJob>
              </TechnicianItem>
            ))}
          </DashboardCard>
          
          <DashboardCard>
            <CardHeader>
              <CardTitle>
                <FeatherIcon icon="zap" size={20} style={{ marginRight: '0.5rem' }} />
                Quick Actions
              </CardTitle>
            </CardHeader>
            
            <QuickActionsContainer>
              <QuickActionButton bgColor="#00E676" textColor="#000000">
                <FeatherIcon icon="plus" size={18} />
                Create Work Order
              </QuickActionButton>
              <QuickActionButton bgColor="#00B2FF" textColor="#FFFFFF">
                <FeatherIcon icon="send" size={18} />
                Send Mass SMS
              </QuickActionButton>
              <QuickActionButton bgColor="#FF3D00" textColor="#FFFFFF">
                <FeatherIcon icon="alert-circle" size={18} />
                Emergency Dispatch
              </QuickActionButton>
            </QuickActionsContainer>
          </DashboardCard>
        </div>
      </DashboardGrid>
      
      <DashboardCard>
        <CardHeader>
          <CardTitle>
            <FeatherIcon icon="git-branch" size={20} style={{ marginRight: '0.5rem' }} />
            Workflow Designer
          </CardTitle>
        </CardHeader>
        
        <WorkflowContainer>
          <WorkflowStep active={false}>
            <WorkflowIcon active={false} completed={true}>
              <FeatherIcon icon="check" size={16} />
            </WorkflowIcon>
            <WorkflowLine active={false} completed={true} />
          </WorkflowStep>
          
          <WorkflowStep active={false}>
            <WorkflowIcon active={false} completed={true}>
              <FeatherIcon icon="check" size={16} />
            </WorkflowIcon>
            <WorkflowLine active={false} completed={true} />
          </WorkflowStep>
          
          <WorkflowStep active={false}>
            <WorkflowIcon active={false} completed={true}>
              <FeatherIcon icon="check" size={16} />
            </WorkflowIcon>
            <WorkflowLine active={true} completed={false} />
          </WorkflowStep>
          
          <WorkflowStep active={true}>
            <WorkflowIcon active={true} completed={false}>
              <FeatherIcon icon="circle" size={16} />
            </WorkflowIcon>
            <WorkflowLine active={false} completed={false} />
          </WorkflowStep>
          
          <WorkflowStep active={false}>
            <WorkflowIcon active={false} completed={false}>
              <FeatherIcon icon="circle" size={16} />
            </WorkflowIcon>
            <WorkflowLine active={false} completed={false} />
          </WorkflowStep>
          
          <WorkflowStep active={false}>
            <WorkflowIcon active={false} completed={false}>
              <FeatherIcon icon="circle" size={16} />
            </WorkflowIcon>
          </WorkflowStep>
        </WorkflowContainer>
      </DashboardCard>
    </DashboardContainer>
  );
};