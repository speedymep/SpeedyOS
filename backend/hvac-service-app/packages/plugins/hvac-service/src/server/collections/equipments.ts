import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'equipments',
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
      type: 'string',
      name: 'type',
      interface: 'select',
      uiSchema: {
        title: 'Type',
        type: 'string',
        enum: [
          { label: 'Air Conditioner', value: 'air_conditioner' },
          { label: 'Furnace', value: 'furnace' },
          { label: 'Heat Pump', value: 'heat_pump' },
          { label: 'Boiler', value: 'boiler' },
          { label: 'Thermostat', value: 'thermostat' },
          { label: 'Other', value: 'other' },
        ],
        'x-component': 'Select',
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
        required: true,
      },
    },
    {
      type: 'date',
      name: 'lastServiceDate',
      interface: 'datetime',
      uiSchema: {
        title: 'Last Service Date',
        type: 'string',
        'x-component': 'DatePicker',
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
      type: 'belongsTo',
      name: 'customer',
      target: 'customers',
      foreignKey: 'customerId',
      uiSchema: {
        title: 'Customer',
        'x-component': 'RecordPicker',
        required: true,
      },
    },
    {
      type: 'hasMany',
      name: 'serviceRequests',
      target: 'serviceRequests',
      foreignKey: 'equipmentId',
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
      name: 'maintenanceHistory',
      target: 'maintenanceHistory',
      foreignKey: 'equipmentId',
      uiSchema: {
        title: 'Maintenance History',
        'x-component': 'RecordPicker',
        'x-component-props': {
          multiple: true,
        },
      },
    },
  ],
});