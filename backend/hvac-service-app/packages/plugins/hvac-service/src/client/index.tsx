import { Plugin } from '@nocobase/client';
import { Dashboard } from './components/Dashboard';
import { ServiceScheduler } from './components/ServiceScheduler';
import { SettingOutlined, DashboardOutlined, ScheduleOutlined } from '@ant-design/icons';

export class HvacServiceClient extends Plugin {
  async afterAdd() {
    // await this.app.pm.add()
  }

  async beforeLoad() {}

  // You can get and modify the app instance here
  async load() {
    this.app.addComponents({
      'hvac-service:Dashboard': Dashboard,
      'hvac-service:ServiceScheduler': ServiceScheduler,
    });

    // Add menu items
    this.app.router.add('admin.hvac-dashboard', {
      path: '/admin/hvac-dashboard',
      Component: Dashboard,
    });

    this.app.router.add('admin.hvac-scheduler', {
      path: '/admin/hvac-scheduler',
      Component: ServiceScheduler,
    });

    // Add menu items to the admin console
    this.app.addMenuItem('admin', {
      title: 'HVAC Service',
      icon: 'SettingOutlined',
      children: [
        {
          title: 'Dashboard',
          path: '/admin/hvac-dashboard',
          icon: 'DashboardOutlined',
        },
        {
          title: 'Service Scheduler',
          path: '/admin/hvac-scheduler',
          icon: 'ScheduleOutlined',
        },
      ],
    });
  }
}

export default HvacServiceClient;
