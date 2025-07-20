import styled from 'styled-components';
import FeatherIcon from 'feather-icons-react';

const MobileContainer = styled.div`
  max-width: 480px;
  margin: 0 auto;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #121926;
  border-left: 1px solid #263238;
  border-right: 1px solid #263238;
`;

const MobileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #121926;
  border-bottom: 1px solid #1E2A3A;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserAvatar = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin-right: 0.75rem;
`;

const UserName = styled.div`
  color: #FFFFFF;
  font-weight: bold;
`;

const NotificationIcon = styled.div`
  position: relative;
`;

const NotificationBadge = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #FF3D00;
  color: #FFFFFF;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CurrentJobSection = styled.div`
  padding: 1rem;
  background-color: #121926;
  border-bottom: 1px solid #1E2A3A;
`;

const StatusBadge = styled.div`
  display: inline-block;
  background-color: #00B2FF;
  color: #FFFFFF;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const ElapsedTime = styled.div`
  color: #B0BEC5;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const JobTitle = styled.div`
  color: #FFFFFF;
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const ProgressBar = styled.div`
  height: 0.5rem;
  background-color: #1E2A3A;
  border-radius: 0.25rem;
  margin-bottom: 1.5rem;
  position: relative;
  overflow: hidden;
`;

const ProgressValue = styled.div<{ value: number }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${props => `${props.value}%`};
  background-color: #00E676;
  border-radius: 0.25rem;
`;

const ActionButtons = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`;

const ActionButton = styled.button<{ variant?: string }>`
  flex: 1;
  background-color: ${props => props.variant === 'success' ? '#00E676' : '#00B2FF'};
  color: ${props => props.variant === 'success' ? '#000000' : '#FFFFFF'};
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem;
  font-size: 0.875rem;
  font-weight: bold;
  cursor: pointer;
  margin-right: ${props => props.variant === 'success' ? '0' : '0.5rem'};
`;

const TodaysJobsSection = styled.div`
  padding: 1rem;
  background-color: #121926;
  border-bottom: 1px solid #1E2A3A;
  flex: 1;
  overflow-y: auto;
`;

const SectionTitle = styled.div`
  color: #FFFFFF;
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const JobCard = styled.div`
  background-color: #1E2A3A;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 0.75rem;
  position: relative;
`;

const JobTime = styled.div`
  display: flex;
  align-items: center;
  color: #B0BEC5;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const JobCustomer = styled.div`
  color: #FFFFFF;
  font-weight: bold;
  margin-bottom: 0.25rem;
`;

const JobLocation = styled.div`
  display: flex;
  align-items: center;
  color: #B0BEC5;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
`;

const JobType = styled.div`
  display: flex;
  align-items: center;
  color: #B0BEC5;
  font-size: 0.875rem;
`;

const JobStatus = styled.div<{ status: string }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: ${props => {
    switch (props.status) {
      case 'In Progress': return '#00B2FF';
      case 'Scheduled': return '#FFA000';
      default: return '#B0BEC5';
    }
  }};
  color: #FFFFFF;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: bold;
`;

const ChatSection = styled.div`
  padding: 1rem;
  background-color: #121926;
  border-bottom: 1px solid #1E2A3A;
`;

const CustomerInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const CustomerAvatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: #1E88E5;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 0.75rem;
`;

const CustomerName = styled.div`
  color: #FFFFFF;
  font-weight: bold;
  margin-bottom: 0.25rem;
`;

const CustomerJobBadge = styled.div`
  background-color: #1E2A3A;
  color: #B0BEC5;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
`;

const ChatMessages = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const CustomerMessage = styled.div`
  color: #FFFFFF;
  background-color: #1E2A3A;
  padding: 0.75rem;
  border-radius: 1rem 1rem 1rem 0;
  margin-bottom: 0.75rem;
  max-width: 80%;
  align-self: flex-start;
`;

const TechnicianMessage = styled.div`
  color: #FFFFFF;
  background-color: #00B2FF;
  padding: 0.75rem;
  border-radius: 1rem 1rem 0 1rem;
  margin-bottom: 0.75rem;
  max-width: 80%;
  align-self: flex-end;
`;

const QuickReplies = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const QuickReply = styled.button`
  background-color: #1E2A3A;
  color: #FFFFFF;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  margin-right: 0.5rem;
  
  &:last-child {
    margin-right: 0;
  }
`;

const MessageInput = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  background-color: #1E2A3A;
  color: #FFFFFF;
  border: none;
  border-radius: 1rem;
  padding: 0.75rem;
  margin-right: 0.5rem;
  
  &:focus {
    outline: none;
  }
`;

const SendButton = styled.button`
  background-color: #00B2FF;
  color: #FFFFFF;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const BottomNav = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0.75rem 0;
  background-color: #121926;
  border-top: 1px solid #1E2A3A;
`;

const NavItem = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  color: ${props => props.active ? '#00E676' : '#607D8B'};
`;

const NavIcon = styled.div`
  margin-bottom: 0.25rem;
`;

const NavText = styled.div`
  font-size: 0.75rem;
`;

interface TechnicianMobileViewProps {
  data: any;
}

export const TechnicianMobileView: React.FC<TechnicianMobileViewProps> = ({ data }) => {
  const { technicianMobile } = data;
  
  return (
    <MobileContainer>
      <MobileHeader>
        <UserInfo>
          <UserAvatar src="https://randomuser.me/api/portraits/men/32.jpg" alt="Mike Johnson" />
          <UserName>{technicianMobile.technician.name}</UserName>
        </UserInfo>
        <NotificationIcon>
          <FeatherIcon icon="bell" size={20} color="#FFFFFF" />
          <NotificationBadge>1</NotificationBadge>
        </NotificationIcon>
      </MobileHeader>
      
      <CurrentJobSection>
        <StatusBadge>{technicianMobile.currentJob.status}</StatusBadge>
        <ElapsedTime>{technicianMobile.currentJob.elapsedTime} elapsed</ElapsedTime>
        <JobTitle>{technicianMobile.currentJob.title} - {technicianMobile.currentJob.customer.name}</JobTitle>
        <ProgressBar>
          <ProgressValue value={technicianMobile.currentJob.progress} />
        </ProgressBar>
        <ActionButtons>
          <ActionButton>On My Way</ActionButton>
          <ActionButton>Arrived</ActionButton>
          <ActionButton variant="success">Complete</ActionButton>
        </ActionButtons>
      </CurrentJobSection>
      
      <TodaysJobsSection>
        <SectionTitle>Today's Jobs</SectionTitle>
        
        {technicianMobile.todaysJobs.map((job: any) => (
          <JobCard key={job.id}>
            <JobTime>
              <FeatherIcon icon="clock" size={14} color="#00B2FF" style={{ marginRight: '0.5rem' }} />
              {job.timeSlot}
            </JobTime>
            <JobCustomer>{job.customer.name}</JobCustomer>
            <JobLocation>
              <FeatherIcon icon="map-pin" size={14} color="#607D8B" style={{ marginRight: '0.5rem' }} />
              {job.customer.address}
            </JobLocation>
            <JobType>
              <FeatherIcon icon="tool" size={14} color="#607D8B" style={{ marginRight: '0.5rem' }} />
              {job.serviceType}
            </JobType>
            <JobStatus status={job.status}>{job.status}</JobStatus>
          </JobCard>
        ))}
      </TodaysJobsSection>
      
      <ChatSection>
        <CustomerInfo>
          <CustomerAvatar>JS</CustomerAvatar>
          <div>
            <CustomerName>{technicianMobile.currentJob.customer.name}</CustomerName>
            <CustomerJobBadge>
              {technicianMobile.currentJob.title} #{technicianMobile.currentJob.workOrderNumber}
            </CustomerJobBadge>
          </div>
        </CustomerInfo>
        
        <ChatMessages>
          {technicianMobile.messages.map((message: any, index: number) => (
            message.direction === 'Inbound' ? (
              <CustomerMessage key={index}>{message.content}</CustomerMessage>
            ) : (
              <TechnicianMessage key={index}>{message.content}</TechnicianMessage>
            )
          ))}
        </ChatMessages>
        
        <QuickReplies>
          <QuickReply>On my way</QuickReply>
          <QuickReply>Running late</QuickReply>
          <QuickReply>Work complete</QuickReply>
        </QuickReplies>
        
        <MessageInput>
          <Input placeholder="Type a message..." />
          <SendButton>
            <FeatherIcon icon="send" size={16} />
          </SendButton>
        </MessageInput>
      </ChatSection>
      
      <BottomNav>
        <NavItem active={true}>
          <NavIcon>
            <FeatherIcon icon="home" size={20} />
          </NavIcon>
          <NavText>Jobs</NavText>
        </NavItem>
        <NavItem active={false}>
          <NavIcon>
            <FeatherIcon icon="message-circle" size={20} />
          </NavIcon>
          <NavText>Messages</NavText>
        </NavItem>
        <NavItem active={false}>
          <NavIcon>
            <FeatherIcon icon="calendar" size={20} />
          </NavIcon>
          <NavText>Schedule</NavText>
        </NavItem>
        <NavItem active={false}>
          <NavIcon>
            <FeatherIcon icon="user" size={20} />
          </NavIcon>
          <NavText>Profile</NavText>
        </NavItem>
      </BottomNav>
    </MobileContainer>
  );
};