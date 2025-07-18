# n8n Integration Guide for SpeedyOS

This guide explains how to integrate n8n with SpeedyOS for workflow automation in your HVAC field service management platform.

## Overview

n8n is used in SpeedyOS to automate various workflows such as:

- Sending notifications when service requests are created or updated
- Automatically assigning technicians based on skills and availability
- Scheduling follow-up appointments
- Generating reports
- Syncing data with external systems
- Automating inventory management

## Setup

### 1. Install n8n

You can install n8n using Docker, npm, or their cloud offering:

#### Using Docker:
```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

#### Using npm:
```bash
npm install n8n -g
n8n start
```

### 2. Configure Environment Variables

In your SpeedyOS `.env` file, add the following:

```
# n8n Integration
N8N_API_URL=http://localhost:5678/api/v1
N8N_API_KEY=your_n8n_api_key
```

To get your API key, go to n8n settings > API > Create API Key.

### 3. Create Webhook Endpoints

SpeedyOS provides webhook endpoints for n8n to trigger actions:

- `POST /api/n8n-webhooks:trigger` - General webhook endpoint for n8n to trigger actions

### 4. Example Workflows

#### Service Request Notification Workflow

1. In n8n, create a new workflow
2. Add a "Webhook" trigger node
3. Configure it to listen for POST requests
4. Add a "Switch" node to handle different event types
5. Add a "Send Email" node for notifications
6. Connect the nodes and activate the workflow

#### Technician Assignment Workflow

1. Create a new workflow in n8n
2. Add a "Webhook" trigger node
3. Add a "Function" node to determine the best technician based on skills and location
4. Add an "HTTP Request" node to update the service request in SpeedyOS
5. Connect the nodes and activate the workflow

## Webhook Payload Format

When sending data to n8n webhooks, use the following format:

```json
{
  "event": "service_request.created",
  "data": {
    "id": "123",
    "title": "AC Repair",
    "description": "AC not cooling properly",
    "customer": {
      "id": "456",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "123-456-7890"
    },
    "priority": "high",
    "status": "new"
  }
}
```

## Available Events

SpeedyOS can trigger the following events to n8n:

- `service_request.created` - When a new service request is created
- `service_request.updated` - When a service request is updated
- `service_request.completed` - When a service request is marked as completed
- `technician.assigned` - When a technician is assigned to a service request
- `inventory.low` - When inventory items are running low
- `maintenance.due` - When equipment maintenance is due

## Security Considerations

- Always use HTTPS for webhook endpoints
- Keep your n8n API key secure
- Validate webhook payloads
- Implement rate limiting for webhook endpoints

## Troubleshooting

- Check n8n execution logs for errors
- Verify webhook URLs are correct
- Ensure n8n has network access to SpeedyOS
- Validate JSON payloads for correct format

## Advanced Usage

### Custom JavaScript Functions

You can use custom JavaScript in n8n Function nodes to implement complex business logic:

```javascript
// Example: Calculate priority based on customer type and issue
return {
  json: {
    ...item.json,
    calculatedPriority: item.json.isVIP ? 'high' : 
                        (item.json.issueType === 'no_cooling' ? 'high' : 'medium')
  }
};
```

### Integrating with External Services

n8n can connect SpeedyOS with various external services:

- QuickBooks for accounting
- Google Calendar for scheduling
- Slack for team notifications
- CRM systems for customer data
- Weather APIs for service planning