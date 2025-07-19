import { Model, Field, FieldType, RelationshipType } from '@speedyos/data-modeling';

/**
 * Define the Customer model
 */
export const CustomerModel = new Model({
  name: 'customer',
  label: 'Customer',
  description: 'Customer information',
  fields: [
    Field.string('name', 'Name').makeRequired().toJSON(),
    Field.string('email', 'Email').makeRequired().toJSON(),
    Field.string('phone', 'Phone').toJSON(),
    Field.text('address', 'Address').toJSON(),
    Field.string('city', 'City').toJSON(),
    Field.string('state', 'State').toJSON(),
    Field.string('zip', 'ZIP Code').toJSON(),
    Field.text('notes', 'Notes').toJSON(),
    Field.enum('type', ['Residential', 'Commercial'], 'Customer Type').toJSON(),
    Field.boolean('active', 'Active').setDefaultValue(true).toJSON(),
  ],
  relationships: [
    {
      name: 'serviceLocations',
      type: RelationshipType.ONE_TO_MANY,
      targetModel: 'serviceLocation',
      label: 'Service Locations',
    },
    {
      name: 'serviceRequests',
      type: RelationshipType.ONE_TO_MANY,
      targetModel: 'serviceRequest',
      label: 'Service Requests',
    },
    {
      name: 'invoices',
      type: RelationshipType.ONE_TO_MANY,
      targetModel: 'invoice',
      label: 'Invoices',
    },
  ],
});

/**
 * Define the Service Location model
 */
export const ServiceLocationModel = new Model({
  name: 'serviceLocation',
  label: 'Service Location',
  description: 'Location where service is performed',
  fields: [
    Field.string('name', 'Name').makeRequired().toJSON(),
    Field.text('address', 'Address').makeRequired().toJSON(),
    Field.string('city', 'City').makeRequired().toJSON(),
    Field.string('state', 'State').makeRequired().toJSON(),
    Field.string('zip', 'ZIP Code').makeRequired().toJSON(),
    Field.text('accessInstructions', 'Access Instructions').toJSON(),
    Field.boolean('active', 'Active').setDefaultValue(true).toJSON(),
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
      type: RelationshipType.ONE_TO_MANY,
      targetModel: 'equipment',
      label: 'Equipment',
    },
    {
      name: 'serviceRequests',
      type: RelationshipType.ONE_TO_MANY,
      targetModel: 'serviceRequest',
      label: 'Service Requests',
    },
  ],
});

/**
 * Define the Equipment model
 */
export const EquipmentModel = new Model({
  name: 'equipment',
  label: 'Equipment',
  description: 'HVAC equipment installed at service locations',
  fields: [
    Field.string('name', 'Name').makeRequired().toJSON(),
    Field.string('model', 'Model').makeRequired().toJSON(),
    Field.string('serialNumber', 'Serial Number').makeRequired().makeUnique().toJSON(),
    Field.string('manufacturer', 'Manufacturer').toJSON(),
    Field.enum('type', ['Furnace', 'AC', 'Heat Pump', 'Boiler', 'Water Heater', 'Other'], 'Type').toJSON(),
    Field.date('installationDate', 'Installation Date').toJSON(),
    Field.date('lastServiceDate', 'Last Service Date').toJSON(),
    Field.text('notes', 'Notes').toJSON(),
    Field.boolean('active', 'Active').setDefaultValue(true).toJSON(),
  ],
  relationships: [
    {
      name: 'serviceLocation',
      type: RelationshipType.MANY_TO_ONE,
      targetModel: 'serviceLocation',
      label: 'Service Location',
    },
    {
      name: 'serviceRequests',
      type: RelationshipType.ONE_TO_MANY,
      targetModel: 'serviceRequest',
      label: 'Service Requests',
    },
    {
      name: 'maintenancePlans',
      type: RelationshipType.MANY_TO_MANY,
      targetModel: 'maintenancePlan',
      label: 'Maintenance Plans',
    },
  ],
});

/**
 * Define the Technician model
 */
export const TechnicianModel = new Model({
  name: 'technician',
  label: 'Technician',
  description: 'Field service technicians',
  fields: [
    Field.string('name', 'Name').makeRequired().toJSON(),
    Field.string('email', 'Email').makeRequired().makeUnique().toJSON(),
    Field.string('phone', 'Phone').makeRequired().toJSON(),
    Field.enum('status', ['Available', 'Busy', 'Off Duty', 'On Leave'], 'Status').toJSON(),
    Field.enum('skills', ['HVAC', 'Plumbing', 'Electrical', 'Refrigeration', 'Installation', 'Maintenance'], 'Skills').toJSON(),
    Field.text('notes', 'Notes').toJSON(),
    Field.boolean('active', 'Active').setDefaultValue(true).toJSON(),
  ],
  relationships: [
    {
      name: 'serviceRequests',
      type: RelationshipType.ONE_TO_MANY,
      targetModel: 'serviceRequest',
      label: 'Service Requests',
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
 * Define the Service Request model
 */
export const ServiceRequestModel = new Model({
  name: 'serviceRequest',
  label: 'Service Request',
  description: 'Service request or work order',
  fields: [
    Field.string('title', 'Title').makeRequired().toJSON(),
    Field.text('description', 'Description').makeRequired().toJSON(),
    Field.enum('priority', ['Low', 'Medium', 'High', 'Emergency'], 'Priority').toJSON(),
    Field.enum('status', ['New', 'Scheduled', 'In Progress', 'On Hold', 'Completed', 'Cancelled'], 'Status').toJSON(),
    Field.datetime('requestedDate', 'Requested Date').toJSON(),
    Field.datetime('scheduledDate', 'Scheduled Date').toJSON(),
    Field.datetime('completedDate', 'Completed Date').toJSON(),
    Field.text('notes', 'Notes').toJSON(),
    Field.enum('serviceType', ['Repair', 'Maintenance', 'Installation', 'Inspection', 'Other'], 'Service Type').toJSON(),
    Field.boolean('emergency', 'Emergency').setDefaultValue(false).toJSON(),
  ],
  relationships: [
    {
      name: 'customer',
      type: RelationshipType.MANY_TO_ONE,
      targetModel: 'customer',
      label: 'Customer',
    },
    {
      name: 'serviceLocation',
      type: RelationshipType.MANY_TO_ONE,
      targetModel: 'serviceLocation',
      label: 'Service Location',
    },
    {
      name: 'equipment',
      type: RelationshipType.MANY_TO_ONE,
      targetModel: 'equipment',
      label: 'Equipment',
    },
    {
      name: 'technician',
      type: RelationshipType.MANY_TO_ONE,
      targetModel: 'technician',
      label: 'Technician',
    },
    {
      name: 'invoice',
      type: RelationshipType.ONE_TO_ONE,
      targetModel: 'invoice',
      label: 'Invoice',
    },
  ],
});

/**
 * Define the Invoice model
 */
export const InvoiceModel = new Model({
  name: 'invoice',
  label: 'Invoice',
  description: 'Customer invoice',
  fields: [
    Field.string('invoiceNumber', 'Invoice Number').makeRequired().makeUnique().toJSON(),
    Field.date('invoiceDate', 'Invoice Date').makeRequired().toJSON(),
    Field.date('dueDate', 'Due Date').makeRequired().toJSON(),
    Field.float('amount', 'Amount').makeRequired().toJSON(),
    Field.float('tax', 'Tax').toJSON(),
    Field.float('total', 'Total').makeRequired().toJSON(),
    Field.enum('status', ['Draft', 'Sent', 'Paid', 'Overdue', 'Cancelled'], 'Status').toJSON(),
    Field.text('notes', 'Notes').toJSON(),
  ],
  relationships: [
    {
      name: 'customer',
      type: RelationshipType.MANY_TO_ONE,
      targetModel: 'customer',
      label: 'Customer',
    },
    {
      name: 'serviceRequest',
      type: RelationshipType.ONE_TO_ONE,
      targetModel: 'serviceRequest',
      label: 'Service Request',
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
 * Define the Invoice Line Item model
 */
export const InvoiceLineItemModel = new Model({
  name: 'invoiceLineItem',
  label: 'Invoice Line Item',
  description: 'Line item on an invoice',
  fields: [
    Field.string('description', 'Description').makeRequired().toJSON(),
    Field.float('quantity', 'Quantity').makeRequired().toJSON(),
    Field.float('unitPrice', 'Unit Price').makeRequired().toJSON(),
    Field.float('amount', 'Amount').makeRequired().toJSON(),
    Field.enum('type', ['Labor', 'Parts', 'Material', 'Service', 'Other'], 'Type').toJSON(),
  ],
  relationships: [
    {
      name: 'invoice',
      type: RelationshipType.MANY_TO_ONE,
      targetModel: 'invoice',
      label: 'Invoice',
    },
  ],
});

/**
 * Define the Maintenance Plan model
 */
export const MaintenancePlanModel = new Model({
  name: 'maintenancePlan',
  label: 'Maintenance Plan',
  description: 'Recurring maintenance plan',
  fields: [
    Field.string('name', 'Name').makeRequired().toJSON(),
    Field.text('description', 'Description').toJSON(),
    Field.date('startDate', 'Start Date').makeRequired().toJSON(),
    Field.date('endDate', 'End Date').toJSON(),
    Field.enum('frequency', ['Monthly', 'Quarterly', 'Semi-Annual', 'Annual'], 'Frequency').toJSON(),
    Field.float('price', 'Price').toJSON(),
    Field.boolean('active', 'Active').setDefaultValue(true).toJSON(),
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
      name: 'serviceRequests',
      type: RelationshipType.ONE_TO_MANY,
      targetModel: 'serviceRequest',
      label: 'Service Requests',
    },
  ],
});

/**
 * Define the Schedule model
 */
export const ScheduleModel = new Model({
  name: 'schedule',
  label: 'Schedule',
  description: 'Technician schedule',
  fields: [
    Field.datetime('startTime', 'Start Time').makeRequired().toJSON(),
    Field.datetime('endTime', 'End Time').makeRequired().toJSON(),
    Field.enum('type', ['Work', 'Break', 'Vacation', 'Training', 'Other'], 'Type').toJSON(),
    Field.text('notes', 'Notes').toJSON(),
  ],
  relationships: [
    {
      name: 'technician',
      type: RelationshipType.MANY_TO_ONE,
      targetModel: 'technician',
      label: 'Technician',
    },
    {
      name: 'serviceRequest',
      type: RelationshipType.MANY_TO_ONE,
      targetModel: 'serviceRequest',
      label: 'Service Request',
    },
  ],
});

/**
 * Export all field service models
 */
export const FieldServiceModels = [
  CustomerModel,
  ServiceLocationModel,
  EquipmentModel,
  TechnicianModel,
  ServiceRequestModel,
  InvoiceModel,
  InvoiceLineItemModel,
  MaintenancePlanModel,
  ScheduleModel,
];