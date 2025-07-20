import { 
  Workflow, 
  Trigger, 
  Action, 
  Condition, 
  NodeType, 
  ConnectionType 
} from '@speedyos/workflow';

/**
 * HVAC Work Order Workflow
 * 
 * This workflow handles the lifecycle of an HVAC work order:
 * 1. When a new work order is created
 * 2. Checks if it's an emergency
 * 3. Assigns it to an appropriate technician
 * 4. Sends notifications
 * 5. Updates the technician's schedule
 */
export const HVACWorkOrderWorkflow = new Workflow({
  id: 'hvac-work-order-workflow',
  name: 'HVAC Work Order Workflow',
  description: 'Handles the lifecycle of an HVAC work order',
  nodes: [],
  connections: [],
});

// Add trigger node for new work order
const newWorkOrderTrigger = Trigger.database(
  'new-work-order-trigger',
  'New Work Order',
  'workOrder',
  'create'
);
HVACWorkOrderWorkflow.addNode(newWorkOrderTrigger);

// Add emergency check condition
const emergencyCheckCondition = Condition.expression(
  'emergency-check-condition',
  'Is Emergency?',
  'data.emergency === true || data.priority === "Emergency"'
);
HVACWorkOrderWorkflow.addNode(emergencyCheckCondition);

// Connect trigger to emergency check
HVACWorkOrderWorkflow.connect(
  newWorkOrderTrigger.id,
  emergencyCheckCondition.id
);

// Add find emergency technician action
const findEmergencyTechAction = Action.function(
  'find-emergency-tech-action',
  'Find Emergency Technician',
  `
  // Find available technicians with the right skills for emergency
  const availableTechs = await db.technician.findMany({
    where: {
      status: 'Available',
      skills: { contains: data.serviceType },
      active: true
    },
    orderBy: {
      // Prioritize technicians with more experience
      hourlyRate: 'desc'
    }
  });
  
  // Return the first available technician or null
  return availableTechs.length > 0 ? availableTechs[0] : null;
  `
);
HVACWorkOrderWorkflow.addNode(findEmergencyTechAction);

// Connect emergency condition to find emergency tech action (if true)
HVACWorkOrderWorkflow.connect(
  emergencyCheckCondition.id,
  findEmergencyTechAction.id,
  ConnectionType.TRUE
);

// Add find regular technician action
const findRegularTechAction = Action.function(
  'find-regular-tech-action',
  'Find Regular Technician',
  `
  // Find available technicians with the right skills for regular service
  const availableTechs = await db.technician.findMany({
    where: {
      status: 'Available',
      skills: { contains: data.serviceType },
      active: true
    }
  });
  
  // Return the first available technician or null
  return availableTechs.length > 0 ? availableTechs[0] : null;
  `
);
HVACWorkOrderWorkflow.addNode(findRegularTechAction);

// Connect emergency condition to find regular tech action (if false)
HVACWorkOrderWorkflow.connect(
  emergencyCheckCondition.id,
  findRegularTechAction.id,
  ConnectionType.FALSE
);

// Add emergency tech found condition
const emergencyTechFoundCondition = Condition.expression(
  'emergency-tech-found-condition',
  'Emergency Technician Found?',
  'results["find-emergency-tech-action"] !== null'
);
HVACWorkOrderWorkflow.addNode(emergencyTechFoundCondition);

// Connect find emergency tech to condition
HVACWorkOrderWorkflow.connect(
  findEmergencyTechAction.id,
  emergencyTechFoundCondition.id
);

// Add regular tech found condition
const regularTechFoundCondition = Condition.expression(
  'regular-tech-found-condition',
  'Regular Technician Found?',
  'results["find-regular-tech-action"] !== null'
);
HVACWorkOrderWorkflow.addNode(regularTechFoundCondition);

// Connect find regular tech to condition
HVACWorkOrderWorkflow.connect(
  findRegularTechAction.id,
  regularTechFoundCondition.id
);

// Add assign emergency technician action
const assignEmergencyTechAction = Action.database(
  'assign-emergency-tech-action',
  'Assign Emergency Technician',
  'workOrder',
  'update',
  {
    config: {
      data: {
        technicianId: 'results["find-emergency-tech-action"].id',
        status: 'Scheduled',
        scheduledStart: 'new Date()',
        scheduledEnd: 'new Date(new Date().getTime() + 2 * 60 * 60 * 1000)' // 2 hours later
      },
      where: {
        id: 'data.id'
      }
    }
  }
);
HVACWorkOrderWorkflow.addNode(assignEmergencyTechAction);

// Connect emergency tech found condition to assign action (if true)
HVACWorkOrderWorkflow.connect(
  emergencyTechFoundCondition.id,
  assignEmergencyTechAction.id,
  ConnectionType.TRUE
);

// Add assign regular technician action
const assignRegularTechAction = Action.database(
  'assign-regular-tech-action',
  'Assign Regular Technician',
  'workOrder',
  'update',
  {
    config: {
      data: {
        technicianId: 'results["find-regular-tech-action"].id',
        status: 'Scheduled',
        scheduledStart: 'new Date(new Date().setHours(new Date().getHours() + 24))', // Next day
        scheduledEnd: 'new Date(new Date().setHours(new Date().getHours() + 26))' // 2 hours after start
      },
      where: {
        id: 'data.id'
      }
    }
  }
);
HVACWorkOrderWorkflow.addNode(assignRegularTechAction);

// Connect regular tech found condition to assign action (if true)
HVACWorkOrderWorkflow.connect(
  regularTechFoundCondition.id,
  assignRegularTechAction.id,
  ConnectionType.TRUE
);

// Add create emergency schedule action
const createEmergencyScheduleAction = Action.database(
  'create-emergency-schedule-action',
  'Create Emergency Schedule Entry',
  'schedule',
  'create',
  {
    config: {
      data: {
        technicianId: 'results["find-emergency-tech-action"].id',
        workOrderId: 'data.id',
        startTime: 'new Date()',
        endTime: 'new Date(new Date().getTime() + 2 * 60 * 60 * 1000)', // 2 hours later
        type: 'Work Order',
        notes: `Emergency work order: ${data.title}`
      }
    }
  }
);
HVACWorkOrderWorkflow.addNode(createEmergencyScheduleAction);

// Connect assign emergency tech to create schedule
HVACWorkOrderWorkflow.connect(
  assignEmergencyTechAction.id,
  createEmergencyScheduleAction.id
);

// Add create regular schedule action
const createRegularScheduleAction = Action.database(
  'create-regular-schedule-action',
  'Create Regular Schedule Entry',
  'schedule',
  'create',
  {
    config: {
      data: {
        technicianId: 'results["find-regular-tech-action"].id',
        workOrderId: 'data.id',
        startTime: 'new Date(new Date().setHours(new Date().getHours() + 24))', // Next day
        endTime: 'new Date(new Date().setHours(new Date().getHours() + 26))', // 2 hours after start
        type: 'Work Order',
        notes: `Work order: ${data.title}`
      }
    }
  }
);
HVACWorkOrderWorkflow.addNode(createRegularScheduleAction);

// Connect assign regular tech to create schedule
HVACWorkOrderWorkflow.connect(
  assignRegularTechAction.id,
  createRegularScheduleAction.id
);

// Add notify emergency technician action
const notifyEmergencyTechAction = Action.notification(
  'notify-emergency-tech-action',
  'Notify Emergency Technician',
  'EMERGENCY: You have been assigned a new work order: {{data.title}} at {{data.customer.address}}',
  'sms',
  {
    config: {
      to: 'results["find-emergency-tech-action"].phone',
      priority: 'high'
    }
  }
);
HVACWorkOrderWorkflow.addNode(notifyEmergencyTechAction);

// Connect create emergency schedule to notify technician
HVACWorkOrderWorkflow.connect(
  createEmergencyScheduleAction.id,
  notifyEmergencyTechAction.id
);

// Add notify regular technician action
const notifyRegularTechAction = Action.notification(
  'notify-regular-tech-action',
  'Notify Regular Technician',
  'You have been assigned a new work order: {{data.title}} at {{data.customer.address}} scheduled for tomorrow',
  'sms',
  {
    config: {
      to: 'results["find-regular-tech-action"].phone'
    }
  }
);
HVACWorkOrderWorkflow.addNode(notifyRegularTechAction);

// Connect create regular schedule to notify technician
HVACWorkOrderWorkflow.connect(
  createRegularScheduleAction.id,
  notifyRegularTechAction.id
);

// Add notify customer for emergency action
const notifyCustomerEmergencyAction = Action.notification(
  'notify-customer-emergency-action',
  'Notify Customer - Emergency',
  'Your emergency service request has been scheduled. A technician will arrive shortly.',
  'sms',
  {
    config: {
      to: 'data.customer.phone'
    }
  }
);
HVACWorkOrderWorkflow.addNode(notifyCustomerEmergencyAction);

// Connect notify emergency tech to notify customer
HVACWorkOrderWorkflow.connect(
  notifyEmergencyTechAction.id,
  notifyCustomerEmergencyAction.id
);

// Add notify customer for regular action
const notifyCustomerRegularAction = Action.notification(
  'notify-customer-regular-action',
  'Notify Customer - Regular',
  'Your service request has been scheduled for {{data.scheduledStart}}. We will send a reminder before the technician arrives.',
  'sms',
  {
    config: {
      to: 'data.customer.phone'
    }
  }
);
HVACWorkOrderWorkflow.addNode(notifyCustomerRegularAction);

// Connect notify regular tech to notify customer
HVACWorkOrderWorkflow.connect(
  notifyRegularTechAction.id,
  notifyCustomerRegularAction.id
);

// Add no emergency technician available action
const noEmergencyTechAction = Action.notification(
  'no-emergency-tech-action',
  'No Emergency Technician Available',
  'URGENT: No technician is currently available for emergency work order: {{data.title}} for customer {{data.customer.name}}',
  'sms',
  {
    config: {
      to: 'manager@hvaccompany.com',
      priority: 'high'
    }
  }
);
HVACWorkOrderWorkflow.addNode(noEmergencyTechAction);

// Connect emergency tech found condition to no tech action (if false)
HVACWorkOrderWorkflow.connect(
  emergencyTechFoundCondition.id,
  noEmergencyTechAction.id,
  ConnectionType.FALSE
);

// Add no regular technician available action
const noRegularTechAction = Action.notification(
  'no-regular-tech-action',
  'No Regular Technician Available',
  'No technician is currently available for work order: {{data.title}} for customer {{data.customer.name}}',
  'email',
  {
    config: {
      to: 'dispatch@hvaccompany.com',
      subject: 'Work Order Needs Assignment'
    }
  }
);
HVACWorkOrderWorkflow.addNode(noRegularTechAction);

// Connect regular tech found condition to no tech action (if false)
HVACWorkOrderWorkflow.connect(
  regularTechFoundCondition.id,
  noRegularTechAction.id,
  ConnectionType.FALSE
);

// Add update emergency work order status action
const updateEmergencyStatusAction = Action.database(
  'update-emergency-status-action',
  'Update Emergency Status to Pending',
  'workOrder',
  'update',
  {
    config: {
      data: {
        status: 'On Hold',
        notes: 'No technician available for emergency assignment - requires manual dispatch'
      },
      where: {
        id: 'data.id'
      }
    }
  }
);
HVACWorkOrderWorkflow.addNode(updateEmergencyStatusAction);

// Connect no emergency tech action to update status
HVACWorkOrderWorkflow.connect(
  noEmergencyTechAction.id,
  updateEmergencyStatusAction.id
);

// Add update regular work order status action
const updateRegularStatusAction = Action.database(
  'update-regular-status-action',
  'Update Regular Status to Pending',
  'workOrder',
  'update',
  {
    config: {
      data: {
        status: 'On Hold',
        notes: 'No technician available for automatic assignment - requires scheduling'
      },
      where: {
        id: 'data.id'
      }
    }
  }
);
HVACWorkOrderWorkflow.addNode(updateRegularStatusAction);

// Connect no regular tech action to update status
HVACWorkOrderWorkflow.connect(
  noRegularTechAction.id,
  updateRegularStatusAction.id
);

/**
 * HVAC Technician Status Update Workflow
 * 
 * This workflow handles technician status updates:
 * 1. When a technician updates their status (On Site, En Route, etc.)
 * 2. Updates the work order status
 * 3. Sends notifications to customers
 */
export const HVACTechnicianStatusWorkflow = new Workflow({
  id: 'hvac-technician-status-workflow',
  name: 'HVAC Technician Status Workflow',
  description: 'Handles technician status updates for HVAC work orders',
  nodes: [],
  connections: [],
});

// Add trigger node for technician status update
const techStatusUpdateTrigger = Trigger.custom(
  'tech-status-update-trigger',
  'Technician Status Update',
  'technicianStatusUpdate'
);
HVACTechnicianStatusWorkflow.addNode(techStatusUpdateTrigger);

// Add get work order action
const getWorkOrderAction = Action.database(
  'get-work-order-action',
  'Get Work Order Details',
  'workOrder',
  'findOne',
  {
    config: {
      where: {
        id: 'data.workOrderId'
      },
      include: {
        customer: true,
        technician: true,
        equipment: true
      }
    }
  }
);
HVACTechnicianStatusWorkflow.addNode(getWorkOrderAction);

// Connect trigger to get work order
HVACTechnicianStatusWorkflow.connect(
  techStatusUpdateTrigger.id,
  getWorkOrderAction.id
);

// Add en route status check
const enRouteStatusCheck = Condition.expression(
  'en-route-status-check',
  'Is Status En Route?',
  'data.status === "En Route"'
);
HVACTechnicianStatusWorkflow.addNode(enRouteStatusCheck);

// Connect get work order to en route check
HVACTechnicianStatusWorkflow.connect(
  getWorkOrderAction.id,
  enRouteStatusCheck.id
);

// Add on site status check
const onSiteStatusCheck = Condition.expression(
  'on-site-status-check',
  'Is Status On Site?',
  'data.status === "On Site"'
);
HVACTechnicianStatusWorkflow.addNode(onSiteStatusCheck);

// Connect en route check to on site check (if false)
HVACTechnicianStatusWorkflow.connect(
  enRouteStatusCheck.id,
  onSiteStatusCheck.id,
  ConnectionType.FALSE
);

// Add completed status check
const completedStatusCheck = Condition.expression(
  'completed-status-check',
  'Is Status Completed?',
  'data.status === "Completed"'
);
HVACTechnicianStatusWorkflow.addNode(completedStatusCheck);

// Connect on site check to completed check (if false)
HVACTechnicianStatusWorkflow.connect(
  onSiteStatusCheck.id,
  completedStatusCheck.id,
  ConnectionType.FALSE
);

// Add update work order to en route action
const updateWorkOrderEnRouteAction = Action.database(
  'update-work-order-en-route-action',
  'Update Work Order to En Route',
  'workOrder',
  'update',
  {
    config: {
      data: {
        status: 'En Route'
      },
      where: {
        id: 'data.workOrderId'
      }
    }
  }
);
HVACTechnicianStatusWorkflow.addNode(updateWorkOrderEnRouteAction);

// Connect en route check to update action (if true)
HVACTechnicianStatusWorkflow.connect(
  enRouteStatusCheck.id,
  updateWorkOrderEnRouteAction.id,
  ConnectionType.TRUE
);

// Add update work order to on site action
const updateWorkOrderOnSiteAction = Action.database(
  'update-work-order-on-site-action',
  'Update Work Order to On Site',
  'workOrder',
  'update',
  {
    config: {
      data: {
        status: 'On Site',
        actualStart: 'new Date()'
      },
      where: {
        id: 'data.workOrderId'
      }
    }
  }
);
HVACTechnicianStatusWorkflow.addNode(updateWorkOrderOnSiteAction);

// Connect on site check to update action (if true)
HVACTechnicianStatusWorkflow.connect(
  onSiteStatusCheck.id,
  updateWorkOrderOnSiteAction.id,
  ConnectionType.TRUE
);

// Add update work order to completed action
const updateWorkOrderCompletedAction = Action.database(
  'update-work-order-completed-action',
  'Update Work Order to Completed',
  'workOrder',
  'update',
  {
    config: {
      data: {
        status: 'Completed',
        actualEnd: 'new Date()',
        actualHours: 'Math.round((new Date() - new Date(results["get-work-order-action"].actualStart)) / 36000) / 100'
      },
      where: {
        id: 'data.workOrderId'
      }
    }
  }
);
HVACTechnicianStatusWorkflow.addNode(updateWorkOrderCompletedAction);

// Connect completed check to update action (if true)
HVACTechnicianStatusWorkflow.connect(
  completedStatusCheck.id,
  updateWorkOrderCompletedAction.id,
  ConnectionType.TRUE
);

// Add notify customer en route action
const notifyCustomerEnRouteAction = Action.notification(
  'notify-customer-en-route-action',
  'Notify Customer - En Route',
  'Your HVAC technician {{results["get-work-order-action"].technician.name}} is on the way to your location. Estimated arrival time: {{data.eta}}',
  'sms',
  {
    config: {
      to: 'results["get-work-order-action"].customer.phone'
    }
  }
);
HVACTechnicianStatusWorkflow.addNode(notifyCustomerEnRouteAction);

// Connect update work order en route to notify customer
HVACTechnicianStatusWorkflow.connect(
  updateWorkOrderEnRouteAction.id,
  notifyCustomerEnRouteAction.id
);

// Add notify customer on site action
const notifyCustomerOnSiteAction = Action.notification(
  'notify-customer-on-site-action',
  'Notify Customer - On Site',
  'Your HVAC technician {{results["get-work-order-action"].technician.name}} has arrived at your location.',
  'sms',
  {
    config: {
      to: 'results["get-work-order-action"].customer.phone'
    }
  }
);
HVACTechnicianStatusWorkflow.addNode(notifyCustomerOnSiteAction);

// Connect update work order on site to notify customer
HVACTechnicianStatusWorkflow.connect(
  updateWorkOrderOnSiteAction.id,
  notifyCustomerOnSiteAction.id
);

// Add notify customer completed action
const notifyCustomerCompletedAction = Action.notification(
  'notify-customer-completed-action',
  'Notify Customer - Completed',
  'Your HVAC service has been completed. Thank you for your business! A satisfaction survey will be sent to you shortly.',
  'sms',
  {
    config: {
      to: 'results["get-work-order-action"].customer.phone'
    }
  }
);
HVACTechnicianStatusWorkflow.addNode(notifyCustomerCompletedAction);

// Connect update work order completed to notify customer
HVACTechnicianStatusWorkflow.connect(
  updateWorkOrderCompletedAction.id,
  notifyCustomerCompletedAction.id
);

// Add create invoice action
const createInvoiceAction = Action.function(
  'create-invoice-action',
  'Create Invoice',
  `
  const workOrder = results["get-work-order-action"];
  const laborHours = workOrder.actualHours || 1;
  const laborRate = workOrder.technician.hourlyRate || 85;
  const laborCost = laborHours * laborRate;
  
  // Get parts used from the work order
  const parts = await db.part.findMany({
    where: {
      workOrders: {
        some: {
          id: workOrder.id
        }
      }
    }
  });
  
  const partsCost = parts.reduce((total, part) => total + (part.price || 0), 0);
  const subtotal = laborCost + partsCost;
  const taxRate = 0.07; // 7% tax rate
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;
  
  // Create the invoice
  const invoice = await db.invoice.create({
    data: {
      invoiceNumber: \`INV-\${Date.now()}\`,
      invoiceDate: new Date(),
      dueDate: new Date(new Date().setDate(new Date().getDate() + 30)), // Due in 30 days
      laborHours,
      laborRate,
      laborCost,
      partsCost,
      subtotal,
      taxRate,
      taxAmount,
      total,
      status: 'Draft',
      customerId: workOrder.customerId,
      workOrderId: workOrder.id
    }
  });
  
  // Create line items
  await db.invoiceLineItem.create({
    data: {
      description: \`Labor - \${workOrder.serviceType}\`,
      quantity: laborHours,
      unitPrice: laborRate,
      amount: laborCost,
      type: 'Labor',
      invoiceId: invoice.id
    }
  });
  
  // Add line items for parts
  for (const part of parts) {
    await db.invoiceLineItem.create({
      data: {
        description: part.name,
        quantity: 1,
        unitPrice: part.price,
        amount: part.price,
        type: 'Part',
        invoiceId: invoice.id,
        partId: part.id
      }
    });
  }
  
  return invoice;
  `
);
HVACTechnicianStatusWorkflow.addNode(createInvoiceAction);

// Connect notify customer completed to create invoice
HVACTechnicianStatusWorkflow.connect(
  notifyCustomerCompletedAction.id,
  createInvoiceAction.id
);

// Add update technician status action
const updateTechnicianStatusAction = Action.database(
  'update-technician-status-action',
  'Update Technician Status',
  'technician',
  'update',
  {
    config: {
      data: {
        status: 'data.status === "Completed" ? "Available" : data.status'
      },
      where: {
        id: 'results["get-work-order-action"].technicianId'
      }
    }
  }
);
HVACTechnicianStatusWorkflow.addNode(updateTechnicianStatusAction);

// Connect create invoice to update technician status
HVACTechnicianStatusWorkflow.connect(
  createInvoiceAction.id,
  updateTechnicianStatusAction.id
);

/**
 * Export all HVAC service workflows
 */
export const HVACServiceWorkflows = [
  HVACWorkOrderWorkflow,
  HVACTechnicianStatusWorkflow,
];