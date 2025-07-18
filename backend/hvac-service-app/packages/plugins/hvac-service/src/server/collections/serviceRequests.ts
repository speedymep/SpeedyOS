import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'serviceRequests',
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
      defaultValue: 'new',
      uiSchema: {
        title: 'Status',
        type: 'string',
        enum: [
          { label: 'New', value: 'new' },
          { label: 'Scheduled', value: 'scheduled' },
          { label: 'In Progress', value: 'in_progress' },
          { label: 'On Hold', value: 'on_hold' },
          { label: 'Completed', value: 'completed' },
          { label: 'Cancelled', value: 'cancelled' },
        ],
        'x-component': 'Select',
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
        enum: [
          { label: 'Low', value: 'low' },
          { label: 'Medium', value: 'medium' },
          { label: 'High', value: 'high' },
          { label: 'Emergency', value: 'emergency' },
        ],
        'x-component': 'Select',
        required: true,
      },
    },
    {
      type: 'string',
      name: 'serviceType',
      interface: 'select',
      uiSchema: {
        title: 'Service Type',
        type: 'string',
        enum: [
          { label: 'Installation', value: 'installation' },
          { label: 'Repair', value: 'repair' },
          { label: 'Maintenance', value: 'maintenance' },
          { label: 'Inspection', value: 'inspection' },
          { label: 'Other', value: 'other' },
        ],
        'x-component': 'Select',
        required: true,
      },
    },
    {
      type: 'date',
      name: 'requestDate',
      interface: 'datetime',
      defaultValue: '{{$now}}',
      uiSchema: {
        title: 'Request Date',
        type: 'string',
        'x-component': 'DatePicker',
        'x-component-props': {
          showTime: true,
        },
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
      type: 'date',
      name: 'completionDate',
      interface: 'datetime',
      uiSchema: {
        title: 'Completion Date',
        type: 'string',
        'x-component': 'DatePicker',
        'x-component-props': {
          showTime: true,
        },
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
      type: 'belongsTo',
      name: 'equipment',
      target: 'equipments',
      foreignKey: 'equipmentId',
      uiSchema: {
        title: 'Equipment',
        'x-component': 'RecordPicker',
      },
    },
    {
      type: 'belongsTo',
      name: 'assignedTechnician',
      target: 'technicians',
      foreignKey: 'technicianId',
      uiSchema: {
        title: 'Assigned Technician',
        'x-component': 'RecordPicker',
      },
    },
    {
      type: 'hasMany',
      name: 'tasks',
      target: 'tasks',
      foreignKey: 'serviceRequestId',
      uiSchema: {
        title: 'Tasks',
        'x-component': 'RecordPicker',
        'x-component-props': {
          multiple: true,
        },
      },
    },
  ],
});