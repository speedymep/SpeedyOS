import { Page, Layout, LayoutType } from '@speedyos/ui-builder';
import { 
  ServiceRequestForm, 
  TechnicianSchedule, 
  EquipmentDetails, 
  ServiceLocationMap, 
  InvoiceSummary, 
  CustomerDashboard 
} from './components';

/**
 * Dashboard Page Template
 */
export const DashboardPageTemplate = Page.dashboard(
  'dashboard-page',
  'Dashboard'
);

// Add customer dashboard to the first area
DashboardPageTemplate.addComponent(
  `dashboard-page-layout-area-0-0`,
  CustomerDashboard
);

/**
 * Customers Page Template
 */
export const CustomersPageTemplate = Page.list(
  'customers-page',
  'Customers'
);

// Create a layout for the customers page
const customersLayout = Layout.grid(
  'customers-layout',
  2,
  3
);

// Replace the default layout
CustomersPageTemplate.layout = customersLayout;

// Add a table component to the first area
CustomersPageTemplate.addComponent(
  'customers-layout-area-0-0',
  {
    id: 'customers-table',
    type: 'table',
    name: 'Customers Table',
    props: {
      columns: [
        { key: 'name', title: 'Name' },
        { key: 'email', title: 'Email' },
        { key: 'phone', title: 'Phone' },
        { key: 'type', title: 'Type' },
        { key: 'active', title: 'Active' },
        { key: 'actions', title: 'Actions' },
      ],
      pagination: true,
      pageSize: 10,
      sortable: true,
      filterable: true,
    },
    dataBinding: {
      source: 'customers',
    },
    styles: {
      width: '100%',
    },
  }
);

/**
 * Service Requests Page Template
 */
export const ServiceRequestsPageTemplate = Page.list(
  'service-requests-page',
  'Service Requests'
);

// Create a layout for the service requests page
const serviceRequestsLayout = Layout.grid(
  'service-requests-layout',
  2,
  2
);

// Replace the default layout
ServiceRequestsPageTemplate.layout = serviceRequestsLayout;

// Add a table component to the first area
ServiceRequestsPageTemplate.addComponent(
  'service-requests-layout-area-0-0',
  {
    id: 'service-requests-table',
    type: 'table',
    name: 'Service Requests Table',
    props: {
      columns: [
        { key: 'title', title: 'Title' },
        { key: 'status', title: 'Status' },
        { key: 'priority', title: 'Priority' },
        { key: 'customer.name', title: 'Customer' },
        { key: 'technician.name', title: 'Technician' },
        { key: 'scheduledDate', title: 'Scheduled' },
        { key: 'actions', title: 'Actions' },
      ],
      pagination: true,
      pageSize: 10,
      sortable: true,
      filterable: true,
    },
    dataBinding: {
      source: 'serviceRequests',
    },
    styles: {
      width: '100%',
      gridColumn: 'span 2',
    },
  }
);

// Add the service request form to the second row
ServiceRequestsPageTemplate.addComponent(
  'service-requests-layout-area-1-0',
  ServiceRequestForm
);

// Add a map to the second row, second column
ServiceRequestsPageTemplate.addComponent(
  'service-requests-layout-area-1-1',
  ServiceLocationMap
);

/**
 * Technician Schedule Page Template
 */
export const TechnicianSchedulePageTemplate = Page.simple(
  'technician-schedule-page',
  'Technician Schedule',
  2,
  1
);

// Add technician selector to the first area
TechnicianSchedulePageTemplate.addComponent(
  'technician-schedule-page-layout-area-0-0',
  {
    id: 'technician-selector',
    type: 'select',
    label: 'Select Technician',
    props: {
      placeholder: 'Select a technician',
      onChange: 'handleTechnicianChange',
    },
    dataBinding: {
      source: 'technicians',
      transform: 'mapToOptions',
    },
    styles: {
      marginBottom: '1rem',
    },
  }
);

// Add the schedule component to the second area
TechnicianSchedulePageTemplate.addComponent(
  'technician-schedule-page-layout-area-1-0',
  TechnicianSchedule
);

/**
 * Equipment Page Template
 */
export const EquipmentPageTemplate = Page.list(
  'equipment-page',
  'Equipment'
);

// Create a layout for the equipment page
const equipmentLayout = Layout.grid(
  'equipment-layout',
  2,
  2
);

// Replace the default layout
EquipmentPageTemplate.layout = equipmentLayout;

// Add a table component to the first area
EquipmentPageTemplate.addComponent(
  'equipment-layout-area-0-0',
  {
    id: 'equipment-table',
    type: 'table',
    name: 'Equipment Table',
    props: {
      columns: [
        { key: 'name', title: 'Name' },
        { key: 'model', title: 'Model' },
        { key: 'serialNumber', title: 'Serial Number' },
        { key: 'manufacturer', title: 'Manufacturer' },
        { key: 'type', title: 'Type' },
        { key: 'serviceLocation.name', title: 'Location' },
        { key: 'actions', title: 'Actions' },
      ],
      pagination: true,
      pageSize: 10,
      sortable: true,
      filterable: true,
    },
    dataBinding: {
      source: 'equipment',
    },
    styles: {
      width: '100%',
      gridColumn: 'span 2',
    },
  }
);

// Add the equipment details to the second row
EquipmentPageTemplate.addComponent(
  'equipment-layout-area-1-0',
  EquipmentDetails
);

// Add a maintenance history chart to the second row, second column
EquipmentPageTemplate.addComponent(
  'equipment-layout-area-1-1',
  {
    id: 'maintenance-history-chart',
    type: 'chart',
    props: {
      chartType: 'bar',
      title: 'Maintenance History',
      height: 300,
    },
    dataBinding: {
      source: 'maintenanceHistory',
    },
    styles: {
      width: '100%',
    },
  }
);

/**
 * Invoices Page Template
 */
export const InvoicesPageTemplate = Page.list(
  'invoices-page',
  'Invoices'
);

// Create a layout for the invoices page
const invoicesLayout = Layout.grid(
  'invoices-layout',
  2,
  1
);

// Replace the default layout
InvoicesPageTemplate.layout = invoicesLayout;

// Add the invoice summary to the first area
InvoicesPageTemplate.addComponent(
  'invoices-layout-area-0-0',
  InvoiceSummary
);

// Add a revenue chart to the second area
InvoicesPageTemplate.addComponent(
  'invoices-layout-area-1-0',
  {
    id: 'revenue-chart',
    type: 'chart',
    props: {
      chartType: 'line',
      title: 'Monthly Revenue',
      height: 300,
    },
    dataBinding: {
      source: 'monthlyRevenue',
    },
    styles: {
      width: '100%',
    },
  }
);

/**
 * Export all field service page templates
 */
export const FieldServicePageTemplates = [
  DashboardPageTemplate,
  CustomersPageTemplate,
  ServiceRequestsPageTemplate,
  TechnicianSchedulePageTemplate,
  EquipmentPageTemplate,
  InvoicesPageTemplate,
];