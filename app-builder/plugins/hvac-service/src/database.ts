import { Database, Schema } from '@speedyos/data-modeling';
import { HVACServiceModels } from './models';

/**
 * HVAC Service Database Schema
 */
export const HVACServiceSchema = new Schema({
  id: 'hvac-service-schema',
  name: 'HVAC Service Schema',
  version: '1.0.0',
  models: HVACServiceModels,
  relationships: [
    {
      name: 'customer_workOrders',
      from: 'Customer',
      to: 'WorkOrder',
      type: 'one-to-many',
      foreignKey: 'customerId',
    },
    {
      name: 'customer_equipment',
      from: 'Customer',
      to: 'Equipment',
      type: 'one-to-many',
      foreignKey: 'customerId',
    },
    {
      name: 'customer_invoices',
      from: 'Customer',
      to: 'Invoice',
      type: 'one-to-many',
      foreignKey: 'customerId',
    },
    {
      name: 'customer_serviceContracts',
      from: 'Customer',
      to: 'ServiceContract',
      type: 'one-to-many',
      foreignKey: 'customerId',
    },
    {
      name: 'technician_workOrders',
      from: 'Technician',
      to: 'WorkOrder',
      type: 'one-to-many',
      foreignKey: 'technicianId',
    },
    {
      name: 'technician_schedule',
      from: 'Technician',
      to: 'Schedule',
      type: 'one-to-many',
      foreignKey: 'technicianId',
    },
    {
      name: 'equipment_workOrders',
      from: 'Equipment',
      to: 'WorkOrder',
      type: 'one-to-many',
      foreignKey: 'equipmentId',
    },
    {
      name: 'workOrder_invoices',
      from: 'WorkOrder',
      to: 'Invoice',
      type: 'one-to-many',
      foreignKey: 'workOrderId',
    },
    {
      name: 'invoice_lineItems',
      from: 'Invoice',
      to: 'InvoiceLineItem',
      type: 'one-to-many',
      foreignKey: 'invoiceId',
    },
    {
      name: 'part_invoiceLineItems',
      from: 'Part',
      to: 'InvoiceLineItem',
      type: 'one-to-many',
      foreignKey: 'partId',
    },
  ],
  indexes: [
    {
      model: 'Customer',
      fields: ['email'],
      unique: true,
    },
    {
      model: 'Customer',
      fields: ['phone'],
      unique: true,
    },
    {
      model: 'WorkOrder',
      fields: ['workOrderNumber'],
      unique: true,
    },
    {
      model: 'WorkOrder',
      fields: ['customerId'],
    },
    {
      model: 'WorkOrder',
      fields: ['technicianId'],
    },
    {
      model: 'WorkOrder',
      fields: ['status'],
    },
    {
      model: 'WorkOrder',
      fields: ['scheduledStart'],
    },
    {
      model: 'Equipment',
      fields: ['serialNumber'],
      unique: true,
    },
    {
      model: 'Equipment',
      fields: ['customerId'],
    },
    {
      model: 'Invoice',
      fields: ['invoiceNumber'],
      unique: true,
    },
    {
      model: 'Invoice',
      fields: ['customerId'],
    },
    {
      model: 'Invoice',
      fields: ['workOrderId'],
    },
    {
      model: 'Invoice',
      fields: ['status'],
    },
    {
      model: 'Technician',
      fields: ['email'],
      unique: true,
    },
    {
      model: 'Technician',
      fields: ['status'],
    },
    {
      model: 'ServiceContract',
      fields: ['contractNumber'],
      unique: true,
    },
    {
      model: 'ServiceContract',
      fields: ['customerId'],
    },
    {
      model: 'ServiceContract',
      fields: ['status'],
    },
    {
      model: 'Part',
      fields: ['partNumber'],
      unique: true,
    },
  ],
});

/**
 * HVAC Service Database
 */
export const HVACServiceDatabase = new Database({
  id: 'hvac-service-database',
  name: 'HVAC Service Database',
  schema: HVACServiceSchema,
  config: {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'hvac_service',
    synchronize: true,
    logging: process.env.NODE_ENV === 'development',
  },
});