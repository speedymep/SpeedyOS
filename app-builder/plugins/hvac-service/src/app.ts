import { HVACServiceModels } from './models';
import { HVACServiceWorkflows } from './workflows';
import { HVACServiceComponents } from './components';
import { HVACServicePages } from './pages';
import { HVACServiceTheme } from './theme';

/**
 * HVAC Service App Configuration
 */
export const HVACServiceApp = {
  id: 'hvac-service-app',
  name: 'HVAC Service App',
  description: 'Field service application for HVAC businesses',
  version: '1.0.0',
  models: HVACServiceModels,
  workflows: HVACServiceWorkflows,
  components: HVACServiceComponents,
  pages: HVACServicePages,
  theme: HVACServiceTheme,
  navigation: {
    logo: {
      text: 'SpeedyHVAC',
      icon: 'fan',
    },
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: 'grid',
        path: '/',
        page: 'dashboard-page',
      },
      {
        id: 'work-orders',
        label: 'Work Orders',
        icon: 'clipboard',
        path: '/work-orders',
        page: 'work-orders-page',
      },
      {
        id: 'customers',
        label: 'Customers',
        icon: 'users',
        path: '/customers',
        page: 'customers-page',
      },
      {
        id: 'technicians',
        label: 'Technicians',
        icon: 'tool',
        path: '/technicians',
        page: 'technicians-page',
      },
      {
        id: 'equipment',
        label: 'Equipment',
        icon: 'box',
        path: '/equipment',
        page: 'equipment-page',
      },
      {
        id: 'invoices',
        label: 'Invoices',
        icon: 'file-text',
        path: '/invoices',
        page: 'invoices-page',
      },
      {
        id: 'messages',
        label: 'SMS Inbox',
        icon: 'message-circle',
        path: '/messages',
        page: 'messages-page',
      },
      {
        id: 'reports',
        label: 'Reports',
        icon: 'bar-chart-2',
        path: '/reports',
        page: 'reports-page',
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: 'settings',
        path: '/settings',
        page: 'settings-page',
      },
    ],
  },
  settings: {
    company: {
      name: 'SpeedyHVAC',
      address: '123 Main Street, Anytown, USA',
      phone: '(555) 123-4567',
      email: 'info@speedyhvac.com',
      website: 'https://speedyhvac.com',
      logo: '/assets/logo.png',
    },
    notifications: {
      sms: {
        enabled: true,
        provider: 'twilio',
        templates: {
          workOrderCreated: 'Your work order #{{workOrderNumber}} has been created. A technician will be assigned shortly.',
          technicianAssigned: 'Technician {{technicianName}} has been assigned to your work order #{{workOrderNumber}}.',
          technicianEnRoute: 'Your technician {{technicianName}} is on the way. ETA: {{eta}}.',
          technicianArrived: 'Your technician {{technicianName}} has arrived at your location.',
          workOrderCompleted: 'Your work order #{{workOrderNumber}} has been completed. Thank you for your business!',
          invoiceCreated: 'Your invoice #{{invoiceNumber}} for ${{total}} has been created. Due date: {{dueDate}}.',
        },
      },
      email: {
        enabled: true,
        provider: 'sendgrid',
        templates: {
          workOrderCreated: 'work-order-created',
          technicianAssigned: 'technician-assigned',
          workOrderCompleted: 'work-order-completed',
          invoiceCreated: 'invoice-created',
        },
      },
      push: {
        enabled: true,
        provider: 'firebase',
      },
    },
    integrations: {
      payment: {
        enabled: true,
        provider: 'stripe',
        publicKey: 'pk_test_123456789',
      },
      calendar: {
        enabled: true,
        provider: 'google',
      },
      maps: {
        enabled: true,
        provider: 'google',
        apiKey: 'AIzaSyA1234567890',
      },
    },
    workflow: {
      autoAssignTechnicians: true,
      sendCustomerNotifications: true,
      createInvoicesAutomatically: true,
    },
  },
  mobileApp: {
    enabled: true,
    technician: {
      homePage: 'technician-mobile-page',
    },
    customer: {
      enabled: false,
    },
  },
};