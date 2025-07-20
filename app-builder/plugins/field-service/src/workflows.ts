import { 
  Workflow, 
  Trigger, 
  Action, 
  Condition, 
  NodeType, 
  ConnectionType 
} from '@speedyos/workflow';

/**
 * Service Request Workflow
 * 
 * This workflow handles the lifecycle of a service request:
 * 1. When a new service request is created
 * 2. Assigns it to an available technician
 * 3. Sends notifications
 * 4. Creates a schedule entry
 */
export const ServiceRequestWorkflow = new Workflow({
  id: 'service-request-workflow',
  name: 'Service Request Workflow',
  description: 'Handles the lifecycle of a service request',
  nodes: [],
  connections: [],
});

// Add trigger node
const newServiceRequestTrigger = Trigger.database(
  'new-service-request-trigger',
  'New Service Request',
  'serviceRequest',
  'create'
);
ServiceRequestWorkflow.addNode(newServiceRequestTrigger);

// Add emergency check condition
const emergencyCheckCondition = Condition.expression(
  'emergency-check-condition',
  'Is Emergency?',
  'data.emergency === true'
);
ServiceRequestWorkflow.addNode(emergencyCheckCondition);

// Connect trigger to condition
ServiceRequestWorkflow.connect(
  newServiceRequestTrigger.id,
  emergencyCheckCondition.id
);

// Add find available technician action
const findTechnicianAction = Action.function(
  'find-technician-action',
  'Find Available Technician',
  `
  // Find available technicians with the right skills
  const availableTechs = await db.technician.findMany({
    where: {
      status: 'Available',
      skills: { contains: data.serviceType }
    }
  });
  
  // Return the first available technician or null
  return availableTechs.length > 0 ? availableTechs[0] : null;
  `
);
ServiceRequestWorkflow.addNode(findTechnicianAction);

// Connect condition to find technician action
ServiceRequestWorkflow.connect(
  emergencyCheckCondition.id,
  findTechnicianAction.id,
  ConnectionType.TRUE
);

// Add technician found condition
const technicianFoundCondition = Condition.expression(
  'technician-found-condition',
  'Technician Found?',
  'results["find-technician-action"] !== null'
);
ServiceRequestWorkflow.addNode(technicianFoundCondition);

// Connect find technician to condition
ServiceRequestWorkflow.connect(
  findTechnicianAction.id,
  technicianFoundCondition.id
);

// Add assign technician action
const assignTechnicianAction = Action.database(
  'assign-technician-action',
  'Assign Technician',
  'serviceRequest',
  'update',
  {
    config: {
      data: {
        technicianId: 'results["find-technician-action"].id',
        status: 'Scheduled'
      },
      where: {
        id: 'data.id'
      }
    }
  }
);
ServiceRequestWorkflow.addNode(assignTechnicianAction);

// Connect technician found condition to assign action
ServiceRequestWorkflow.connect(
  technicianFoundCondition.id,
  assignTechnicianAction.id,
  ConnectionType.TRUE
);

// Add create schedule action
const createScheduleAction = Action.database(
  'create-schedule-action',
  'Create Schedule Entry',
  'schedule',
  'create',
  {
    config: {
      data: {
        technicianId: 'results["find-technician-action"].id',
        serviceRequestId: 'data.id',
        startTime: 'data.scheduledDate',
        endTime: 'new Date(new Date(data.scheduledDate).getTime() + 2 * 60 * 60 * 1000)', // 2 hours later
        type: 'Work',
        notes: `Service request: ${data.title}`
      }
    }
  }
);
ServiceRequestWorkflow.addNode(createScheduleAction);

// Connect assign technician to create schedule
ServiceRequestWorkflow.connect(
  assignTechnicianAction.id,
  createScheduleAction.id
);

// Add notify technician action
const notifyTechnicianAction = Action.notification(
  'notify-technician-action',
  'Notify Technician',
  'You have been assigned a new service request: {{data.title}}',
  'email',
  {
    config: {
      to: 'results["find-technician-action"].email',
      subject: 'New Service Request Assignment'
    }
  }
);
ServiceRequestWorkflow.addNode(notifyTechnicianAction);

// Connect create schedule to notify technician
ServiceRequestWorkflow.connect(
  createScheduleAction.id,
  notifyTechnicianAction.id
);

// Add notify customer action
const notifyCustomerAction = Action.notification(
  'notify-customer-action',
  'Notify Customer',
  'Your service request has been scheduled. A technician will arrive at {{data.scheduledDate}}',
  'email',
  {
    config: {
      to: 'data.customer.email',
      subject: 'Service Request Scheduled'
    }
  }
);
ServiceRequestWorkflow.addNode(notifyCustomerAction);

// Connect notify technician to notify customer
ServiceRequestWorkflow.connect(
  notifyTechnicianAction.id,
  notifyCustomerAction.id
);

// Add no technician available action
const noTechnicianAction = Action.notification(
  'no-technician-action',
  'No Technician Available',
  'No technician is currently available for service request: {{data.title}}',
  'email',
  {
    config: {
      to: 'admin@company.com',
      subject: 'Service Request Needs Assignment'
    }
  }
);
ServiceRequestWorkflow.addNode(noTechnicianAction);

// Connect technician found condition to no technician action
ServiceRequestWorkflow.connect(
  technicianFoundCondition.id,
  noTechnicianAction.id,
  ConnectionType.FALSE
);

// Add update service request status action
const updateStatusAction = Action.database(
  'update-status-action',
  'Update Status to Pending',
  'serviceRequest',
  'update',
  {
    config: {
      data: {
        status: 'On Hold',
        notes: 'No technician available for automatic assignment'
      },
      where: {
        id: 'data.id'
      }
    }
  }
);
ServiceRequestWorkflow.addNode(updateStatusAction);

// Connect no technician action to update status
ServiceRequestWorkflow.connect(
  noTechnicianAction.id,
  updateStatusAction.id
);

/**
 * Maintenance Reminder Workflow
 * 
 * This workflow sends reminders for scheduled maintenance:
 * 1. Triggered by a schedule
 * 2. Finds equipment due for maintenance
 * 3. Creates service requests
 * 4. Notifies customers
 */
export const MaintenanceReminderWorkflow = new Workflow({
  id: 'maintenance-reminder-workflow',
  name: 'Maintenance Reminder Workflow',
  description: 'Sends reminders for scheduled maintenance',
  nodes: [],
  connections: [],
});

// Add schedule trigger
const scheduleTrigger = Trigger.schedule(
  'maintenance-schedule-trigger',
  'Daily Maintenance Check',
  '0 8 * * *' // Run at 8 AM every day
);
MaintenanceReminderWorkflow.addNode(scheduleTrigger);

// Add find due maintenance action
const findDueMaintenanceAction = Action.function(
  'find-due-maintenance-action',
  'Find Due Maintenance',
  `
  // Find maintenance plans with equipment due for service
  const today = new Date();
  const maintenancePlans = await db.maintenancePlan.findMany({
    where: {
      active: true,
      equipment: {
        some: {
          lastServiceDate: {
            lt: new Date(today.setMonth(today.getMonth() - 3)) // Equipment not serviced in last 3 months
          }
        }
      }
    },
    include: {
      customer: true,
      equipment: true
    }
  });
  
  return maintenancePlans;
  `
);
MaintenanceReminderWorkflow.addNode(findDueMaintenanceAction);

// Connect trigger to find due maintenance
MaintenanceReminderWorkflow.connect(
  scheduleTrigger.id,
  findDueMaintenanceAction.id
);

// Add check results condition
const hasMaintenanceCondition = Condition.expression(
  'has-maintenance-condition',
  'Has Due Maintenance?',
  'results["find-due-maintenance-action"].length > 0'
);
MaintenanceReminderWorkflow.addNode(hasMaintenanceCondition);

// Connect find due maintenance to condition
MaintenanceReminderWorkflow.connect(
  findDueMaintenanceAction.id,
  hasMaintenanceCondition.id
);

// Add create service requests action
const createServiceRequestsAction = Action.function(
  'create-service-requests-action',
  'Create Service Requests',
  `
  const plans = results["find-due-maintenance-action"];
  const createdRequests = [];
  
  for (const plan of plans) {
    for (const equipment of plan.equipment) {
      // Create a service request for each piece of equipment
      const serviceRequest = await db.serviceRequest.create({
        data: {
          title: \`Scheduled Maintenance: \${equipment.name}\`,
          description: \`Regular maintenance for \${equipment.manufacturer} \${equipment.model}\`,
          priority: 'Medium',
          status: 'New',
          requestedDate: new Date(),
          serviceType: 'Maintenance',
          emergency: false,
          customerId: plan.customer.id,
          serviceLocationId: equipment.serviceLocationId,
          equipmentId: equipment.id
        }
      });
      
      createdRequests.push(serviceRequest);
    }
  }
  
  return createdRequests;
  `
);
MaintenanceReminderWorkflow.addNode(createServiceRequestsAction);

// Connect condition to create service requests
MaintenanceReminderWorkflow.connect(
  hasMaintenanceCondition.id,
  createServiceRequestsAction.id,
  ConnectionType.TRUE
);

// Add notify customers action
const notifyCustomersAction = Action.function(
  'notify-customers-action',
  'Notify Customers',
  `
  const plans = results["find-due-maintenance-action"];
  const notifications = [];
  
  // Group by customer to avoid multiple notifications
  const customerMap = new Map();
  
  for (const plan of plans) {
    if (!customerMap.has(plan.customer.id)) {
      customerMap.set(plan.customer.id, {
        customer: plan.customer,
        equipment: []
      });
    }
    
    customerMap.get(plan.customer.id).equipment.push(...plan.equipment);
  }
  
  // Send notifications to each customer
  for (const [customerId, data] of customerMap.entries()) {
    const { customer, equipment } = data;
    
    const notification = await sendEmail({
      to: customer.email,
      subject: 'Maintenance Reminder',
      body: \`
        Dear \${customer.name},
        
        This is a reminder that the following equipment is due for maintenance:
        \${equipment.map(e => \`- \${e.name} (\${e.model})\`).join('\\n')}
        
        We have created service requests for these items and will contact you soon to schedule.
        
        Thank you for your business!
      \`
    });
    
    notifications.push(notification);
  }
  
  return notifications;
  `
);
MaintenanceReminderWorkflow.addNode(notifyCustomersAction);

// Connect create service requests to notify customers
MaintenanceReminderWorkflow.connect(
  createServiceRequestsAction.id,
  notifyCustomersAction.id
);

/**
 * Export all field service workflows
 */
export const FieldServiceWorkflows = [
  ServiceRequestWorkflow,
  MaintenanceReminderWorkflow,
];