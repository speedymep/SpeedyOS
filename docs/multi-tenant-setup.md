# Multi-Tenant Setup Guide for SpeedyOS

This guide explains how to configure and manage the multi-tenant capabilities of SpeedyOS for your HVAC field service management platform.

## Overview

SpeedyOS supports multi-tenancy, allowing you to:

- Host multiple HVAC service companies on a single instance
- Provide each tenant with their own isolated data environment
- Customize branding and UI for each tenant
- Manage tenant-specific configurations and settings
- Scale your SaaS offering efficiently

## Architecture

SpeedyOS implements multi-tenancy using:

1. **Domain-based tenant identification**: Each tenant gets a subdomain (e.g., `tenant1.speedyos.com`)
2. **Data isolation**: Tenant data is isolated through database schemas or row-level security
3. **Role-based access control**: Tenant-specific roles and permissions
4. **White-labeling**: Customizable UI elements per tenant

## Setup

### 1. Enable Multi-Tenancy

In your SpeedyOS `.env` file, add:

```
# Multi-tenant Configuration
ALLOW_MULTI_TENANT=true
TENANT_DOMAIN_PATTERN=*.speedyos.com
```

### 2. Database Configuration

For optimal performance and isolation, configure your database:

#### Using PostgreSQL Schemas (Recommended)

```
DB_DIALECT=postgres
DB_HOST=your_db_host
DB_PORT=5432
DB_DATABASE=speedyos
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_TENANT_SCHEMA_PATTERN=${tenant}
```

#### Using Row-Level Security

```
DB_DIALECT=postgres
DB_HOST=your_db_host
DB_PORT=5432
DB_DATABASE=speedyos
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_TENANT_RLS=true
```

### 3. DNS Configuration

Set up wildcard DNS records for your domain:

```
*.speedyos.com  CNAME  your-speedyos-server.com
```

### 4. SSL Configuration

For secure multi-tenant setup, configure SSL:

```
SSL_ENABLED=true
SSL_KEY=/path/to/ssl/key.pem
SSL_CERT=/path/to/ssl/cert.pem
```

Or use Let's Encrypt for automatic SSL:

```
SSL_ENABLED=true
SSL_AUTO=true
SSL_EMAIL=your-email@example.com
```

## Creating and Managing Tenants

### Creating a New Tenant

Use the admin interface or API to create a new tenant:

1. Go to Admin > Tenants > Create Tenant
2. Enter tenant details:
   - Name: The company name
   - Subdomain: The subdomain prefix (e.g., `acme` for `acme.speedyos.com`)
   - Admin Email: Email for the tenant admin
   - Plan: Subscription plan for the tenant

### Tenant Configuration

For each tenant, you can configure:

- **Branding**: Logo, colors, company name
- **Features**: Enable/disable specific features
- **Roles**: Create tenant-specific roles
- **Workflows**: Configure tenant-specific automation workflows
- **Integrations**: Set up third-party integrations

### Tenant Data Management

Each tenant's data is isolated, but as a platform admin you can:

- View all tenant data
- Perform backups per tenant
- Migrate tenant data
- Monitor tenant resource usage

## White-Labeling

### UI Customization

Each tenant can customize their instance:

- **Logo**: Upload company logo
- **Colors**: Primary, secondary, and accent colors
- **Typography**: Font family and sizes
- **Layout**: Dashboard layout and widget configuration

### Email Templates

Customize email templates per tenant:

- Service request notifications
- Appointment reminders
- Customer communications
- Reports and summaries

## Billing and Subscription Management

### Plans and Pricing

Create different subscription plans:

- Basic: Limited features and users
- Professional: More features and users
- Enterprise: Full feature set and unlimited users

### Tenant Billing

Track and manage tenant subscriptions:

- Monthly/annual billing
- Usage-based billing
- Payment processing
- Invoice generation

## Security Considerations

### Data Isolation

Ensure proper data isolation between tenants:

- Validate tenant ID on all requests
- Implement database-level isolation
- Audit data access regularly

### Authentication

Configure tenant-specific authentication:

- Tenant-specific Clerk application instances
- SSO integration per tenant
- Custom authentication policies

## Monitoring and Maintenance

### Tenant Health Monitoring

Monitor the health of each tenant:

- Resource usage
- Error rates
- Performance metrics
- User activity

### Maintenance Windows

Schedule maintenance with minimal disruption:

- Staggered updates
- Tenant-specific maintenance windows
- Automated notifications

## Troubleshooting

### Common Issues

- **Tenant Identification Failures**: Check DNS and domain configuration
- **Data Leakage**: Verify tenant isolation in queries
- **Performance Issues**: Monitor per-tenant resource usage
- **Authentication Problems**: Check tenant-specific auth settings

### Debugging

- Review server logs with tenant context
- Use tenant-specific monitoring dashboards
- Test with tenant-specific test accounts