import { Plugin } from '@nocobase/client';
import { HVACDashboard } from './Dashboard';
import { TechnicianSchedule } from './TechnicianSchedule';

export class HVACPlugin extends Plugin {
  async load() {
    // Register the dashboard component
    this.app.router.add('hvac/dashboard', {
      Component: HVACDashboard,
      hideInMenu: false,
    });

    // Register the technician schedule component
    this.app.router.add('hvac/schedule', {
      Component: TechnicianSchedule,
      hideInMenu: false,
    });

    // Add menu item for technician schedule
    this.app.menu.add('hvac', {
      title: 'HVAC Service',
      path: '/hvac',
      icon: 'ToolOutlined',
      sort: 100,
      children: [
        {
          title: 'Dashboard',
          path: '/hvac/dashboard',
          icon: 'DashboardOutlined',
        },
        {
          title: 'Customers',
          path: '/hvac/customers',
          icon: 'UserOutlined',
        },
        {
          title: 'Service Requests',
          path: '/hvac/service-requests',
          icon: 'ProfileOutlined',
        },
        {
          title: 'Technicians',
          path: '/hvac/technicians',
          icon: 'TeamOutlined',
        },
        {
          title: 'Equipment',
          path: '/hvac/equipment',
          icon: 'AppstoreOutlined',
        },
        {
          title: 'Schedule',
          path: '/hvac/schedule',
          icon: 'CalendarOutlined',
        },
      ],
    });

    // Add custom components or extensions here
    console.log('HVAC Plugin client loaded');
  }
}

export default HVACPlugin;