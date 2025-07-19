import { Auth, Role, Permission } from '@speedyos/auth';

/**
 * HVAC Service Authentication and Authorization
 */
export const HVACServiceAuth = new Auth({
  id: 'hvac-service-auth',
  name: 'HVAC Service Auth',
  roles: [
    new Role({
      id: 'admin',
      name: 'Administrator',
      description: 'Full access to all features',
      permissions: [
        new Permission({ resource: '*', action: '*' }),
      ],
    }),
    new Role({
      id: 'manager',
      name: 'Service Manager',
      description: 'Manages service operations',
      permissions: [
        new Permission({ resource: 'customer', action: '*' }),
        new Permission({ resource: 'workOrder', action: '*' }),
        new Permission({ resource: 'technician', action: '*' }),
        new Permission({ resource: 'equipment', action: '*' }),
        new Permission({ resource: 'invoice', action: '*' }),
        new Permission({ resource: 'part', action: '*' }),
        new Permission({ resource: 'serviceContract', action: '*' }),
        new Permission({ resource: 'schedule', action: '*' }),
        new Permission({ resource: 'message', action: '*' }),
        new Permission({ resource: 'report', action: 'read' }),
        new Permission({ resource: 'dashboard', action: 'read' }),
      ],
    }),
    new Role({
      id: 'dispatcher',
      name: 'Dispatcher',
      description: 'Manages scheduling and dispatching',
      permissions: [
        new Permission({ resource: 'customer', action: 'read' }),
        new Permission({ resource: 'workOrder', action: '*' }),
        new Permission({ resource: 'technician', action: 'read' }),
        new Permission({ resource: 'equipment', action: 'read' }),
        new Permission({ resource: 'schedule', action: '*' }),
        new Permission({ resource: 'message', action: '*' }),
        new Permission({ resource: 'dashboard', action: 'read' }),
      ],
    }),
    new Role({
      id: 'technician',
      name: 'Technician',
      description: 'Field service technician',
      permissions: [
        new Permission({ resource: 'customer', action: 'read' }),
        new Permission({ resource: 'workOrder', action: 'read' }),
        new Permission({ resource: 'workOrder', action: 'update', conditions: ['assignedToSelf'] }),
        new Permission({ resource: 'equipment', action: 'read' }),
        new Permission({ resource: 'part', action: 'read' }),
        new Permission({ resource: 'message', action: '*' }),
        new Permission({ resource: 'schedule', action: 'read', conditions: ['assignedToSelf'] }),
        new Permission({ resource: 'technician', action: 'update', conditions: ['self'] }),
      ],
    }),
    new Role({
      id: 'office',
      name: 'Office Staff',
      description: 'Office administrative staff',
      permissions: [
        new Permission({ resource: 'customer', action: '*' }),
        new Permission({ resource: 'workOrder', action: 'read' }),
        new Permission({ resource: 'workOrder', action: 'create' }),
        new Permission({ resource: 'invoice', action: '*' }),
        new Permission({ resource: 'equipment', action: 'read' }),
        new Permission({ resource: 'message', action: '*' }),
      ],
    }),
    new Role({
      id: 'customer',
      name: 'Customer',
      description: 'Service customer',
      permissions: [
        new Permission({ resource: 'customer', action: 'read', conditions: ['self'] }),
        new Permission({ resource: 'customer', action: 'update', conditions: ['self'] }),
        new Permission({ resource: 'workOrder', action: 'read', conditions: ['ownedByCustomer'] }),
        new Permission({ resource: 'workOrder', action: 'create' }),
        new Permission({ resource: 'equipment', action: 'read', conditions: ['ownedByCustomer'] }),
        new Permission({ resource: 'invoice', action: 'read', conditions: ['ownedByCustomer'] }),
        new Permission({ resource: 'message', action: '*', conditions: ['ownedByCustomer'] }),
      ],
    }),
  ],
  config: {
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    jwtExpiresIn: '1d',
    refreshTokenExpiresIn: '7d',
    passwordResetExpiresIn: '1h',
    passwordMinLength: 8,
    passwordRequiresLowercase: true,
    passwordRequiresUppercase: true,
    passwordRequiresNumber: true,
    passwordRequiresSpecial: true,
    maxLoginAttempts: 5,
    lockoutDuration: 15, // minutes
  },
});