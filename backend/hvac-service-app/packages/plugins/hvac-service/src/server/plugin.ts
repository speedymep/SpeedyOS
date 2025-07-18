import { Plugin } from '@nocobase/server';
import customersCollection from './collections/customers';
import equipmentsCollection from './collections/equipments';
import serviceRequestsCollection from './collections/serviceRequests';
import techniciansCollection from './collections/technicians';
import tasksCollection from './collections/tasks';
import maintenanceHistoryCollection from './collections/maintenanceHistory';
import inventoryCollection from './collections/inventory';
import clerkAuthConfig from './auth/clerk';

export class HvacServiceServer extends Plugin {
  async afterAdd() {}

  async beforeLoad() {
    // Register Clerk authentication if enabled in environment
    if (process.env.AUTH_PROVIDER === 'clerk') {
      this.app.authManager.registerTypes(clerkAuthConfig);
    }
  }

  async load() {
    // Register collections
    this.db.collection(customersCollection);
    this.db.collection(equipmentsCollection);
    this.db.collection(serviceRequestsCollection);
    this.db.collection(techniciansCollection);
    this.db.collection(tasksCollection);
    this.db.collection(maintenanceHistoryCollection);
    this.db.collection(inventoryCollection);

    // Register API routes for n8n integration
    this.app.resource({
      name: 'n8n-webhooks',
      actions: {
        async trigger(ctx, next) {
          const { workflowId, event } = ctx.action.params;
          const { body } = ctx.request;
          
          // Process the webhook from n8n
          console.log(`Received n8n webhook for workflow ${workflowId}, event: ${event}`);
          console.log('Payload:', body);
          
          // Here you would handle the webhook based on the event type
          // For example, create a service request, update a status, etc.
          
          ctx.body = { success: true };
          await next();
        }
      }
    });

    // Add multi-tenant support
    if (process.env.ALLOW_MULTI_TENANT === 'true') {
      this.app.acl.allow('tenant', 'customers', '*');
      this.app.acl.allow('tenant', 'equipments', '*');
      this.app.acl.allow('tenant', 'serviceRequests', '*');
      this.app.acl.allow('tenant', 'technicians', '*');
      this.app.acl.allow('tenant', 'tasks', '*');
      this.app.acl.allow('tenant', 'maintenanceHistory', '*');
      this.app.acl.allow('tenant', 'inventory', '*');
    }
  }

  async install() {
    // Create initial data if needed
    await this.db.sync();
    
    // Create default roles if they don't exist
    const rolesRepository = this.db.getRepository('roles');
    
    // Check if technician role exists
    const technicianRole = await rolesRepository.findOne({
      filter: {
        name: 'technician'
      }
    });
    
    // Create technician role if it doesn't exist
    if (!technicianRole) {
      await rolesRepository.create({
        values: {
          name: 'technician',
          title: 'Technician',
          allowConfigure: false,
          strategy: {
            actions: [
              {
                name: 'view',
                fields: true,
              },
              {
                name: 'update',
                fields: true,
              },
            ],
          },
        },
      });
    }
    
    // Check if customer role exists
    const customerRole = await rolesRepository.findOne({
      filter: {
        name: 'customer'
      }
    });
    
    // Create customer role if it doesn't exist
    if (!customerRole) {
      await rolesRepository.create({
        values: {
          name: 'customer',
          title: 'Customer',
          allowConfigure: false,
          strategy: {
            actions: [
              {
                name: 'view',
                fields: true,
              },
            ],
          },
        },
      });
    }
  }

  async afterEnable() {}

  async afterDisable() {}

  async remove() {}
}

export default HvacServiceServer;
