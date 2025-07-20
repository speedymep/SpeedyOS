import { useState } from 'react';
import styled from 'styled-components';
import FeatherIcon from 'feather-icons-react';
import { DashboardView } from './views/DashboardView';
import { TechnicianMobileView } from './views/TechnicianMobileView';

// Mock data for the app
import { mockData } from './mockData';

// Mock navigation items
const navigationItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'grid',
    path: '/',
  },
  {
    id: 'work-orders',
    label: 'Work Orders',
    icon: 'clipboard',
    path: '/work-orders',
  },
  {
    id: 'customers',
    label: 'Customers',
    icon: 'users',
    path: '/customers',
  },
  {
    id: 'technicians',
    label: 'Technicians',
    icon: 'tool',
    path: '/technicians',
  },
  {
    id: 'equipment',
    label: 'Equipment',
    icon: 'box',
    path: '/equipment',
  },
  {
    id: 'invoices',
    label: 'Invoices',
    icon: 'file-text',
    path: '/invoices',
  },
  {
    id: 'messages',
    label: 'SMS Inbox',
    icon: 'message-circle',
    path: '/messages',
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: 'bar-chart-2',
    path: '/reports',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'settings',
    path: '/settings',
  },
];

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const Sidebar = styled.div`
  width: 240px;
  background-color: #121926;
  border-right: 1px solid #1E2A3A;
  display: flex;
  flex-direction: column;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #1E2A3A;
`;

const LogoText = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
  color: #FFFFFF;
  margin-left: 0.75rem;
`;

const NavItems = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  flex: 1;
`;

const NavItem = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: ${props => props.active ? '#FFFFFF' : '#B0BEC5'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #1E2A3A;
    color: #FFFFFF;
  }
  
  ${props => props.active && `
    background-color: #1E2A3A;
    border-left: 3px solid #00B2FF;
  `}
`;

const NavItemText = styled.span`
  margin-left: 0.75rem;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: #121926;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: #121926;
  border-bottom: 1px solid #1E2A3A;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #1E2A3A;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  width: 300px;
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  color: #FFFFFF;
  margin-left: 0.5rem;
  width: 100%;
  
  &:focus {
    outline: none;
  }
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
`;

const NotificationBadge = styled.div`
  position: relative;
  margin-right: 1.5rem;
  cursor: pointer;
`;

const Badge = styled.div`
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

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #1E2A3A;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ViewToggle = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1.5rem;
`;

const ToggleButton = styled.button<{ active: boolean }>`
  background-color: ${props => props.active ? '#00B2FF' : '#1E2A3A'};
  color: ${props => props.active ? '#FFFFFF' : '#B0BEC5'};
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.875rem;
  
  &:first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  
  &:last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

function App() {
  const [activeNavItem, setActiveNavItem] = useState('dashboard');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  
  const handleNavItemClick = (id: string) => {
    setActiveNavItem(id);
  };
  
  return (
    <AppContainer>
      {viewMode === 'desktop' ? (
        <>
          <Sidebar>
            <Logo>
              <FeatherIcon icon="fan" color="#00B2FF" size={24} />
              <LogoText>SpeedyHVAC</LogoText>
            </Logo>
            <NavItems>
              {navigationItems.map((item) => (
                <NavItem 
                  key={item.id} 
                  active={activeNavItem === item.id}
                  onClick={() => handleNavItemClick(item.id)}
                >
                  <FeatherIcon icon={item.icon} size={18} />
                  <NavItemText>{item.label}</NavItemText>
                </NavItem>
              ))}
            </NavItems>
          </Sidebar>
          <Content>
            <Header>
              <SearchBar>
                <FeatherIcon icon="search" size={18} color="#607D8B" />
                <SearchInput placeholder="Search..." />
              </SearchBar>
              <UserMenu>
                <NotificationBadge>
                  <FeatherIcon icon="bell" size={20} color="#B0BEC5" />
                  <Badge>3</Badge>
                </NotificationBadge>
                <UserAvatar>
                  <FeatherIcon icon="user" size={18} color="#B0BEC5" />
                </UserAvatar>
                <ViewToggle>
                  <ToggleButton 
                    active={viewMode === 'desktop'} 
                    onClick={() => setViewMode('desktop')}
                  >
                    Desktop
                  </ToggleButton>
                  <ToggleButton 
                    active={viewMode === 'mobile' as any} 
                    onClick={() => setViewMode('mobile')}
                  >
                    Mobile
                  </ToggleButton>
                </ViewToggle>
              </UserMenu>
            </Header>
            <DashboardView data={mockData} />
          </Content>
        </>
      ) : (
        <TechnicianMobileView data={mockData} />
      )}
    </AppContainer>
  );
}

export default App;