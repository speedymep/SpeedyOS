import { Component, ComponentType } from '@speedyos/ui-builder';

/**
 * Service Request Form component
 */
export const ServiceRequestForm = Component.form(
  'service-request-form',
  [
    Component.text('service-request-form-title', 'Service Request Form', {
      styles: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
      },
    }),
    Component.input('service-request-title', 'Title', {
      props: {
        placeholder: 'Enter service request title',
        required: true,
      },
    }),
    Component.textarea('service-request-description', 'Description', {
      props: {
        placeholder: 'Enter service request description',
        required: true,
        rows: 4,
      },
    }),
    Component.select('service-request-priority', 'Priority', [
      { value: 'Low', label: 'Low' },
      { value: 'Medium', label: 'Medium' },
      { value: 'High', label: 'High' },
      { value: 'Emergency', label: 'Emergency' },
    ]),
    Component.select('service-request-type', 'Service Type', [
      { value: 'Repair', label: 'Repair' },
      { value: 'Maintenance', label: 'Maintenance' },
      { value: 'Installation', label: 'Installation' },
      { value: 'Inspection', label: 'Inspection' },
      { value: 'Other', label: 'Other' },
    ]),
    Component.checkbox('service-request-emergency', 'Emergency Service'),
    Component.date('service-request-requested-date', 'Requested Date'),
    Component.button('service-request-submit', 'Submit', {
      props: {
        type: 'submit',
        variant: 'primary',
      },
      styles: {
        marginTop: '1rem',
      },
    }),
  ],
  {
    props: {
      onSubmit: 'submitServiceRequest',
    },
    styles: {
      padding: '1rem',
      border: '1px solid #e0e0e0',
      borderRadius: '0.5rem',
      backgroundColor: '#f9f9f9',
    },
  }
);

/**
 * Technician Schedule component
 */
export const TechnicianSchedule = Component.custom(
  'technician-schedule',
  'ScheduleCalendar',
  {
    view: 'week',
    events: [],
    onEventClick: 'handleEventClick',
    onSlotClick: 'handleSlotClick',
  },
  {
    styles: {
      height: '600px',
      border: '1px solid #e0e0e0',
      borderRadius: '0.5rem',
      padding: '0.5rem',
    },
  }
);

/**
 * Equipment Details component
 */
export const EquipmentDetails = Component.card(
  'equipment-details',
  'Equipment Details',
  [
    Component.container('equipment-details-container', [
      Component.text('equipment-name-label', 'Name:', {
        styles: { fontWeight: 'bold' },
      }),
      Component.text('equipment-name', '', {
        dataBinding: {
          source: 'equipment',
          path: 'name',
        },
      }),
      Component.text('equipment-model-label', 'Model:', {
        styles: { fontWeight: 'bold', marginTop: '0.5rem' },
      }),
      Component.text('equipment-model', '', {
        dataBinding: {
          source: 'equipment',
          path: 'model',
        },
      }),
      Component.text('equipment-serial-label', 'Serial Number:', {
        styles: { fontWeight: 'bold', marginTop: '0.5rem' },
      }),
      Component.text('equipment-serial', '', {
        dataBinding: {
          source: 'equipment',
          path: 'serialNumber',
        },
      }),
      Component.text('equipment-manufacturer-label', 'Manufacturer:', {
        styles: { fontWeight: 'bold', marginTop: '0.5rem' },
      }),
      Component.text('equipment-manufacturer', '', {
        dataBinding: {
          source: 'equipment',
          path: 'manufacturer',
        },
      }),
      Component.text('equipment-type-label', 'Type:', {
        styles: { fontWeight: 'bold', marginTop: '0.5rem' },
      }),
      Component.text('equipment-type', '', {
        dataBinding: {
          source: 'equipment',
          path: 'type',
        },
      }),
      Component.text('equipment-install-date-label', 'Installation Date:', {
        styles: { fontWeight: 'bold', marginTop: '0.5rem' },
      }),
      Component.text('equipment-install-date', '', {
        dataBinding: {
          source: 'equipment',
          path: 'installationDate',
          transform: 'formatDate',
        },
      }),
      Component.text('equipment-last-service-label', 'Last Service Date:', {
        styles: { fontWeight: 'bold', marginTop: '0.5rem' },
      }),
      Component.text('equipment-last-service', '', {
        dataBinding: {
          source: 'equipment',
          path: 'lastServiceDate',
          transform: 'formatDate',
        },
      }),
    ]),
    Component.button('equipment-service-history', 'View Service History', {
      props: {
        onClick: 'viewServiceHistory',
        variant: 'secondary',
      },
      styles: {
        marginTop: '1rem',
      },
    }),
  ],
  {
    styles: {
      width: '100%',
      marginBottom: '1rem',
    },
  }
);

/**
 * Service Location Map component
 */
export const ServiceLocationMap = Component.custom(
  'service-location-map',
  'Map',
  {
    zoom: 12,
    markers: [],
    onMarkerClick: 'handleMarkerClick',
  },
  {
    styles: {
      height: '400px',
      width: '100%',
      border: '1px solid #e0e0e0',
      borderRadius: '0.5rem',
    },
  }
);

/**
 * Invoice Summary component
 */
export const InvoiceSummary = Component.container(
  'invoice-summary',
  [
    Component.text('invoice-summary-title', 'Invoice Summary', {
      styles: {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
      },
    }),
    Component.table(
      'invoice-summary-table',
      [
        { key: 'invoiceNumber', title: 'Invoice #' },
        { key: 'invoiceDate', title: 'Date' },
        { key: 'customer', title: 'Customer' },
        { key: 'total', title: 'Total' },
        { key: 'status', title: 'Status' },
        { key: 'actions', title: 'Actions' },
      ],
      {
        dataBinding: {
          source: 'invoices',
        },
        props: {
          pagination: true,
          pageSize: 10,
          sortable: true,
          filterable: true,
        },
      }
    ),
  ],
  {
    styles: {
      padding: '1rem',
      backgroundColor: '#ffffff',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    },
  }
);

/**
 * Customer Dashboard component
 */
export const CustomerDashboard = Component.container(
  'customer-dashboard',
  [
    Component.text('customer-dashboard-title', 'Customer Dashboard', {
      styles: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
      },
    }),
    Component.container(
      'customer-dashboard-stats',
      [
        Component.card(
          'customer-total-card',
          'Total Customers',
          [
            Component.text('customer-total', '0', {
              dataBinding: {
                source: 'customerStats',
                path: 'total',
              },
              styles: {
                fontSize: '2rem',
                fontWeight: 'bold',
                textAlign: 'center',
              },
            }),
          ],
          {
            styles: {
              padding: '1rem',
              textAlign: 'center',
            },
          }
        ),
        Component.card(
          'customer-active-card',
          'Active Customers',
          [
            Component.text('customer-active', '0', {
              dataBinding: {
                source: 'customerStats',
                path: 'active',
              },
              styles: {
                fontSize: '2rem',
                fontWeight: 'bold',
                textAlign: 'center',
                color: '#4caf50',
              },
            }),
          ],
          {
            styles: {
              padding: '1rem',
              textAlign: 'center',
            },
          }
        ),
        Component.card(
          'customer-new-card',
          'New This Month',
          [
            Component.text('customer-new', '0', {
              dataBinding: {
                source: 'customerStats',
                path: 'new',
              },
              styles: {
                fontSize: '2rem',
                fontWeight: 'bold',
                textAlign: 'center',
                color: '#2196f3',
              },
            }),
          ],
          {
            styles: {
              padding: '1rem',
              textAlign: 'center',
            },
          }
        ),
      ],
      {
        styles: {
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          marginBottom: '1.5rem',
        },
      }
    ),
    Component.chart(
      'customer-growth-chart',
      'line',
      {
        labels: [],
        datasets: [],
      },
      {
        props: {
          title: 'Customer Growth',
          height: 300,
        },
        dataBinding: {
          source: 'customerGrowth',
        },
        styles: {
          marginBottom: '1.5rem',
        },
      }
    ),
    Component.table(
      'recent-customers-table',
      [
        { key: 'name', title: 'Name' },
        { key: 'email', title: 'Email' },
        { key: 'phone', title: 'Phone' },
        { key: 'type', title: 'Type' },
        { key: 'createdAt', title: 'Created' },
        { key: 'actions', title: 'Actions' },
      ],
      {
        props: {
          title: 'Recent Customers',
          pagination: true,
          pageSize: 5,
        },
        dataBinding: {
          source: 'recentCustomers',
        },
      }
    ),
  ],
  {
    styles: {
      padding: '1.5rem',
      backgroundColor: '#f9f9f9',
      borderRadius: '0.5rem',
    },
  }
);

/**
 * Export all field service components
 */
export const FieldServiceComponents = [
  ServiceRequestForm,
  TechnicianSchedule,
  EquipmentDetails,
  ServiceLocationMap,
  InvoiceSummary,
  CustomerDashboard,
];