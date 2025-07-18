import { defineCollection } from '@nocobase/database';

export default defineCollection({
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
        required: true,
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
        required: true,
      },
    },
    {
      type: 'string',
      name: 'city',
      interface: 'input',
      uiSchema: {
        title: 'City',
        type: 'string',
        'x-component': 'Input',
        required: true,
      },
    },
    {
      type: 'string',
      name: 'state',
      interface: 'input',
      uiSchema: {
        title: 'State',
        type: 'string',
        'x-component': 'Input',
        required: true,
      },
    },
    {
      type: 'string',
      name: 'zipCode',
      interface: 'input',
      uiSchema: {
        title: 'Zip Code',
        type: 'string',
        'x-component': 'Input',
        required: true,
      },
    },
    {
      type: 'string',
      name: 'notes',
      interface: 'textarea',
      uiSchema: {
        title: 'Notes',
        type: 'string',
        'x-component': 'Input.TextArea',
      },
    },
    {
      type: 'hasMany',
      name: 'serviceRequests',
      target: 'serviceRequests',
      foreignKey: 'customerId',
      uiSchema: {
        title: 'Service Requests',
        'x-component': 'RecordPicker',
        'x-component-props': {
          multiple: true,
        },
      },
    },
    {
      type: 'hasMany',
      name: 'equipments',
      target: 'equipments',
      foreignKey: 'customerId',
      uiSchema: {
        title: 'Equipment',
        'x-component': 'RecordPicker',
        'x-component-props': {
          multiple: true,
        },
      },
    },
  ],
});