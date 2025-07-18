import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'maintenanceHistory',
  fields: [
    {
      type: 'string',
      name: 'title',
      interface: 'input',
      uiSchema: {
        title: 'Title',
        type: 'string',
        'x-component': 'Input',
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
        required: true,
      },
    },
    {
      type: 'string',
      name: 'maintenanceType',
      interface: 'select',
      uiSchema: {
        title: 'Maintenance Type',
        type: 'string',
        enum: [
          { label: 'Routine', value: 'routine' },
          { label: 'Repair', value: 'repair' },
          { label: 'Replacement', value: 'replacement' },
          { label: 'Inspection', value: 'inspection' },
          { label: 'Other', value: 'other' },
        ],
        'x-component': 'Select',
        required: true,
      },
    },
    {
      type: 'date',
      name: 'date',
      interface: 'datetime',
      defaultValue: '{{$now}}',
      uiSchema: {
        title: 'Date',
        type: 'string',
        'x-component': 'DatePicker',
        'x-component-props': {
          showTime: true,
        },
        required: true,
      },
    },
    {
      type: 'integer',
      name: 'cost',
      interface: 'integer',
      uiSchema: {
        title: 'Cost',
        type: 'number',
        'x-component': 'InputNumber',
        'x-component-props': {
          prefix: '$',
          precision: 2,
        },
      },
    },
    {
      type: 'string',
      name: 'partsReplaced',
      interface: 'textarea',
      uiSchema: {
        title: 'Parts Replaced',
        type: 'string',
        'x-component': 'Input.TextArea',
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
      name: 'equipment',
      target: 'equipments',
      foreignKey: 'equipmentId',
      uiSchema: {
        title: 'Equipment',
        'x-component': 'RecordPicker',
        required: true,
      },
    },
    {
      type: 'belongsTo',
      name: 'technician',
      target: 'technicians',
      foreignKey: 'technicianId',
      uiSchema: {
        title: 'Technician',
        'x-component': 'RecordPicker',
      },
    },
  ],
});