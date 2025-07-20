# Ninja OS - Comprehensive B2B Field Service Platform

Ninja OS is a white-labeled, integrated platform that combines best-in-class tools to provide a complete solution for field service businesses. It integrates NocoBase, n8n, and Auth0/Clerk into a unified platform that can be customized and resold as a complete solution.

## Architecture

- **Core Components**:
  - **NocoBase**: Data modeling and admin interfaces
  - **n8n**: Sophisticated workflow automation
  - **Auth0/Clerk**: User authentication and role management
  - **Custom UI**: White-labeled customer experiences

- **Multi-portal Architecture**:
  - **Customer Portal**: Self-service portal for customers
  - **Technician Portal**: Mobile-friendly interface for field technicians
  - **Admin Dashboard**: Comprehensive management interface
  - **Partner Portal**: Interface for subcontractors and partners

- **Integration Layer**:
  - **API Gateway**: Unified API access
  - **Authentication Service**: Centralized auth management
  - **Workflow Engine**: Business process orchestration

## Features

- **Comprehensive Field Service Management**:
  - Service request management
  - Scheduling and dispatching
  - Inventory management
  - Customer management
  - Billing and invoicing
  - Reporting and analytics

- **White-Labeling Capabilities**:
  - Custom branding
  - Domain customization
  - Terminology adaptation
  - Email template customization

- **Enterprise-Grade Security**:
  - Role-based access control
  - Multi-factor authentication
  - Data encryption
  - Audit logging

## Project Structure

- `/auth-service`: Authentication service integrating with Auth0/Clerk
- `/customer-portal`: Customer-facing portal
- `/technician-portal`: Mobile-friendly technician portal
- `/admin-dashboard`: Admin management interface
- `/nginx`: API Gateway configuration
- `/postgres`: Database initialization scripts
- `/backend`: NocoBase with HVAC service plugin
- `/plugins`: Extension plugins for specific industries

## Getting Started

### Prerequisites

- Docker Desktop
- Git
- Auth0 or Clerk account (for authentication)

### Docker Setup (Recommended)

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

### Initial Login

After starting the application, you can log in with the following credentials:

- Email: admin@ninjaos.com
- Password: NinjaAdmin123

## Documentation

- [Setup Guide](NINJA_OS_SETUP.md)
- [Architecture Overview](NINJA_OS_ARCHITECTURE.md)
- [Docker Setup for Mac](DOCKER_MAC_SETUP.md)

## Industry Solutions

Ninja OS can be customized for various field service industries:

- **HVAC Service**
- **Plumbing**
- **Electrical**
- **General Contractors**
- **IT Services**
- **Property Maintenance**

## License

MIT