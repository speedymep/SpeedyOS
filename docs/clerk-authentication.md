# Clerk Authentication Guide for SpeedyOS

This guide explains how to set up and use Clerk for authentication in your SpeedyOS HVAC field service management platform.

## Overview

Clerk provides a complete authentication and user management solution for SpeedyOS, offering:

- Secure authentication with multiple methods (email/password, social logins, etc.)
- User management
- Role-based access control
- Multi-tenant support
- Customizable UI components

## Setup

### 1. Create a Clerk Account

1. Go to [clerk.dev](https://clerk.dev) and sign up for an account
2. Create a new application in the Clerk dashboard
3. Configure your authentication methods (email/password, Google, etc.)
4. Set up your application's appearance and branding

### 2. Get API Keys

From your Clerk dashboard:

1. Go to API Keys
2. Copy your "API Key" and "Frontend API" values

### 3. Configure Environment Variables

In your SpeedyOS `.env` file, add the following:

```
# Authentication Configuration
AUTH_PROVIDER=clerk
CLERK_API_KEY=your_clerk_api_key
CLERK_FRONTEND_API=your_clerk_frontend_api
```

### 4. User Roles and Permissions

SpeedyOS defines several user roles that are mapped to Clerk user metadata:

- **Admin**: Full access to all features
- **Manager**: Can manage service requests, technicians, and customers
- **Technician**: Limited access to assigned service requests and tasks
- **Customer**: Can view their own service requests and equipment

To set up roles in Clerk:

1. Go to your Clerk dashboard > Users
2. Select a user
3. Add custom metadata with a `role` field set to one of the above roles

## Integration Details

### Authentication Flow

1. User signs in through Clerk's UI components
2. Clerk validates the credentials and creates a session
3. SpeedyOS verifies the session with Clerk's backend
4. If valid, SpeedyOS creates or retrieves the user in its database
5. The user is granted access based on their role

### User Synchronization

When a user authenticates with Clerk for the first time, SpeedyOS:

1. Retrieves the user's profile from Clerk
2. Creates a corresponding user record in the SpeedyOS database
3. Assigns the appropriate role based on Clerk metadata
4. Links the Clerk user ID to the SpeedyOS user record

### Multi-Tenant Support

For multi-tenant deployments:

1. Create organizations in Clerk
2. Assign users to organizations
3. Set organization metadata to include tenant information
4. SpeedyOS will use this information to enforce data isolation between tenants

## Customizing the Authentication UI

Clerk provides customizable UI components that can be styled to match your branding:

1. Go to your Clerk dashboard > Appearance
2. Customize colors, fonts, and other visual elements
3. Preview the changes in real-time
4. Save your customizations

## Security Best Practices

- Keep your Clerk API keys secure
- Use HTTPS for all communications
- Implement proper role-based access control
- Regularly audit user accounts and permissions
- Enable two-factor authentication for sensitive accounts

## Troubleshooting

### Common Issues

- **Authentication Failures**: Verify API keys and check Clerk dashboard logs
- **Missing User Data**: Ensure proper synchronization between Clerk and SpeedyOS
- **Permission Issues**: Check role assignments and ACL configurations
- **Session Expiration**: Verify token lifetimes in Clerk settings

### Debugging

- Check browser console for frontend errors
- Review server logs for backend issues
- Use Clerk's session debugger in the dashboard
- Verify network requests to Clerk's API

## Advanced Configuration

### Custom Email Templates

Customize email templates for authentication flows:

1. Go to Clerk dashboard > Email Templates
2. Edit the templates for verification, password reset, etc.
3. Use variables provided by Clerk to personalize messages

### Webhooks

Set up webhooks to notify your system of authentication events:

1. Go to Clerk dashboard > Webhooks
2. Create a new webhook endpoint pointing to your SpeedyOS server
3. Select the events you want to receive (user created, user deleted, etc.)
4. Implement handlers in SpeedyOS to process these events