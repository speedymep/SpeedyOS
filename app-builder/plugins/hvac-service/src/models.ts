import { Model, Field, FieldType, RelationshipType } from '@speedyos/data-modeling';

/**
 * Define the Customer model for HVAC service
 */
export const CustomerModel = new Model({
  name: 'customer',
  label: 'Customer',
  description: 'Customer information for HVAC services',
  fields: [
    Field.string('name', 'Name').makeRequired().toJSON(),
    Field.string('email', 'Email').makeRequired().toJSON(),
    Field.string('phone', 'Phone').makeRequired().toJSON(),
    Field.text('address', 'Address').makeRequired().toJSON(),
    Field.string('city', 'City').makeRequired().toJSON(),
    Field.string('state', 'State').makeRequired().toJSON(),
    Field.string('zip', 'ZIP Code').makeRequired().toJSON(),
    Field.enum('type', ['Residential', 'Commercial'], 'Customer Type').toJSON(),
    Field.boolean('active', 'Active').setDefaultValue(true).toJSON(),
  ],
  relationships: [
    {
      name: 'workOrders',
      type: RelationshipType.ONE_TO_MANY,
      targetModel: 'workOrder',
      label: 'Work Orders',
    },
    {
      name: 'equipment',
      type: RelationshipType.ONE_TO_MANY,
      targetModel: 'equipment',
      label: 'Equipment',
    },
    {
      name: 'serviceContracts',
      type: RelationshipType.ONE_TO_MANY,
      targetModel: 'serviceContract',
      label: 'Service Contracts',
    },
  ],
});

/**
 * Define the Technician model for HVAC service
 */
export const TechnicianModel = new Model({
  name: 'technician',
  label: 'Technician',
  description: 'HVAC service technicians',
  fields: [
    Field.string('name', 'Name').makeRequired().toJSON(),
    Field.string('email', 'Email').makeRequired().makeUnique().toJSON(),
    Field.string('phone', 'Phone').makeRequired().toJSON(),
    Field.enum('status', ['Available', 'On Job', 'Off Duty', 'On Leave'], 'Status')
      .setDefaultValue('Available')
      .toJSON(),
    Field.enum('skills', [
      'AC Repair', 
      'Heating', 
      'Installation', 
      'Maintenance', 
      'Refrigeration', 
      'Electrical'
    ], 'Skills').toJSON(),
    Field.number('hourlyRate', 'Hourly Rate').toJSON(),
    Field.text('notes', 'Notes').toJSON(),
    Field.boolean('active', 'Active').setDefaultValue(true).toJSON(),
  ],
  relationships: [
    {
      name: 'workOrders',
      type: RelationshipType.ONE_TO_MANY,
      targetModel: 'workOrder',
      label: 'Work Orders',
    },
    {
      name: 'schedule',
      type: RelationshipType.ONE_TO_MANY,
      targetModel: 'schedule',
      label: 'Schedule',
    },
  ],
});

/**
 * Define the Equipment model for HVAC service
 */
export const EquipmentModel = new Model({
  name: 'equipment',
  label: 'Equipment',
  description: 'HVAC equipment installed at customer locations',
  fields: [
    Field.string('name', 'Name').makeRequired().toJSON(),
    Field.string('model', 'Model Number').makeRequired().toJSON(),
    Field.string('serialNumber', 'Serial Number').makeRequired().makeUnique().toJSON(),
    Field.string('manufacturer', 'Manufacturer').makeRequired().toJSON(),
    Field.enum('type', [
      'Air Conditioner', 
      'Furnace', 
      'Heat Pump', 
      'Boiler', 
      'Thermostat', 
      'Air Handler',
      'Ductwork',
      'Water Heater'
    ], 'Equipment Type').makeRequired().toJSON(),
    Field.date('installDate', 'Installation Date').toJSON(),
    Field.date('lastServiceDate', 'Last Service Date').toJSON(),
    Field.number('btuRating', 'BTU Rating').toJSON(),
    Field.string('efficiency', 'Efficiency Rating').toJSON(),
    Field.number('age', 'Age (Years)').toJSON(),
    Field.text('location', 'Location in Building').toJSON(),
    Field.text('notes', 'Notes').toJSON(),
    Field.boolean('underWarranty', 'Under Warranty').setDefaultValue(false).toJSON(),
    Field.date('warrantyExpiration', 'Warranty Expiration').toJSON(),
  ],
  relationships: [
    {
      name: 'customer',
      type: RelationshipType.MANY_TO_ONE,
      targetModel: 'customer',
      label: 'Customer',
    },
    {
      name: 'workOrders',
      type: RelationshipType.ONE_TO_MANY,
      targetModel: 'workOrder',
      label: 'Work Orders',
    },
    {
      name: 'serviceContracts',
      type: RelationshipType.MANY_TO_MANY,
      targetModel: 'serviceContract',
      label: 'Service Contracts',
    },
  ],
});

/**
 * Define the Work Order model for HVAC service
 */
export const WorkOrderModel = new Model({
  name: 'workOrder',
  label: 'Work Order',
  description: 'HVAC service work orders',
  fields: [
    Field.string('workOrderNumber', 'Work Order #').makeRequired().makeUnique().toJSON(),
    Field.string('title', 'Title').makeRequired().toJSON(),
    Field.text('description', 'Description').makeRequired().toJSON(),
    Field.enum('priority', ['Low', 'Medium', 'High', 'Emergency'], 'Priority')
      .setDefaultValue('Medium')
      .toJSON(),
    Field.enum('status', [
      'New', 
      'Scheduled', 
      'En Route', 
      'On Site', 
      'In Progress', 
      'On Hold', 
      'Completed', 
      'Cancelled'
    ], 'Status')
      .setDefaultValue('New')
      .toJSON(),
    Field.enum('serviceType', [
      'Repair', 
      'Maintenance', 
      'Installation', 
      'Inspection', 
      'Warranty'
    ], 'Service Type').makeRequired().toJSON(),
    Field.datetime('scheduledStart', 'Scheduled Start').toJSON(),
    Field.datetime('scheduledEnd', 'Scheduled End').toJSON(),
    Field.datetime('actualStart', 'Actual Start').toJSON(),
    Field.datetime('actualEnd', 'Actual End').toJSON(),
    Field.number('estimatedHours', 'Estimated Hours').toJSON(),
    Field.number('actualHours', 'Actual Hours').toJSON(),
    Field.text('notes', 'Notes').toJSON(),
    Field.text('technicianNotes', 'Technician Notes').toJSON(),
    Field.boolean('partsNeeded', 'Parts Needed').setDefaultValue(false).toJSON(),
    Field.boolean('followUpRequired', 'Follow-up Required').setDefaultValue(false).toJSON(),
    Field.boolean('emergency', 'Emergency').setDefaultValue(false).toJSON(),
    Field.datetime('createdAt', 'Created At').toJSON(),
    Field.datetime('updatedAt', 'Updated At').toJSON(),
  ],
  relationships: [
    {
      name: 'customer',
      type: RelationshipType.MANY_TO_ONE,
      targetModel: 'customer',
      label: 'Customer',
    },
    {
      name: 'technician',
      type: RelationshipType.MANY_TO_ONE,
      targetModel: 'technician',
      label: 'Technician',
    },
    {
      name: 'equipment',
      type: RelationshipType.MANY_TO_ONE,
      targetModel: 'equipment',
      label: 'Equipment',
    },
    {
      name: 'invoice',
      type: RelationshipType.ONE_TO_ONE,
      targetModel: 'invoice',
      label: 'Invoice',
    },
    {
      name: 'parts',
      type: RelationshipType.ONE_TO_MANY,
      targetModel: 'part',
      label: 'Parts',
    },
  ],
});

/**
 * Define the Invoice model for HVAC service
 */
export const InvoiceModel = new Model({
  name: 'invoice',
  label: 'Invoice',
  description: 'HVAC service invoices',
  fields: [
    Field.string('invoiceNumber', 'Invoice #').makeRequired().makeUnique().toJSON(),
    Field.date('invoiceDate', 'Invoice Date').makeRequired().toJSON(),
    Field.date('dueDate', 'Due Date').makeRequired().toJSON(),
    Field.number('laborHours', 'Labor Hours').toJSON(),
    Field.number('laborRate', 'Labor Rate').toJSON(),
    Field.number('laborCost', 'Labor Cost').toJSON(),
    Field.number('partsCost', 'Parts Cost').toJSON(),
    Field.number('subtotal', 'Subtotal').toJSON(),
    Field.number('taxRate', 'Tax Rate').toJSON(),
    Field.number('taxAmount', 'Tax Amount').toJSON(),
    Field.number('total', 'Total').makeRequired().toJSON(),
    Field.enum('status', ['Draft', 'Sent', 'Paid', 'Overdue', 'Cancelled'], 'Status')
      .setDefaultValue('Draft')
      .toJSON(),
    Field.text('notes', 'Notes').toJSON(),
    Field.boolean('paid', 'Paid').setDefaultValue(false).toJSON(),
    Field.date('paidDate', 'Paid Date').toJSON(),
  ],
  relationships: [
    {
      name: 'customer',
      type: RelationshipType.MANY_TO_ONE,
      targetModel: 'customer',
      label: 'Customer',
    },
    {
      name: 'workOrder',
      type: RelationshipType.ONE_TO_ONE,
      targetModel: 'workOrder',
      label: 'Work Order',
    },
    {
      name: 'lineItems',
      type: RelationshipType.ONE_TO_MANY,
      targetModel: 'invoiceLineItem',
      label: 'Line Items',
    },
  ],
});

/**
 * Define the Invoice Line Item model for HVAC service
 */
export const InvoiceLineItemModel = new Model({
  name: 'invoiceLineItem',
  label: 'Invoice Line Item',
  description: 'Line items for HVAC service invoices',
  fields: [
    Field.string('description', 'Description').makeRequired().toJSON(),
    Field.number('quantity', 'Quantity').makeRequired().toJSON(),
    Field.number('unitPrice', 'Unit Price').makeRequired().toJSON(),
    Field.number('amount', 'Amount').makeRequired().toJSON(),
    Field.enum('type', ['Labor', 'Part', 'Material', 'Service', 'Fee', 'Discount'], 'Type')
      .makeRequired()
      .toJSON(),
  ],
  relationships: [
    {
      name: 'invoice',
      type: RelationshipType.MANY_TO_ONE,
      targetModel: 'invoice',
      label: 'Invoice',
    },
    {
      name: 'part',
      type: RelationshipType.MANY_TO_ONE,
      targetModel: 'part',
      label: 'Part',
    },
  ],
});

/**
 * Define the Part model for HVAC service
 */
export const PartModel = new Model({
  name: 'part',
  label: 'Part',
  description: 'HVAC parts inventory',
  fields: [
    Field.string('partNumber', 'Part Number').makeRequired().makeUnique().toJSON(),
    Field.string('name', 'Name').makeRequired().toJSON(),
    Field.text('description', 'Description').toJSON(),
    Field.string('manufacturer', 'Manufacturer').toJSON(),
    Field.enum('category', [
      'Compressor', 
      'Condenser', 
      'Evaporator', 
      'Filter', 
      'Fan', 
      'Motor', 
      'Thermostat',
      'Valve',
      'Refrigerant',
      'Electrical',
      'Other'
    ], 'Category').toJSON(),
    Field.number('cost', 'Cost').makeRequired().toJSON(),
    Field.number('price', 'Price').makeRequired().toJSON(),
    Field.number('quantity', 'Quantity in Stock').setDefaultValue(0).toJSON(),
    Field.number('reorderLevel', 'Reorder Level').setDefaultValue(5).toJSON(),
    Field.boolean('active', 'Active').setDefaultValue(true).toJSON(),
  ],
  relationships: [
    {
      name: 'workOrders',
      type: RelationshipType.MANY_TO_MANY,
      targetModel: 'workOrder',
      label: 'Work Orders',
    },
    {
      name: 'invoiceLineItems',
      type: RelationshipType.ONE_TO_MANY,
      targetModel: 'invoiceLineItem',
      label: 'Invoice Line Items',
    },
  ],
});

/**
 * Define the Service Contract model for HVAC service
 */
export const ServiceContractModel = new Model({
  name: 'serviceContract',
  label: 'Service Contract',
  description: 'HVAC service maintenance contracts',
  fields: [
    Field.string('contractNumber', 'Contract #').makeRequired().makeUnique().toJSON(),
    Field.string('name', 'Contract Name').makeRequired().toJSON(),
    Field.text('description', 'Description').toJSON(),
    Field.date('startDate', 'Start Date').makeRequired().toJSON(),
    Field.date('endDate', 'End Date').makeRequired().toJSON(),
    Field.enum('type', ['Basic', 'Standard', 'Premium', 'Custom'], 'Contract Type')
      .makeRequired()
      .toJSON(),
    Field.enum('frequency', ['Monthly', 'Quarterly', 'Semi-Annual', 'Annual'], 'Service Frequency')
      .makeRequired()
      .toJSON(),
    Field.number('price', 'Contract Price').makeRequired().toJSON(),
    Field.enum('billingCycle', ['Monthly', 'Quarterly', 'Semi-Annual', 'Annual'], 'Billing Cycle')
      .makeRequired()
      .toJSON(),
    Field.boolean('active', 'Active').setDefaultValue(true).toJSON(),
    Field.text('terms', 'Contract Terms').toJSON(),
    Field.date('nextServiceDate', 'Next Service Date').toJSON(),
    Field.date('lastServiceDate', 'Last Service Date').toJSON(),
  ],
  relationships: [
    {
      name: 'customer',
      type: RelationshipType.MANY_TO_ONE,
      targetModel: 'customer',
      label: 'Customer',
    },
    {
      name: 'equipment',
      type: RelationshipType.MANY_TO_MANY,
      targetModel: 'equipment',
      label: 'Equipment',
    },
    {
      name: 'workOrders',
      type: RelationshipType.ONE_TO_MANY,
      targetModel: 'workOrder',
      label: 'Work Orders',
    },
  ],
});

/**
 * Define the Schedule model for HVAC service
 */
export const ScheduleModel = new Model({
  name: 'schedule',
  label: 'Schedule',
  description: 'HVAC technician schedule',
  fields: [
    Field.datetime('startTime', 'Start Time').makeRequired().toJSON(),
    Field.datetime('endTime', 'End Time').makeRequired().toJSON(),
    Field.enum('type', ['Work Order', 'Break', 'Vacation', 'Training', 'Meeting', 'Other'], 'Type')
      .makeRequired()
      .toJSON(),
    Field.text('notes', 'Notes').toJSON(),
    Field.boolean('allDay', 'All Day').setDefaultValue(false).toJSON(),
  ],
  relationships: [
    {
      name: 'technician',
      type: RelationshipType.MANY_TO_ONE,
      targetModel: 'technician',
      label: 'Technician',
    },
    {
      name: 'workOrder',
      type: RelationshipType.MANY_TO_ONE,
      targetModel: 'workOrder',
      label: 'Work Order',
    },
  ],
});

/**
 * Define the Message model for HVAC service
 */
export const MessageModel = new Model({
  name: 'message',
  label: 'Message',
  description: 'SMS and in-app messages for HVAC service',
  fields: [
    Field.text('content', 'Content').makeRequired().toJSON(),
    Field.enum('type', ['SMS', 'In-App', 'Email'], 'Message Type').makeRequired().toJSON(),
    Field.enum('direction', ['Inbound', 'Outbound'], 'Direction').makeRequired().toJSON(),
    Field.datetime('sentAt', 'Sent At').toJSON(),
    Field.datetime('deliveredAt', 'Delivered At').toJSON(),
    Field.datetime('readAt', 'Read At').toJSON(),
    Field.boolean('read', 'Read').setDefaultValue(false).toJSON(),
  ],
  relationships: [
    {
      name: 'sender',
      type: RelationshipType.MANY_TO_ONE,
      targetModel: 'user',
      label: 'Sender',
    },
    {
      name: 'recipient',
      type: RelationshipType.MANY_TO_ONE,
      targetModel: 'user',
      label: 'Recipient',
    },
    {
      name: 'workOrder',
      type: RelationshipType.MANY_TO_ONE,
      targetModel: 'workOrder',
      label: 'Work Order',
    },
  ],
});

/**
 * Export all HVAC service models
 */
export const HVACServiceModels = [
  CustomerModel,
  TechnicianModel,
  EquipmentModel,
  WorkOrderModel,
  InvoiceModel,
  InvoiceLineItemModel,
  PartModel,
  ServiceContractModel,
  ScheduleModel,
  MessageModel,
];