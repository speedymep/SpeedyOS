#!/bin/bash

# Check if n8n is running
echo "Checking if n8n is running..."
n8n_status=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5678/healthz)

if [ "$n8n_status" != "200" ]; then
  echo "n8n is not running. Starting with Docker Compose..."
  cd /workspace/SpeedyOS
  docker-compose up -d n8n
  
  # Wait for n8n to start
  echo "Waiting for n8n to start..."
  while [ "$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5678/healthz)" != "200" ]; do
    sleep 2
  done
fi

echo "n8n is running!"

# Create API key if it doesn't exist
echo "Setting up n8n API key..."
N8N_API_KEY=$(curl -s -X POST http://localhost:5678/rest/api-keys \
  -H "Content-Type: application/json" \
  -d '{"name":"SpeedyOS Integration","scopes":["workflow:read","workflow:create","workflow:execute"]}' | grep -o '"value":"[^"]*' | cut -d'"' -f4)

if [ -n "$N8N_API_KEY" ]; then
  echo "API key created: $N8N_API_KEY"
  
  # Update .env file with the new API key
  sed -i "s/N8N_API_KEY=.*/N8N_API_KEY=$N8N_API_KEY/" /workspace/SpeedyOS/backend/hvac-service-app/.env
  echo "Updated .env file with the new API key"
else
  echo "Failed to create API key. You may need to create one manually in the n8n UI."
fi

# Create example workflows
echo "Creating example workflows..."

# Service Request Notification Workflow
curl -X POST http://localhost:5678/rest/workflows \
  -H "Content-Type: application/json" \
  -H "X-N8N-API-KEY: $N8N_API_KEY" \
  -d '{
    "name": "Service Request Notification",
    "active": true,
    "nodes": [
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "service-request-notification",
          "options": {}
        },
        "name": "Webhook",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          250,
          300
        ]
      },
      {
        "parameters": {
          "fromEmail": "notifications@speedyos.com",
          "toEmail": "={{ $json.customer.email }}",
          "subject": "Service Request Update: {{ $json.title }}",
          "text": "=Dear {{ $json.customer.name }},\n\nYour service request \"{{ $json.title }}\" has been updated to status: {{ $json.status }}.\n\nDetails:\n{{ $json.description }}\n\nThank you for choosing our service.\n\nSpeedyOS Team",
          "options": {}
        },
        "name": "Send Email",
        "type": "n8n-nodes-base.emailSend",
        "typeVersion": 1,
        "position": [
          500,
          300
        ]
      }
    ],
    "connections": {
      "Webhook": {
        "main": [
          [
            {
              "node": "Send Email",
              "type": "main",
              "index": 0
            }
          ]
        ]
      }
    }
  }'

# Technician Assignment Workflow
curl -X POST http://localhost:5678/rest/workflows \
  -H "Content-Type: application/json" \
  -H "X-N8N-API-KEY: $N8N_API_KEY" \
  -d '{
    "name": "Technician Assignment",
    "active": true,
    "nodes": [
      {
        "parameters": {
          "httpMethod": "POST",
          "path": "technician-assignment",
          "options": {}
        },
        "name": "Webhook",
        "type": "n8n-nodes-base.webhook",
        "typeVersion": 1,
        "position": [
          250,
          300
        ]
      },
      {
        "parameters": {
          "jsCode": "// Find the best technician based on skills and availability\nconst serviceRequest = $input.item.json;\n\n// This is a simplified example - in a real scenario, you would\n// implement more complex logic to find the best technician\nreturn {\n  json: {\n    serviceRequestId: serviceRequest.id,\n    recommendedTechnicianId: serviceRequest.availableTechnicians[0]?.id || null,\n    reason: \"Based on skills and availability\"\n  }\n};"
        },
        "name": "Find Best Technician",
        "type": "n8n-nodes-base.function",
        "typeVersion": 1,
        "position": [
          500,
          300
        ]
      },
      {
        "parameters": {
          "url": "=http://nocobase:12001/api/serviceRequests:update",
          "method": "POST",
          "authentication": "genericCredentialType",
          "genericAuthType": "httpHeaderAuth",
          "sendBody": true,
          "bodyParameters": {
            "parameters": [
              {
                "name": "filter",
                "value": "={{ {\"id\": $json.serviceRequestId} }}"
              },
              {
                "name": "values",
                "value": "={{ {\"technicianId\": $json.recommendedTechnicianId} }}"
              }
            ]
          },
          "options": {}
        },
        "name": "Update Service Request",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 3,
        "position": [
          750,
          300
        ],
        "credentials": {
          "httpHeaderAuth": {
            "id": "1",
            "name": "NocoBase API"
          }
        }
      }
    ],
    "connections": {
      "Webhook": {
        "main": [
          [
            {
              "node": "Find Best Technician",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Find Best Technician": {
        "main": [
          [
            {
              "node": "Update Service Request",
              "type": "main",
              "index": 0
            }
          ]
        ]
      }
    }
  }'

echo "Setup complete!"