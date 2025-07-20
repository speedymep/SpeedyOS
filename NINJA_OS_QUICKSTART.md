# Ninja OS - Quick Start Guide

This guide will help you quickly get started with Ninja OS, a comprehensive B2B field service platform that integrates NocoBase, n8n, and authentication services.

## 1. Prerequisites

- Docker Desktop installed and running
- Git installed
- 8GB+ RAM available for Docker
- 10GB+ free disk space

## 2. Installation

### Clone the Repository

```bash
git clone https://github.com/speedymep/SpeedyOS.git
cd SpeedyOS
```

### Configure Environment

```bash
cp .env.ninja .env
```

Edit the `.env` file if you need to customize any settings.

### Start the Platform

For a simplified setup with just the core components:

```bash
docker-compose up -d
```

For the full platform with all components:

```bash
docker-compose -f docker-compose.ninja.yml up -d
```

## 3. Access the Platform

- **Main Landing Page**: http://localhost:8080
- **NocoBase Admin**: http://localhost:12000 or http://localhost:8080/nocobase/
- **n8n Workflow Editor**: http://localhost:12001 or http://localhost:8080/workflow/

## 4. Login Credentials

- **NocoBase**:
  - Email: admin@ninjaos.com
  - Password: NinjaAdmin123

- **n8n**:
  - Username: admin
  - Password: NinjaAdmin123

## 5. Platform Components

### NocoBase (Data & UI Layer)
- Data modeling
- Admin interfaces
- Business entities management

### n8n (Workflow Engine)
- Business process automation
- Scheduling and dispatching
- Notifications and alerts
- External service integrations

### API Gateway
- Unified access point
- Routing to appropriate services
- Load balancing

## 6. Basic Operations

### Create a Customer
1. Log in to NocoBase
2. Navigate to Customers
3. Click "Add Customer"
4. Fill in customer details
5. Click "Save"

### Create a Service Request
1. Navigate to Service Requests
2. Click "Add Service Request"
3. Select a customer
4. Fill in service details
5. Click "Save"

### Assign a Technician
1. Open the service request
2. Click "Assign Technician"
3. Select a technician from the dropdown
4. Set the scheduled date and time
5. Click "Save"

### Create a Workflow in n8n
1. Log in to n8n
2. Click "Create new workflow"
3. Add a trigger (e.g., "When a new service request is created")
4. Add actions (e.g., "Send notification email")
5. Connect the nodes
6. Click "Save" and "Activate"

## 7. Next Steps

- Explore the [NINJA_OS_ARCHITECTURE.md](NINJA_OS_ARCHITECTURE.md) document for a deeper understanding of the platform
- Check [DOCKER_MAC_SETUP.md](DOCKER_MAC_SETUP.md) for Mac-specific setup instructions
- Review [NINJA_OS_SETUP.md](NINJA_OS_SETUP.md) for detailed configuration options

## 8. Stopping the Platform

To stop all services:

```bash
docker-compose down
```

To stop all services and remove volumes (will delete all data):

```bash
docker-compose down -v
```

## 9. Getting Help

If you encounter any issues:

1. Check the logs:
   ```bash
   docker-compose logs -f
   ```

2. Restart the services:
   ```bash
   docker-compose restart
   ```

3. Ensure Docker has sufficient resources allocated in Docker Desktop settings