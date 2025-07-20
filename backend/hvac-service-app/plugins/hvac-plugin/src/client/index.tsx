import { Plugin } from '@nocobase/client';
import { HVACDashboard } from './Dashboard';

export class HVACPlugin extends Plugin {
  async load() {
    // Register the dashboard component
    this.app.router.add('hvac/dashboard', {
      Component: HVACDashboard,
      hideInMenu: false,
    });

    // Add custom components or extensions here
    console.log('HVAC Plugin client loaded');
  }
}

export default HVACPlugin;