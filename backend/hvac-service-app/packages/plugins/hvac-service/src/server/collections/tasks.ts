import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'tasks',
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
      name: 'status',
      interface: 'select',
      defaultValue: 'pending',
      uiSchema: {
        title: 'Status',
        type: 'string',
        enum: [
          { label: 'Pending', value: 'pending' },
          { label: 'In Progress', value: 'in_progress' },
          { label: 'Completed', value: 'completed' },
          { label: 'Cancelled', value: 'cancelled' },
        ],
        'x-component': 'Select',
        required: true,
      },
    },
    {
      type: 'integer',
      name: 'estimatedDuration',
      interface: 'integer',
      uiSchema: {
        title: 'Estimated Duration (minutes)',
        type: 'number',
        'x-component': 'InputNumber',
      },
    },
    {
      type: 'integer',
      name: 'actualDuration',
      interface: 'integer',
      uiSchema: {
        title: 'Actual Duration (minutes)',
        type: 'number',
        'x-component': 'InputNumber',
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
      name: 'serviceRequest',
      target: 'serviceRequests',
      foreignKey: 'serviceRequestId',
      uiSchema: {
        title: 'Service Request',
        'x-component': 'RecordPicker',
        required: true,
      },
    },
  ],
});