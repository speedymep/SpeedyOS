# HVAC Service Management Plugin for NocoBase

This plugin extends NocoBase with features specifically designed for HVAC service businesses.

## Features

### Customer Management
- Customer profiles with contact information
- Service history tracking
- Equipment inventory per customer
- Maintenance contract management

### Service Management
- Service request creation and tracking
- Job scheduling and dispatch
- Technician assignment
- Service status updates
- Service report generation

### Technician Management
- Technician profiles with skills and certifications
- Availability tracking
- Work order assignment
- Mobile access for field technicians

### Equipment Management
- Equipment inventory
- Maintenance schedules
- Warranty tracking
- Part replacement history

### Reporting and Analytics
- Service performance metrics
- Technician productivity
- Customer satisfaction
- Revenue and profitability analysis

## Data Models

### Customers
- Name
- Contact Information
- Address
- Service History
- Equipment Owned

### Service Requests
- Customer
- Description
- Priority
- Status
- Scheduled Date/Time
- Assigned Technician
- Service Notes
- Resolution

### Technicians
- Name
- Contact Information
- Skills/Certifications
- Availability Schedule
- Service History

### Equipment
- Type
- Model
- Serial Number
- Installation Date
- Warranty Information
- Maintenance Schedule
- Service History

### Parts Inventory
- Part Number
- Description
- Quantity
- Location
- Reorder Level
- Supplier Information

## Workflows

### Service Request Workflow
1. Customer submits service request
2. Request is assigned to a technician
3. Technician schedules the service
4. Service is performed
5. Service report is generated
6. Customer is billed
7. Follow-up is scheduled if needed

### Maintenance Contract Workflow
1. Contract is created
2. Maintenance schedule is established
3. Reminders are sent before scheduled maintenance
4. Maintenance is performed
5. Service report is generated
6. Next maintenance is scheduled

## Installation

This plugin is automatically installed as part of the HVAC Service App. If you need to install it separately:

1. Copy the plugin folder to the `plugins` directory of your NocoBase installation
2. Install the plugin:
   ```
   yarn nocobase plugin:install hvac-plugin
   ```
3. Enable the plugin:
   ```
   yarn nocobase plugin:enable hvac-plugin
   ```

## Configuration

After installation, you can configure the plugin through the NocoBase admin interface:

1. Go to Settings > Plugins
2. Find the HVAC Service Management plugin
3. Click Configure
4. Set up your preferences for service scheduling, notifications, and reporting

## Development

To extend or modify this plugin:

1. Clone the repository
2. Make your changes
3. Build the plugin:
   ```
   yarn build
   ```
4. Test your changes
5. Submit a pull request