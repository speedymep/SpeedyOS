import { API } from '@speedyos/api-builder';

/**
 * HVAC Service API
 */
export const HVACServiceAPI = new API({
  id: 'hvac-service-api',
  name: 'HVAC Service API',
  version: '1.0.0',
  endpoints: [
    // Customer endpoints
    {
      path: '/api/customers',
      method: 'GET',
      name: 'getCustomers',
      description: 'Get all customers',
      auth: true,
      parameters: {
        query: {
          search: { type: 'string', required: false },
          limit: { type: 'number', required: false, default: 20 },
          offset: { type: 'number', required: false, default: 0 },
          sort: { type: 'string', required: false, default: 'name' },
          order: { type: 'string', required: false, default: 'asc' },
        },
      },
      response: {
        type: 'array',
        items: { type: 'Customer' },
      },
    },
    {
      path: '/api/customers/:id',
      method: 'GET',
      name: 'getCustomer',
      description: 'Get customer by ID',
      auth: true,
      parameters: {
        path: {
          id: { type: 'string', required: true },
        },
      },
      response: {
        type: 'Customer',
      },
    },
    {
      path: '/api/customers',
      method: 'POST',
      name: 'createCustomer',
      description: 'Create a new customer',
      auth: true,
      parameters: {
        body: {
          type: 'Customer',
          required: true,
        },
      },
      response: {
        type: 'Customer',
      },
    },
    {
      path: '/api/customers/:id',
      method: 'PUT',
      name: 'updateCustomer',
      description: 'Update customer by ID',
      auth: true,
      parameters: {
        path: {
          id: { type: 'string', required: true },
        },
        body: {
          type: 'Customer',
          required: true,
        },
      },
      response: {
        type: 'Customer',
      },
    },
    {
      path: '/api/customers/:id',
      method: 'DELETE',
      name: 'deleteCustomer',
      description: 'Delete customer by ID',
      auth: true,
      parameters: {
        path: {
          id: { type: 'string', required: true },
        },
      },
      response: {
        type: 'boolean',
      },
    },

    // Work Order endpoints
    {
      path: '/api/work-orders',
      method: 'GET',
      name: 'getWorkOrders',
      description: 'Get all work orders',
      auth: true,
      parameters: {
        query: {
          status: { type: 'string', required: false },
          customerId: { type: 'string', required: false },
          technicianId: { type: 'string', required: false },
          startDate: { type: 'string', required: false },
          endDate: { type: 'string', required: false },
          limit: { type: 'number', required: false, default: 20 },
          offset: { type: 'number', required: false, default: 0 },
          sort: { type: 'string', required: false, default: 'scheduledStart' },
          order: { type: 'string', required: false, default: 'desc' },
        },
      },
      response: {
        type: 'array',
        items: { type: 'WorkOrder' },
      },
    },
    {
      path: '/api/work-orders/:id',
      method: 'GET',
      name: 'getWorkOrder',
      description: 'Get work order by ID',
      auth: true,
      parameters: {
        path: {
          id: { type: 'string', required: true },
        },
      },
      response: {
        type: 'WorkOrder',
      },
    },
    {
      path: '/api/work-orders',
      method: 'POST',
      name: 'createWorkOrder',
      description: 'Create a new work order',
      auth: true,
      parameters: {
        body: {
          type: 'WorkOrder',
          required: true,
        },
      },
      response: {
        type: 'WorkOrder',
      },
    },
    {
      path: '/api/work-orders/:id',
      method: 'PUT',
      name: 'updateWorkOrder',
      description: 'Update work order by ID',
      auth: true,
      parameters: {
        path: {
          id: { type: 'string', required: true },
        },
        body: {
          type: 'WorkOrder',
          required: true,
        },
      },
      response: {
        type: 'WorkOrder',
      },
    },
    {
      path: '/api/work-orders/:id/status',
      method: 'PUT',
      name: 'updateWorkOrderStatus',
      description: 'Update work order status',
      auth: true,
      parameters: {
        path: {
          id: { type: 'string', required: true },
        },
        body: {
          status: { type: 'string', required: true },
          notes: { type: 'string', required: false },
        },
      },
      response: {
        type: 'WorkOrder',
      },
    },
    {
      path: '/api/work-orders/:id/assign',
      method: 'PUT',
      name: 'assignWorkOrder',
      description: 'Assign work order to technician',
      auth: true,
      parameters: {
        path: {
          id: { type: 'string', required: true },
        },
        body: {
          technicianId: { type: 'string', required: true },
        },
      },
      response: {
        type: 'WorkOrder',
      },
    },

    // Technician endpoints
    {
      path: '/api/technicians',
      method: 'GET',
      name: 'getTechnicians',
      description: 'Get all technicians',
      auth: true,
      parameters: {
        query: {
          status: { type: 'string', required: false },
          skills: { type: 'array', items: { type: 'string' }, required: false },
          limit: { type: 'number', required: false, default: 20 },
          offset: { type: 'number', required: false, default: 0 },
        },
      },
      response: {
        type: 'array',
        items: { type: 'Technician' },
      },
    },
    {
      path: '/api/technicians/:id',
      method: 'GET',
      name: 'getTechnician',
      description: 'Get technician by ID',
      auth: true,
      parameters: {
        path: {
          id: { type: 'string', required: true },
        },
      },
      response: {
        type: 'Technician',
      },
    },
    {
      path: '/api/technicians/:id/status',
      method: 'PUT',
      name: 'updateTechnicianStatus',
      description: 'Update technician status',
      auth: true,
      parameters: {
        path: {
          id: { type: 'string', required: true },
        },
        body: {
          status: { type: 'string', required: true },
          location: { type: 'string', required: false },
          notes: { type: 'string', required: false },
        },
      },
      response: {
        type: 'Technician',
      },
    },
    {
      path: '/api/technicians/:id/schedule',
      method: 'GET',
      name: 'getTechnicianSchedule',
      description: 'Get technician schedule',
      auth: true,
      parameters: {
        path: {
          id: { type: 'string', required: true },
        },
        query: {
          startDate: { type: 'string', required: true },
          endDate: { type: 'string', required: true },
        },
      },
      response: {
        type: 'array',
        items: { type: 'WorkOrder' },
      },
    },

    // Equipment endpoints
    {
      path: '/api/equipment',
      method: 'GET',
      name: 'getEquipment',
      description: 'Get all equipment',
      auth: true,
      parameters: {
        query: {
          customerId: { type: 'string', required: false },
          type: { type: 'string', required: false },
          manufacturer: { type: 'string', required: false },
          limit: { type: 'number', required: false, default: 20 },
          offset: { type: 'number', required: false, default: 0 },
        },
      },
      response: {
        type: 'array',
        items: { type: 'Equipment' },
      },
    },
    {
      path: '/api/equipment/:id',
      method: 'GET',
      name: 'getEquipmentById',
      description: 'Get equipment by ID',
      auth: true,
      parameters: {
        path: {
          id: { type: 'string', required: true },
        },
      },
      response: {
        type: 'Equipment',
      },
    },
    {
      path: '/api/equipment',
      method: 'POST',
      name: 'createEquipment',
      description: 'Create new equipment',
      auth: true,
      parameters: {
        body: {
          type: 'Equipment',
          required: true,
        },
      },
      response: {
        type: 'Equipment',
      },
    },

    // Invoice endpoints
    {
      path: '/api/invoices',
      method: 'GET',
      name: 'getInvoices',
      description: 'Get all invoices',
      auth: true,
      parameters: {
        query: {
          customerId: { type: 'string', required: false },
          status: { type: 'string', required: false },
          startDate: { type: 'string', required: false },
          endDate: { type: 'string', required: false },
          limit: { type: 'number', required: false, default: 20 },
          offset: { type: 'number', required: false, default: 0 },
        },
      },
      response: {
        type: 'array',
        items: { type: 'Invoice' },
      },
    },
    {
      path: '/api/invoices/:id',
      method: 'GET',
      name: 'getInvoice',
      description: 'Get invoice by ID',
      auth: true,
      parameters: {
        path: {
          id: { type: 'string', required: true },
        },
      },
      response: {
        type: 'Invoice',
      },
    },
    {
      path: '/api/invoices',
      method: 'POST',
      name: 'createInvoice',
      description: 'Create a new invoice',
      auth: true,
      parameters: {
        body: {
          type: 'Invoice',
          required: true,
        },
      },
      response: {
        type: 'Invoice',
      },
    },
    {
      path: '/api/invoices/:id/status',
      method: 'PUT',
      name: 'updateInvoiceStatus',
      description: 'Update invoice status',
      auth: true,
      parameters: {
        path: {
          id: { type: 'string', required: true },
        },
        body: {
          status: { type: 'string', required: true },
        },
      },
      response: {
        type: 'Invoice',
      },
    },

    // Message endpoints
    {
      path: '/api/messages',
      method: 'GET',
      name: 'getMessages',
      description: 'Get all messages',
      auth: true,
      parameters: {
        query: {
          customerId: { type: 'string', required: false },
          technicianId: { type: 'string', required: false },
          workOrderId: { type: 'string', required: false },
          limit: { type: 'number', required: false, default: 20 },
          offset: { type: 'number', required: false, default: 0 },
        },
      },
      response: {
        type: 'array',
        items: { type: 'Message' },
      },
    },
    {
      path: '/api/messages',
      method: 'POST',
      name: 'sendMessage',
      description: 'Send a new message',
      auth: true,
      parameters: {
        body: {
          recipientId: { type: 'string', required: true },
          content: { type: 'string', required: true },
          workOrderId: { type: 'string', required: false },
        },
      },
      response: {
        type: 'Message',
      },
    },

    // Mobile API endpoints
    {
      path: '/api/mobile/technician/jobs',
      method: 'GET',
      name: 'getTechnicianJobs',
      description: 'Get technician jobs for mobile app',
      auth: true,
      parameters: {
        query: {
          date: { type: 'string', required: false },
        },
      },
      response: {
        type: 'array',
        items: { type: 'WorkOrder' },
      },
    },
    {
      path: '/api/mobile/technician/job/:id/status',
      method: 'PUT',
      name: 'updateJobStatus',
      description: 'Update job status from mobile app',
      auth: true,
      parameters: {
        path: {
          id: { type: 'string', required: true },
        },
        body: {
          status: { type: 'string', required: true },
          notes: { type: 'string', required: false },
          location: { type: 'object', required: false },
        },
      },
      response: {
        type: 'WorkOrder',
      },
    },
    {
      path: '/api/mobile/technician/job/:id/complete',
      method: 'POST',
      name: 'completeJob',
      description: 'Complete a job from mobile app',
      auth: true,
      parameters: {
        path: {
          id: { type: 'string', required: true },
        },
        body: {
          laborHours: { type: 'number', required: true },
          parts: { type: 'array', items: { type: 'object' }, required: false },
          notes: { type: 'string', required: false },
          photos: { type: 'array', items: { type: 'string' }, required: false },
          signature: { type: 'string', required: false },
        },
      },
      response: {
        type: 'WorkOrder',
      },
    },
  ],
});