import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'inventory',
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
      name: 'partNumber',
      interface: 'input',
      uiSchema: {
        title: 'Part Number',
        type: 'string',
        'x-component': 'Input',
        required: true,
      },
    },
    {
      type: 'string',
      name: 'category',
      interface: 'select',
      uiSchema: {
        title: 'Category',
        type: 'string',
        enum: [
          { label: 'Filters', value: 'filters' },
          { label: 'Refrigerants', value: 'refrigerants' },
          { label: 'Compressors', value: 'compressors' },
          { label: 'Motors', value: 'motors' },
          { label: 'Thermostats', value: 'thermostats' },
          { label: 'Valves', value: 'valves' },
          { label: 'Coils', value: 'coils' },
          { label: 'Other', value: 'other' },
        ],
        'x-component': 'Select',
        required: true,
      },
    },
    {
      type: 'string',
      name: 'description',
      interface: 'textarea',
      uiSchema: {
        title: 'Description',
        type: 'string',
        'x-component': 'Input.TextArea',
      },
    },
    {
      type: 'integer',
      name: 'quantity',
      interface: 'integer',
      defaultValue: 0,
      uiSchema: {
        title: 'Quantity',
        type: 'number',
        'x-component': 'InputNumber',
        required: true,
      },
    },
    {
      type: 'integer',
      name: 'reorderLevel',
      interface: 'integer',
      defaultValue: 5,
      uiSchema: {
        title: 'Reorder Level',
        type: 'number',
        'x-component': 'InputNumber',
        required: true,
      },
    },
    {
      type: 'integer',
      name: 'unitCost',
      interface: 'integer',
      uiSchema: {
        title: 'Unit Cost',
        type: 'number',
        'x-component': 'InputNumber',
        'x-component-props': {
          prefix: '$',
          precision: 2,
        },
        required: true,
      },
    },
    {
      type: 'string',
      name: 'supplier',
      interface: 'input',
      uiSchema: {
        title: 'Supplier',
        type: 'string',
        'x-component': 'Input',
      },
    },
    {
      type: 'string',
      name: 'location',
      interface: 'input',
      uiSchema: {
        title: 'Storage Location',
        type: 'string',
        'x-component': 'Input',
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
  ],
});