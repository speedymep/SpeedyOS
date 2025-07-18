# HVAC Service Management Plugin for NocoBase

A comprehensive HVAC field service management plugin for NocoBase, designed to help HVAC businesses manage their service operations efficiently.

## Features

- **Customer Management**: Track customer information, service history, and equipment.
- **Equipment Tracking**: Manage customer equipment details, maintenance history, and service records.
- **Service Request Management**: Create, schedule, and track service requests from initial contact to completion.
- **Technician Management**: Manage technician information, skills, certifications, and schedules.
- **Task Management**: Create and assign tasks for service requests.
- **Maintenance History**: Track all maintenance activities for customer equipment.
- **Inventory Management**: Track parts and supplies inventory.
- **Dashboard**: Visual overview of service operations with key metrics.
- **Service Scheduler**: Calendar-based scheduling interface for service appointments.

## Integration

This plugin integrates with:

- **Clerk**: For authentication and user management
- **n8n**: For workflow automation

## Installation

1. Install the plugin:
   ```
   yarn nocobase add hvac-service
   ```

2. Configure environment variables:
   ```
   # Authentication Configuration
   AUTH_PROVIDER=clerk
   CLERK_API_KEY=your_clerk_api_key
   CLERK_FRONTEND_API=your_clerk_frontend_api

   # n8n Integration
   N8N_API_URL=your_n8n_api_url
   N8N_API_KEY=your_n8n_api_key

   # Multi-tenant Configuration (optional)
   ALLOW_MULTI_TENANT=true
   TENANT_DOMAIN_PATTERN=*.yourdomain.com
   ```

3. Restart NocoBase

## Usage

After installation, you'll find the HVAC Service menu in the admin interface with access to:

- Dashboard
- Service Scheduler
- Customers
- Equipment
- Service Requests
- Technicians
- Tasks
- Maintenance History
- Inventory

## White Labeling

This plugin supports white labeling through NocoBase's UI settings. You can customize:

- Logo
- Colors
- Company name
- Domain name (with multi-tenant setup)

## License

MIT
