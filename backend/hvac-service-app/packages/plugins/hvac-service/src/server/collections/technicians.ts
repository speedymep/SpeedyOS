import { defineCollection } from '@nocobase/database';

export default defineCollection({
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
        required: true,
      },
    },
    {
      type: 'string',
      name: 'specialization',
      interface: 'select',
      uiSchema: {
        title: 'Specialization',
        type: 'string',
        enum: [
          { label: 'Installation', value: 'installation' },
          { label: 'Repair', value: 'repair' },
          { label: 'Maintenance', value: 'maintenance' },
          { label: 'General', value: 'general' },
        ],
        'x-component': 'Select',
        required: true,
      },
    },
    {
      type: 'string',
      name: 'certifications',
      interface: 'select',
      uiSchema: {
        title: 'Certifications',
        type: 'string',
        enum: [
          { label: 'EPA 608', value: 'epa_608' },
          { label: 'NATE', value: 'nate' },
          { label: 'HVAC Excellence', value: 'hvac_excellence' },
          { label: 'RSES', value: 'rses' },
        ],
        'x-component': 'Select',
        'x-component-props': {
          mode: 'multiple',
        },
      },
    },
    {
      type: 'string',
      name: 'status',
      interface: 'select',
      defaultValue: 'available',
      uiSchema: {
        title: 'Status',
        type: 'string',
        enum: [
          { label: 'Available', value: 'available' },
          { label: 'On Job', value: 'on_job' },
          { label: 'On Leave', value: 'on_leave' },
          { label: 'Unavailable', value: 'unavailable' },
        ],
        'x-component': 'Select',
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
      foreignKey: 'technicianId',
      uiSchema: {
        title: 'Service Requests',
        'x-component': 'RecordPicker',
        'x-component-props': {
          multiple: true,
        },
      },
    },
  ],
});