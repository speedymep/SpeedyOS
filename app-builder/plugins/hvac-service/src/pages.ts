import { Page, Layout, LayoutType } from '@speedyos/ui-builder';
import { 
  DashboardStats, 
  NinjaCommunications, 
  ActiveWorkOrders, 
  TeamStatus, 
  QuickActions, 
  WorkflowDesigner,
  WorkOrderForm,
  TechnicianMobileView
} from './components';

/**
 * Dashboard Page
 */
export const DashboardPage = Page.dashboard(
  'dashboard-page',
  'Dashboard'
);

// Create a layout for the dashboard page
const dashboardLayout = Layout.grid(
  'dashboard-layout',
  3,
  3
);

// Replace the default layout
DashboardPage.layout = dashboardLayout;

// Add dashboard stats to the first row, spanning all columns
DashboardPage.addComponent(
  'dashboard-layout-area-0-0',
  DashboardStats,
  {
    gridColumn: 'span 3',
  }
);

// Add ninja communications to the second row, first column
DashboardPage.addComponent(
  'dashboard-layout-area-1-0',
  NinjaCommunications
);

// Add active work orders to the second row, second column
DashboardPage.addComponent(
  'dashboard-layout-area-1-1',
  ActiveWorkOrders
);

// Add team status to the second row, third column
DashboardPage.addComponent(
  'dashboard-layout-area-1-2',
  TeamStatus
);

// Add quick actions to the third row, third column
DashboardPage.addComponent(
  'dashboard-layout-area-2-2',
  QuickActions
);

// Add workflow designer to the third row, spanning first and second columns
DashboardPage.addComponent(
  'dashboard-layout-area-2-0',
  WorkflowDesigner,
  {
    gridColumn: 'span 2',
  }
);

/**
 * Work Orders Page
 */
export const WorkOrdersPage = Page.list(
  'work-orders-page',
  'Work Orders'
);

// Create a layout for the work orders page
const workOrdersLayout = Layout.grid(
  'work-orders-layout',
  2,
  2
);

// Replace the default layout
WorkOrdersPage.layout = workOrdersLayout;

// Add work orders table to the first row, spanning all columns
WorkOrdersPage.addComponent(
  'work-orders-layout-area-0-0',
  {
    id: 'work-orders-table',
    type: 'table',
    name: 'Work Orders Table',
    props: {
      columns: [
        { key: 'workOrderNumber', title: 'WO #' },
        { key: 'title', title: 'Title' },
        { key: 'customer.name', title: 'Customer' },
        { key: 'serviceType', title: 'Service Type' },
        { key: 'status', title: 'Status' },
        { key: 'priority', title: 'Priority' },
        { key: 'technician.name', title: 'Technician' },
        { key: 'scheduledStart', title: 'Scheduled' },
        { key: 'actions', title: 'Actions' },
      ],
      pagination: true,
      pageSize: 10,
      sortable: true,
      filterable: true,
      onRowClick: 'handleWorkOrderClick',
    },
    dataBinding: {
      source: 'workOrders',
    },
    styles: {
      width: '100%',
      gridColumn: 'span 2',
    },
  }
);

// Add work order form to the second row, first column
WorkOrdersPage.addComponent(
  'work-orders-layout-area-1-0',
  WorkOrderForm
);

// Add work order details to the second row, second column
WorkOrdersPage.addComponent(
  'work-orders-layout-area-1-1',
  {
    id: 'work-order-details',
    type: 'container',
    name: 'Work Order Details',
    children: [
      {
        id: 'work-order-details-title',
        type: 'text',
        name: 'Work Order Details',
        props: {
          content: 'Work Order Details',
        },
        styles: {
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: '#FFFFFF',
          marginBottom: '1rem',
        },
      },
      {
        id: 'work-order-details-card',
        type: 'card',
        name: 'Details Card',
        props: {
          title: 'Work Order #{{selectedWorkOrder.workOrderNumber}}',
        },
        children: [
          {
            id: 'work-order-details-content',
            type: 'container',
            name: 'Details Content',
            children: [
              {
                id: 'work-order-customer-label',
                type: 'text',
                name: 'Customer Label',
                props: {
                  content: 'Customer:',
                },
                styles: {
                  fontWeight: 'bold',
                  marginBottom: '0.25rem',
                },
              },
              {
                id: 'work-order-customer',
                type: 'text',
                name: 'Customer',
                props: {
                  content: '{{selectedWorkOrder.customer.name}}',
                },
                styles: {
                  marginBottom: '0.75rem',
                },
              },
              {
                id: 'work-order-service-type-label',
                type: 'text',
                name: 'Service Type Label',
                props: {
                  content: 'Service Type:',
                },
                styles: {
                  fontWeight: 'bold',
                  marginBottom: '0.25rem',
                },
              },
              {
                id: 'work-order-service-type',
                type: 'text',
                name: 'Service Type',
                props: {
                  content: '{{selectedWorkOrder.serviceType}}',
                },
                styles: {
                  marginBottom: '0.75rem',
                },
              },
              {
                id: 'work-order-status-label',
                type: 'text',
                name: 'Status Label',
                props: {
                  content: 'Status:',
                },
                styles: {
                  fontWeight: 'bold',
                  marginBottom: '0.25rem',
                },
              },
              {
                id: 'work-order-status',
                type: 'badge',
                name: 'Status',
                props: {
                  content: '{{selectedWorkOrder.status}}',
                },
                styles: {
                  marginBottom: '0.75rem',
                },
              },
              {
                id: 'work-order-description-label',
                type: 'text',
                name: 'Description Label',
                props: {
                  content: 'Description:',
                },
                styles: {
                  fontWeight: 'bold',
                  marginBottom: '0.25rem',
                },
              },
              {
                id: 'work-order-description',
                type: 'text',
                name: 'Description',
                props: {
                  content: '{{selectedWorkOrder.description}}',
                },
                styles: {
                  marginBottom: '0.75rem',
                },
              },
            ],
            styles: {
              padding: '1rem',
            },
          },
        ],
        styles: {
          backgroundColor: '#1E2A3A',
          borderRadius: '0.5rem',
          marginBottom: '1rem',
        },
      },
      {
        id: 'work-order-actions',
        type: 'container',
        name: 'Actions',
        children: [
          {
            id: 'work-order-edit-button',
            type: 'button',
            name: 'Edit',
            props: {
              content: 'Edit Work Order',
              onClick: 'editWorkOrder',
              variant: 'primary',
            },
            styles: {
              marginRight: '0.5rem',
            },
          },
          {
            id: 'work-order-delete-button',
            type: 'button',
            name: 'Delete',
            props: {
              content: 'Delete Work Order',
              onClick: 'deleteWorkOrder',
              variant: 'danger',
            },
          },
        ],
        styles: {
          display: 'flex',
          justifyContent: 'flex-end',
        },
      },
    ],
    styles: {
      padding: '1.5rem',
      backgroundColor: '#121926',
      borderRadius: '0.5rem',
    },
    dataBinding: {
      source: 'selectedWorkOrder',
    },
  }
);

/**
 * Customers Page
 */
export const CustomersPage = Page.list(
  'customers-page',
  'Customers'
);

// Create a layout for the customers page
const customersLayout = Layout.grid(
  'customers-layout',
  2,
  2
);

// Replace the default layout
CustomersPage.layout = customersLayout;

// Add customers table to the first row, spanning all columns
CustomersPage.addComponent(
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
        { key: 'address', title: 'Address' },
        { key: 'type', title: 'Type' },
        { key: 'active', title: 'Active' },
        { key: 'actions', title: 'Actions' },
      ],
      pagination: true,
      pageSize: 10,
      sortable: true,
      filterable: true,
      onRowClick: 'handleCustomerClick',
    },
    dataBinding: {
      source: 'customers',
    },
    styles: {
      width: '100%',
      gridColumn: 'span 2',
    },
  }
);

// Add customer form to the second row, first column
CustomersPage.addComponent(
  'customers-layout-area-1-0',
  {
    id: 'customer-form',
    type: 'form',
    name: 'Customer Form',
    props: {
      onSubmit: 'handleCustomerSubmit',
    },
    children: [
      {
        id: 'customer-form-title',
        type: 'text',
        name: 'Customer Form Title',
        props: {
          content: 'Add Customer',
        },
        styles: {
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: '#FFFFFF',
          marginBottom: '1rem',
        },
      },
      {
        id: 'customer-name-input',
        type: 'input',
        name: 'Name',
        props: {
          label: 'Name',
          placeholder: 'Enter customer name',
          required: true,
        },
        styles: {
          marginBottom: '1rem',
        },
      },
      {
        id: 'customer-email-input',
        type: 'input',
        name: 'Email',
        props: {
          label: 'Email',
          placeholder: 'Enter customer email',
          type: 'email',
          required: true,
        },
        styles: {
          marginBottom: '1rem',
        },
      },
      {
        id: 'customer-phone-input',
        type: 'input',
        name: 'Phone',
        props: {
          label: 'Phone',
          placeholder: 'Enter customer phone',
          required: true,
        },
        styles: {
          marginBottom: '1rem',
        },
      },
      {
        id: 'customer-address-input',
        type: 'textarea',
        name: 'Address',
        props: {
          label: 'Address',
          placeholder: 'Enter customer address',
          required: true,
          rows: 3,
        },
        styles: {
          marginBottom: '1rem',
        },
      },
      {
        id: 'customer-type-select',
        type: 'select',
        name: 'Type',
        props: {
          label: 'Customer Type',
          options: [
            { value: 'Residential', label: 'Residential' },
            { value: 'Commercial', label: 'Commercial' },
          ],
          required: true,
        },
        styles: {
          marginBottom: '1rem',
        },
      },
      {
        id: 'customer-active-checkbox',
        type: 'checkbox',
        name: 'Active',
        props: {
          label: 'Active',
          defaultChecked: true,
        },
        styles: {
          marginBottom: '1.5rem',
        },
      },
      {
        id: 'customer-submit-button',
        type: 'button',
        name: 'Submit',
        props: {
          content: 'Add Customer',
          type: 'submit',
          variant: 'primary',
        },
        styles: {
          width: '100%',
        },
      },
    ],
    styles: {
      padding: '1.5rem',
      backgroundColor: '#121926',
      borderRadius: '0.5rem',
    },
  }
);

// Add customer details to the second row, second column
CustomersPage.addComponent(
  'customers-layout-area-1-1',
  {
    id: 'customer-details',
    type: 'container',
    name: 'Customer Details',
    children: [
      {
        id: 'customer-details-title',
        type: 'text',
        name: 'Customer Details Title',
        props: {
          content: 'Customer Details',
        },
        styles: {
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: '#FFFFFF',
          marginBottom: '1rem',
        },
      },
      {
        id: 'customer-details-card',
        type: 'card',
        name: 'Details Card',
        props: {
          title: '{{selectedCustomer.name}}',
        },
        children: [
          {
            id: 'customer-details-content',
            type: 'container',
            name: 'Details Content',
            children: [
              {
                id: 'customer-email-label',
                type: 'text',
                name: 'Email Label',
                props: {
                  content: 'Email:',
                },
                styles: {
                  fontWeight: 'bold',
                  marginBottom: '0.25rem',
                },
              },
              {
                id: 'customer-email',
                type: 'text',
                name: 'Email',
                props: {
                  content: '{{selectedCustomer.email}}',
                },
                styles: {
                  marginBottom: '0.75rem',
                },
              },
              {
                id: 'customer-phone-label',
                type: 'text',
                name: 'Phone Label',
                props: {
                  content: 'Phone:',
                },
                styles: {
                  fontWeight: 'bold',
                  marginBottom: '0.25rem',
                },
              },
              {
                id: 'customer-phone',
                type: 'text',
                name: 'Phone',
                props: {
                  content: '{{selectedCustomer.phone}}',
                },
                styles: {
                  marginBottom: '0.75rem',
                },
              },
              {
                id: 'customer-address-label',
                type: 'text',
                name: 'Address Label',
                props: {
                  content: 'Address:',
                },
                styles: {
                  fontWeight: 'bold',
                  marginBottom: '0.25rem',
                },
              },
              {
                id: 'customer-address',
                type: 'text',
                name: 'Address',
                props: {
                  content: '{{selectedCustomer.address}}',
                },
                styles: {
                  marginBottom: '0.75rem',
                },
              },
              {
                id: 'customer-type-label',
                type: 'text',
                name: 'Type Label',
                props: {
                  content: 'Type:',
                },
                styles: {
                  fontWeight: 'bold',
                  marginBottom: '0.25rem',
                },
              },
              {
                id: 'customer-type',
                type: 'badge',
                name: 'Type',
                props: {
                  content: '{{selectedCustomer.type}}',
                },
                styles: {
                  marginBottom: '0.75rem',
                },
              },
            ],
            styles: {
              padding: '1rem',
            },
          },
        ],
        styles: {
          backgroundColor: '#1E2A3A',
          borderRadius: '0.5rem',
          marginBottom: '1rem',
        },
      },
      {
        id: 'customer-work-orders-title',
        type: 'text',
        name: 'Work Orders Title',
        props: {
          content: 'Work Orders',
        },
        styles: {
          fontSize: '1rem',
          fontWeight: 'bold',
          color: '#FFFFFF',
          marginBottom: '0.5rem',
          marginTop: '1rem',
        },
      },
      {
        id: 'customer-work-orders-list',
        type: 'list',
        name: 'Work Orders List',
        props: {
          items: '{{selectedCustomer.workOrders}}',
          renderItem: 'renderWorkOrderItem',
        },
        styles: {
          backgroundColor: '#1E2A3A',
          borderRadius: '0.5rem',
          marginBottom: '1rem',
        },
      },
      {
        id: 'customer-actions',
        type: 'container',
        name: 'Actions',
        children: [
          {
            id: 'customer-edit-button',
            type: 'button',
            name: 'Edit',
            props: {
              content: 'Edit Customer',
              onClick: 'editCustomer',
              variant: 'primary',
            },
            styles: {
              marginRight: '0.5rem',
            },
          },
          {
            id: 'customer-delete-button',
            type: 'button',
            name: 'Delete',
            props: {
              content: 'Delete Customer',
              onClick: 'deleteCustomer',
              variant: 'danger',
            },
          },
        ],
        styles: {
          display: 'flex',
          justifyContent: 'flex-end',
        },
      },
    ],
    styles: {
      padding: '1.5rem',
      backgroundColor: '#121926',
      borderRadius: '0.5rem',
    },
    dataBinding: {
      source: 'selectedCustomer',
    },
  }
);

/**
 * Technicians Page
 */
export const TechniciansPage = Page.list(
  'technicians-page',
  'Technicians'
);

// Create a layout for the technicians page
const techniciansLayout = Layout.grid(
  'technicians-layout',
  2,
  2
);

// Replace the default layout
TechniciansPage.layout = techniciansLayout;

// Add technicians table to the first row, spanning all columns
TechniciansPage.addComponent(
  'technicians-layout-area-0-0',
  {
    id: 'technicians-table',
    type: 'table',
    name: 'Technicians Table',
    props: {
      columns: [
        { key: 'name', title: 'Name' },
        { key: 'email', title: 'Email' },
        { key: 'phone', title: 'Phone' },
        { key: 'status', title: 'Status' },
        { key: 'skills', title: 'Skills' },
        { key: 'hourlyRate', title: 'Hourly Rate' },
        { key: 'active', title: 'Active' },
        { key: 'actions', title: 'Actions' },
      ],
      pagination: true,
      pageSize: 10,
      sortable: true,
      filterable: true,
      onRowClick: 'handleTechnicianClick',
    },
    dataBinding: {
      source: 'technicians',
    },
    styles: {
      width: '100%',
      gridColumn: 'span 2',
    },
  }
);

// Add technician schedule to the second row, spanning all columns
TechniciansPage.addComponent(
  'technicians-layout-area-1-0',
  {
    id: 'technician-schedule',
    type: 'custom',
    name: 'Technician Schedule',
    componentType: 'ScheduleCalendar',
    props: {
      view: 'week',
      events: '{{selectedTechnicianSchedule}}',
      onEventClick: 'handleScheduleEventClick',
      onSlotClick: 'handleScheduleSlotClick',
    },
    styles: {
      height: '500px',
      backgroundColor: '#1E2A3A',
      borderRadius: '0.5rem',
      padding: '1rem',
      gridColumn: 'span 2',
    },
    dataBinding: {
      source: 'selectedTechnicianSchedule',
    },
  }
);

/**
 * Equipment Page
 */
export const EquipmentPage = Page.list(
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
EquipmentPage.layout = equipmentLayout;

// Add equipment table to the first row, spanning all columns
EquipmentPage.addComponent(
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
        { key: 'customer.name', title: 'Customer' },
        { key: 'installDate', title: 'Install Date' },
        { key: 'lastServiceDate', title: 'Last Service' },
        { key: 'actions', title: 'Actions' },
      ],
      pagination: true,
      pageSize: 10,
      sortable: true,
      filterable: true,
      onRowClick: 'handleEquipmentClick',
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

// Add equipment details to the second row, first column
EquipmentPage.addComponent(
  'equipment-layout-area-1-0',
  {
    id: 'equipment-details',
    type: 'container',
    name: 'Equipment Details',
    children: [
      {
        id: 'equipment-details-title',
        type: 'text',
        name: 'Equipment Details Title',
        props: {
          content: 'Equipment Details',
        },
        styles: {
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: '#FFFFFF',
          marginBottom: '1rem',
        },
      },
      {
        id: 'equipment-details-card',
        type: 'card',
        name: 'Details Card',
        props: {
          title: '{{selectedEquipment.name}}',
        },
        children: [
          {
            id: 'equipment-details-content',
            type: 'container',
            name: 'Details Content',
            children: [
              {
                id: 'equipment-model-label',
                type: 'text',
                name: 'Model Label',
                props: {
                  content: 'Model:',
                },
                styles: {
                  fontWeight: 'bold',
                  marginBottom: '0.25rem',
                },
              },
              {
                id: 'equipment-model',
                type: 'text',
                name: 'Model',
                props: {
                  content: '{{selectedEquipment.model}}',
                },
                styles: {
                  marginBottom: '0.75rem',
                },
              },
              {
                id: 'equipment-serial-label',
                type: 'text',
                name: 'Serial Label',
                props: {
                  content: 'Serial Number:',
                },
                styles: {
                  fontWeight: 'bold',
                  marginBottom: '0.25rem',
                },
              },
              {
                id: 'equipment-serial',
                type: 'text',
                name: 'Serial',
                props: {
                  content: '{{selectedEquipment.serialNumber}}',
                },
                styles: {
                  marginBottom: '0.75rem',
                },
              },
              {
                id: 'equipment-manufacturer-label',
                type: 'text',
                name: 'Manufacturer Label',
                props: {
                  content: 'Manufacturer:',
                },
                styles: {
                  fontWeight: 'bold',
                  marginBottom: '0.25rem',
                },
              },
              {
                id: 'equipment-manufacturer',
                type: 'text',
                name: 'Manufacturer',
                props: {
                  content: '{{selectedEquipment.manufacturer}}',
                },
                styles: {
                  marginBottom: '0.75rem',
                },
              },
              {
                id: 'equipment-type-label',
                type: 'text',
                name: 'Type Label',
                props: {
                  content: 'Type:',
                },
                styles: {
                  fontWeight: 'bold',
                  marginBottom: '0.25rem',
                },
              },
              {
                id: 'equipment-type',
                type: 'badge',
                name: 'Type',
                props: {
                  content: '{{selectedEquipment.type}}',
                },
                styles: {
                  marginBottom: '0.75rem',
                },
              },
              {
                id: 'equipment-install-date-label',
                type: 'text',
                name: 'Install Date Label',
                props: {
                  content: 'Installation Date:',
                },
                styles: {
                  fontWeight: 'bold',
                  marginBottom: '0.25rem',
                },
              },
              {
                id: 'equipment-install-date',
                type: 'text',
                name: 'Install Date',
                props: {
                  content: '{{formatDate(selectedEquipment.installDate)}}',
                },
                styles: {
                  marginBottom: '0.75rem',
                },
              },
            ],
            styles: {
              padding: '1rem',
            },
          },
        ],
        styles: {
          backgroundColor: '#1E2A3A',
          borderRadius: '0.5rem',
          marginBottom: '1rem',
        },
      },
    ],
    styles: {
      padding: '1.5rem',
      backgroundColor: '#121926',
      borderRadius: '0.5rem',
    },
    dataBinding: {
      source: 'selectedEquipment',
    },
  }
);

// Add service history to the second row, second column
EquipmentPage.addComponent(
  'equipment-layout-area-1-1',
  {
    id: 'equipment-service-history',
    type: 'container',
    name: 'Service History',
    children: [
      {
        id: 'equipment-service-history-title',
        type: 'text',
        name: 'Service History Title',
        props: {
          content: 'Service History',
        },
        styles: {
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: '#FFFFFF',
          marginBottom: '1rem',
        },
      },
      {
        id: 'equipment-service-history-list',
        type: 'list',
        name: 'Service History List',
        props: {
          items: '{{selectedEquipment.workOrders}}',
          renderItem: 'renderServiceHistoryItem',
        },
        styles: {
          backgroundColor: '#1E2A3A',
          borderRadius: '0.5rem',
          marginBottom: '1rem',
        },
      },
      {
        id: 'equipment-service-history-chart',
        type: 'chart',
        name: 'Service History Chart',
        props: {
          chartType: 'bar',
          title: 'Service Frequency',
          data: '{{selectedEquipment.serviceHistoryChart}}',
          height: 250,
        },
        styles: {
          backgroundColor: '#1E2A3A',
          borderRadius: '0.5rem',
          padding: '1rem',
        },
      },
    ],
    styles: {
      padding: '1.5rem',
      backgroundColor: '#121926',
      borderRadius: '0.5rem',
    },
    dataBinding: {
      source: 'selectedEquipment',
    },
  }
);

/**
 * Invoices Page
 */
export const InvoicesPage = Page.list(
  'invoices-page',
  'Invoices'
);

// Create a layout for the invoices page
const invoicesLayout = Layout.grid(
  'invoices-layout',
  2,
  2
);

// Replace the default layout
InvoicesPage.layout = invoicesLayout;

// Add invoices table to the first row, spanning all columns
InvoicesPage.addComponent(
  'invoices-layout-area-0-0',
  {
    id: 'invoices-table',
    type: 'table',
    name: 'Invoices Table',
    props: {
      columns: [
        { key: 'invoiceNumber', title: 'Invoice #' },
        { key: 'customer.name', title: 'Customer' },
        { key: 'workOrder.workOrderNumber', title: 'Work Order #' },
        { key: 'invoiceDate', title: 'Invoice Date' },
        { key: 'dueDate', title: 'Due Date' },
        { key: 'total', title: 'Total' },
        { key: 'status', title: 'Status' },
        { key: 'actions', title: 'Actions' },
      ],
      pagination: true,
      pageSize: 10,
      sortable: true,
      filterable: true,
      onRowClick: 'handleInvoiceClick',
    },
    dataBinding: {
      source: 'invoices',
    },
    styles: {
      width: '100%',
      gridColumn: 'span 2',
    },
  }
);

// Add invoice details to the second row, first column
InvoicesPage.addComponent(
  'invoices-layout-area-1-0',
  {
    id: 'invoice-details',
    type: 'container',
    name: 'Invoice Details',
    children: [
      {
        id: 'invoice-details-title',
        type: 'text',
        name: 'Invoice Details Title',
        props: {
          content: 'Invoice Details',
        },
        styles: {
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: '#FFFFFF',
          marginBottom: '1rem',
        },
      },
      {
        id: 'invoice-details-card',
        type: 'card',
        name: 'Details Card',
        props: {
          title: 'Invoice #{{selectedInvoice.invoiceNumber}}',
        },
        children: [
          {
            id: 'invoice-details-content',
            type: 'container',
            name: 'Details Content',
            children: [
              {
                id: 'invoice-customer-label',
                type: 'text',
                name: 'Customer Label',
                props: {
                  content: 'Customer:',
                },
                styles: {
                  fontWeight: 'bold',
                  marginBottom: '0.25rem',
                },
              },
              {
                id: 'invoice-customer',
                type: 'text',
                name: 'Customer',
                props: {
                  content: '{{selectedInvoice.customer.name}}',
                },
                styles: {
                  marginBottom: '0.75rem',
                },
              },
              {
                id: 'invoice-work-order-label',
                type: 'text',
                name: 'Work Order Label',
                props: {
                  content: 'Work Order:',
                },
                styles: {
                  fontWeight: 'bold',
                  marginBottom: '0.25rem',
                },
              },
              {
                id: 'invoice-work-order',
                type: 'text',
                name: 'Work Order',
                props: {
                  content: '#{{selectedInvoice.workOrder.workOrderNumber}}',
                },
                styles: {
                  marginBottom: '0.75rem',
                },
              },
              {
                id: 'invoice-dates-container',
                type: 'container',
                name: 'Dates Container',
                children: [
                  {
                    id: 'invoice-date-label',
                    type: 'text',
                    name: 'Invoice Date Label',
                    props: {
                      content: 'Invoice Date:',
                    },
                    styles: {
                      fontWeight: 'bold',
                      marginBottom: '0.25rem',
                    },
                  },
                  {
                    id: 'invoice-date',
                    type: 'text',
                    name: 'Invoice Date',
                    props: {
                      content: '{{formatDate(selectedInvoice.invoiceDate)}}',
                    },
                    styles: {
                      marginBottom: '0.75rem',
                    },
                  },
                  {
                    id: 'invoice-due-date-label',
                    type: 'text',
                    name: 'Due Date Label',
                    props: {
                      content: 'Due Date:',
                    },
                    styles: {
                      fontWeight: 'bold',
                      marginBottom: '0.25rem',
                    },
                  },
                  {
                    id: 'invoice-due-date',
                    type: 'text',
                    name: 'Due Date',
                    props: {
                      content: '{{formatDate(selectedInvoice.dueDate)}}',
                    },
                    styles: {
                      marginBottom: '0.75rem',
                    },
                  },
                ],
                styles: {
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.75rem',
                },
              },
              {
                id: 'invoice-status-label',
                type: 'text',
                name: 'Status Label',
                props: {
                  content: 'Status:',
                },
                styles: {
                  fontWeight: 'bold',
                  marginBottom: '0.25rem',
                },
              },
              {
                id: 'invoice-status',
                type: 'badge',
                name: 'Status',
                props: {
                  content: '{{selectedInvoice.status}}',
                },
                styles: {
                  marginBottom: '0.75rem',
                },
              },
            ],
            styles: {
              padding: '1rem',
            },
          },
        ],
        styles: {
          backgroundColor: '#1E2A3A',
          borderRadius: '0.5rem',
          marginBottom: '1rem',
        },
      },
    ],
    styles: {
      padding: '1.5rem',
      backgroundColor: '#121926',
      borderRadius: '0.5rem',
    },
    dataBinding: {
      source: 'selectedInvoice',
    },
  }
);

// Add invoice line items to the second row, second column
InvoicesPage.addComponent(
  'invoices-layout-area-1-1',
  {
    id: 'invoice-line-items',
    type: 'container',
    name: 'Invoice Line Items',
    children: [
      {
        id: 'invoice-line-items-title',
        type: 'text',
        name: 'Line Items Title',
        props: {
          content: 'Line Items',
        },
        styles: {
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: '#FFFFFF',
          marginBottom: '1rem',
        },
      },
      {
        id: 'invoice-line-items-table',
        type: 'table',
        name: 'Line Items Table',
        props: {
          columns: [
            { key: 'description', title: 'Description' },
            { key: 'quantity', title: 'Quantity' },
            { key: 'unitPrice', title: 'Unit Price' },
            { key: 'amount', title: 'Amount' },
            { key: 'type', title: 'Type' },
          ],
          pagination: false,
        },
        dataBinding: {
          source: 'selectedInvoice.lineItems',
        },
        styles: {
          backgroundColor: '#1E2A3A',
          borderRadius: '0.5rem',
          marginBottom: '1rem',
        },
      },
      {
        id: 'invoice-totals',
        type: 'container',
        name: 'Invoice Totals',
        children: [
          {
            id: 'invoice-subtotal-container',
            type: 'container',
            name: 'Subtotal Container',
            children: [
              {
                id: 'invoice-subtotal-label',
                type: 'text',
                name: 'Subtotal Label',
                props: {
                  content: 'Subtotal:',
                },
                styles: {
                  fontWeight: 'bold',
                },
              },
              {
                id: 'invoice-subtotal',
                type: 'text',
                name: 'Subtotal',
                props: {
                  content: '${{selectedInvoice.subtotal}}',
                },
                styles: {
                  textAlign: 'right',
                },
              },
            ],
            styles: {
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem',
            },
          },
          {
            id: 'invoice-tax-container',
            type: 'container',
            name: 'Tax Container',
            children: [
              {
                id: 'invoice-tax-label',
                type: 'text',
                name: 'Tax Label',
                props: {
                  content: 'Tax:',
                },
                styles: {
                  fontWeight: 'bold',
                },
              },
              {
                id: 'invoice-tax',
                type: 'text',
                name: 'Tax',
                props: {
                  content: '${{selectedInvoice.taxAmount}}',
                },
                styles: {
                  textAlign: 'right',
                },
              },
            ],
            styles: {
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem',
            },
          },
          {
            id: 'invoice-total-container',
            type: 'container',
            name: 'Total Container',
            children: [
              {
                id: 'invoice-total-label',
                type: 'text',
                name: 'Total Label',
                props: {
                  content: 'Total:',
                },
                styles: {
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                },
              },
              {
                id: 'invoice-total',
                type: 'text',
                name: 'Total',
                props: {
                  content: '${{selectedInvoice.total}}',
                },
                styles: {
                  textAlign: 'right',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                },
              },
            ],
            styles: {
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '1rem',
              borderTop: '1px solid #607D8B',
              paddingTop: '0.5rem',
            },
          },
        ],
        styles: {
          backgroundColor: '#1E2A3A',
          borderRadius: '0.5rem',
          padding: '1rem',
        },
      },
    ],
    styles: {
      padding: '1.5rem',
      backgroundColor: '#121926',
      borderRadius: '0.5rem',
    },
    dataBinding: {
      source: 'selectedInvoice',
    },
  }
);

/**
 * Technician Mobile Page
 */
export const TechnicianMobilePage = Page.mobile(
  'technician-mobile-page',
  'Technician Mobile'
);

// Add technician mobile view to the page
TechnicianMobilePage.addComponent(
  'technician-mobile-page-content',
  TechnicianMobileView
);

/**
 * Export all HVAC service pages
 */
export const HVACServicePages = [
  DashboardPage,
  WorkOrdersPage,
  CustomersPage,
  TechniciansPage,
  EquipmentPage,
  InvoicesPage,
  TechnicianMobilePage,
];