# Ninja OS - Comprehensive B2B Field Service Platform

## Overview

Ninja OS is a white-labeled, integrated platform that combines NocoBase, n8n, and Auth0/Clerk to provide a complete solution for field service businesses. This document provides instructions for setting up and deploying the platform.

## Prerequisites

- Docker and Docker Compose
- Git
- Node.js 18+ (for local development)
- Auth0 or Clerk account (for authentication)

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/speedymep/SpeedyOS.git
   cd SpeedyOS
   ```

2. Configure environment variables:
   ```bash
   cp .env.ninja .env
   ```
   Edit the `.env` file to set your specific configuration values.

3. Start the platform:
   ```bash
   docker-compose -f docker-compose.ninja.yml up -d
   ```

4. Access the platform:
   - Admin Dashboard: http://localhost:8080/admin/
   - Customer Portal: http://localhost:8080/customer/
   - Technician Portal: http://localhost:8080/technician/
   - NocoBase Admin: http://localhost:8080/nocobase/
   - n8n Workflow Editor: http://localhost:8080/workflow/

## Architecture Components

### 1. NocoBase (Data & UI Layer)
NocoBase provides the data modeling capabilities and admin interfaces for the platform. It manages all business entities such as customers, work orders, inventory, etc.

### 2. n8n (Workflow Engine)
n8n orchestrates complex business processes, handles scheduling and dispatching, manages notifications, and integrates with external services.

### 3. Auth0/Clerk (Authentication & Authorization)
Auth0 or Clerk manages user authentication across all portals, handles role-based access control, and provides single sign-on capabilities.

### 4. Custom UI Layer (White-Labeled Frontend)
The custom UI layer provides branded user interfaces for all portals, with responsive design for mobile and desktop.

## Directory Structure

```
SpeedyOS/
├── admin-dashboard/       # Admin portal frontend
├── auth-service/          # Authentication service
├── customer-portal/       # Customer portal frontend
├── nginx/                 # API Gateway configuration
├── plugins/               # NocoBase plugins
│   └── hvac-plugin/       # HVAC industry plugin
├── postgres/              # Database initialization scripts
├── technician-portal/     # Technician portal frontend
├── docker-compose.ninja.yml  # Docker Compose configuration
└── .env.ninja            # Environment configuration template
```

## Configuration

### Auth0 Setup

1. Create a new Auth0 application
2. Configure the following settings:
   - Allowed Callback URLs: http://localhost:8080/auth/callback
   - Allowed Logout URLs: http://localhost:8080
   - Allowed Web Origins: http://localhost:8080
3. Create API in Auth0
4. Set up roles and permissions
5. Update the `.env` file with your Auth0 credentials

### White Labeling

To customize the platform for your brand:

1. Update the branding variables in the `.env` file:
   ```
   COMPANY_NAME=Your Company Name
   COMPANY_LOGO_URL=https://example.com/logo.png
   PRIMARY_COLOR=#3498db
   SECONDARY_COLOR=#2ecc71
   ACCENT_COLOR=#e74c3c
   FONT_FAMILY=Roboto, sans-serif
   ```

2. Replace the logo files in each portal's assets directory
3. Customize email templates in the auth-service directory

## Development Workflow

### Local Development

For local development of individual components:

1. Start the core services:
   ```bash
   docker-compose -f docker-compose.ninja.yml up -d postgres redis nocobase n8n
   ```

2. Run the component you're working on locally:
   ```bash
   cd customer-portal
   npm install
   npm run dev
   ```

### Adding New Features

1. Extend the NocoBase data model using the admin interface
2. Create workflows in n8n to implement business logic
3. Update the frontend portals to expose the new features
4. Configure permissions in Auth0/Clerk

## Deployment

### Production Deployment

For production deployment:

1. Update the `.env` file with production values
2. Deploy using Docker Compose:
   ```bash
   docker-compose -f docker-compose.ninja.yml -f docker-compose.prod.yml up -d
   ```

### Cloud Deployment

The platform can be deployed to any cloud provider that supports Docker:

- AWS: Use ECS or EKS
- Azure: Use AKS
- Google Cloud: Use GKE
- Digital Ocean: Use DOKS

## Customization for Different Industries

The platform is designed to be customizable for different industries:

1. Install the appropriate industry plugin (e.g., hvac-plugin for HVAC businesses)
2. Configure the data models and workflows for the specific industry
3. Customize the UI to match industry terminology and workflows

## Support and Maintenance

For support and maintenance:

1. Check the logs:
   ```bash
   docker-compose -f docker-compose.ninja.yml logs
   ```

2. Restart services:
   ```bash
   docker-compose -f docker-compose.ninja.yml restart [service-name]
   ```

3. Update the platform:
   ```bash
   git pull
   docker-compose -f docker-compose.ninja.yml down
   docker-compose -f docker-compose.ninja.yml up -d
   ```

## Backup and Recovery

To backup the platform data:

1. Backup the PostgreSQL database:
   ```bash
   docker-compose -f docker-compose.ninja.yml exec postgres pg_dump -U postgres nocobase > nocobase_backup.sql
   docker-compose -f docker-compose.ninja.yml exec postgres pg_dump -U postgres n8n > n8n_backup.sql
   ```

2. Backup the volumes:
   ```bash
   docker run --rm -v speedyos_postgres_data:/source -v $(pwd)/backups:/backup alpine tar -czf /backup/postgres_data.tar.gz /source
   docker run --rm -v speedyos_nocobase_data:/source -v $(pwd)/backups:/backup alpine tar -czf /backup/nocobase_data.tar.gz /source
   docker run --rm -v speedyos_n8n_data:/source -v $(pwd)/backups:/backup alpine tar -czf /backup/n8n_data.tar.gz /source
   ```

To restore from backup:

1. Restore the PostgreSQL database:
   ```bash
   cat nocobase_backup.sql | docker-compose -f docker-compose.ninja.yml exec -T postgres psql -U postgres nocobase
   cat n8n_backup.sql | docker-compose -f docker-compose.ninja.yml exec -T postgres psql -U postgres n8n
   ```

2. Restore the volumes (requires stopping the services first):
   ```bash
   docker-compose -f docker-compose.ninja.yml down
   docker run --rm -v speedyos_postgres_data:/target -v $(pwd)/backups:/backup alpine sh -c "rm -rf /target/* && tar -xzf /backup/postgres_data.tar.gz -C /target --strip-components=1"
   docker run --rm -v speedyos_nocobase_data:/target -v $(pwd)/backups:/backup alpine sh -c "rm -rf /target/* && tar -xzf /backup/nocobase_data.tar.gz -C /target --strip-components=1"
   docker run --rm -v speedyos_n8n_data:/target -v $(pwd)/backups:/backup alpine sh -c "rm -rf /target/* && tar -xzf /backup/n8n_data.tar.gz -C /target --strip-components=1"
   docker-compose -f docker-compose.ninja.yml up -d
   ```