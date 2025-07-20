import { Plugin } from '@nocobase/client';

export class HVACPlugin extends Plugin {
  async load() {
    // Add custom components or extensions here
    console.log('HVAC Plugin client loaded');
  }
}

export default HVACPlugin;