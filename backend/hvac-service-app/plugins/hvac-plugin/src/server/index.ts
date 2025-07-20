import { Plugin } from '@nocobase/server';

export class HVACPlugin extends Plugin {
  async load() {
    // Register collections
    this.app.db.collection({
      name: 'customers',
      fields: [
        {
          type: 'string',
          name: 'name',
          interface: 'input',
          uiSchema: {
            title: 'Name',
            type: 'string',
            'x-component': 'Input',
            required: true,
          },
        },
        {
          type: 'string',
          name: 'email',
          interface: 'input',
          uiSchema: {
            title: 'Email',
            type: 'string',
            'x-component': 'Input',
            required: true,
          },
        },
        {
          type: 'string',
          name: 'phone',
          interface: 'input',
          uiSchema: {
            title: 'Phone',
            type: 'string',
            'x-component': 'Input',
          },
        },
        {
          type: 'string',
          name: 'address',
          interface: 'textarea',
          uiSchema: {
            title: 'Address',
            type: 'string',
            'x-component': 'Input.TextArea',
          },
        },
      ],
    });

    this.app.db.collection({
      name: 'technicians',
      fields: [
        {
          type: 'string',
          name: 'name',
          interface: 'input',
          uiSchema: {
            title: 'Name',
            type: 'string',
            'x-component': 'Input',
            required: true,
          },
        },
        {
          type: 'string',
          name: 'email',
          interface: 'input',
          uiSchema: {
            title: 'Email',
            type: 'string',
            'x-component': 'Input',
            required: true,
          },
        },
        {
          type: 'string',
          name: 'phone',
          interface: 'input',
          uiSchema: {
            title: 'Phone',
            type: 'string',
            'x-component': 'Input',
          },
        },
        {
          type: 'json',
          name: 'skills',
          interface: 'select',
          uiSchema: {
            title: 'Skills',
            type: 'array',
            'x-component': 'Select',
            'x-component-props': {
              mode: 'multiple',
            },
            enum: [
              { label: 'Installation', value: 'installation' },
              { label: 'Repair', value: 'repair' },
              { label: 'Maintenance', value: 'maintenance' },
              { label: 'Diagnostics', value: 'diagnostics' },
            ],
          },
        },
      ],
    });

    this.app.db.collection({
      name: 'equipment',
      fields: [
        {
          type: 'string',
          name: 'type',
          interface: 'select',
          uiSchema: {
            title: 'Type',
            type: 'string',
            'x-component': 'Select',
            enum: [
              { label: 'Air Conditioner', value: 'ac' },
              { label: 'Furnace', value: 'furnace' },
              { label: 'Heat Pump', value: 'heat_pump' },
              { label: 'Boiler', value: 'boiler' },
              { label: 'Ductless Mini-Split', value: 'mini_split' },
            ],
            required: true,
          },
        },
        {
          type: 'string',
          name: 'model',
          interface: 'input',
          uiSchema: {
            title: 'Model',
            type: 'string',
            'x-component': 'Input',
            required: true,
          },
        },
        {
          type: 'string',
          name: 'serialNumber',
          interface: 'input',
          uiSchema: {
            title: 'Serial Number',
            type: 'string',
            'x-component': 'Input',
            required: true,
          },
        },
        {
          type: 'date',
          name: 'installationDate',
          interface: 'datetime',
          uiSchema: {
            title: 'Installation Date',
            type: 'string',
            'x-component': 'DatePicker',
          },
        },
        {
          type: 'belongsTo',
          name: 'customer',
          target: 'customers',
          uiSchema: {
            title: 'Customer',
            'x-component': 'AssociationSelect',
            'x-component-props': {
              fieldNames: {
                label: 'name',
                value: 'id',
              },
            },
          },
        },
      ],
    });

    this.app.db.collection({
      name: 'serviceRequests',
      fields: [
        {
          type: 'string',
          name: 'description',
          interface: 'textarea',
          uiSchema: {
            title: 'Description',
            type: 'string',
            'x-component': 'Input.TextArea',
            required: true,
          },
        },
        {
          type: 'string',
          name: 'status',
          interface: 'select',
          defaultValue: 'new',
          uiSchema: {
            title: 'Status',
            type: 'string',
            'x-component': 'Select',
            enum: [
              { label: 'New', value: 'new' },
              { label: 'Assigned', value: 'assigned' },
              { label: 'Scheduled', value: 'scheduled' },
              { label: 'In Progress', value: 'in_progress' },
              { label: 'Completed', value: 'completed' },
              { label: 'Cancelled', value: 'cancelled' },
            ],
            required: true,
          },
        },
        {
          type: 'string',
          name: 'priority',
          interface: 'select',
          defaultValue: 'medium',
          uiSchema: {
            title: 'Priority',
            type: 'string',
            'x-component': 'Select',
            enum: [
              { label: 'Low', value: 'low' },
              { label: 'Medium', value: 'medium' },
              { label: 'High', value: 'high' },
              { label: 'Emergency', value: 'emergency' },
            ],
            required: true,
          },
        },
        {
          type: 'date',
          name: 'scheduledDate',
          interface: 'datetime',
          uiSchema: {
            title: 'Scheduled Date',
            type: 'string',
            'x-component': 'DatePicker',
            'x-component-props': {
              showTime: true,
            },
          },
        },
        {
          type: 'belongsTo',
          name: 'customer',
          target: 'customers',
          uiSchema: {
            title: 'Customer',
            'x-component': 'AssociationSelect',
            'x-component-props': {
              fieldNames: {
                label: 'name',
                value: 'id',
              },
            },
            required: true,
          },
        },
        {
          type: 'belongsTo',
          name: 'technician',
          target: 'technicians',
          uiSchema: {
            title: 'Assigned Technician',
            'x-component': 'AssociationSelect',
            'x-component-props': {
              fieldNames: {
                label: 'name',
                value: 'id',
              },
            },
          },
        },
        {
          type: 'belongsTo',
          name: 'equipment',
          target: 'equipment',
          uiSchema: {
            title: 'Equipment',
            'x-component': 'AssociationSelect',
            'x-component-props': {
              fieldNames: {
                label: 'model',
                value: 'id',
              },
            },
          },
        },
      ],
    });

    // Register menus
    this.app.acl.allow('customers', '*');
    this.app.acl.allow('technicians', '*');
    this.app.acl.allow('equipment', '*');
    this.app.acl.allow('serviceRequests', '*');

    // Add menu items
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
      ],
    });
  }
}

export default HVACPlugin;