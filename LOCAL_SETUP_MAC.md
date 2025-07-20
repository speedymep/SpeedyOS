# Local Setup Guide for Mac

This guide will help you set up the SpeedyOS HVAC Service Platform on your Mac.

## Prerequisites

- Node.js 18 or later (recommended: use nvm to install)
- Git
- Terminal access

## Installation Steps

### 1. Clone the Repository

Open Terminal and run:

```bash
git clone https://github.com/speedymep/SpeedyOS.git
cd SpeedyOS
```

### 2. Set Up the NocoBase Application

Navigate to the application directory:

```bash
cd backend/hvac-service-app
```

### 3. Create Environment File

Create a `.env` file by copying the example:

```bash
cp .env.example .env
```

The `.env` file should contain:

```
DB_DIALECT=sqlite
DB_STORAGE=storage/db/hvac-service.sqlite
LOCAL_STORAGE_DEST=storage
APP_PORT=13000
API_BASE_PATH=/api/
PLUGIN_COLLECTION_MANAGER_COLLECTION_SORT=true
PLUGIN_USERS_INIT_PASSWORD=admin123
PLUGIN_USERS_SUPER_EMAIL=admin@nocobase.com
PLUGIN_USERS_SUPER_PASSWORD=admin123
INIT_APP_LANG=en-US
INIT_ROOT_EMAIL=admin@nocobase.com
INIT_ROOT_PASSWORD=admin123
INIT_ROOT_NICKNAME=Super Admin
ENABLE_DYNAMIC_YIELD=true
PLUGINS=hvac-plugin
```

### 4. Install Dependencies

Install the required Node.js packages:

```bash
npm install
```

### 5. Start the Development Server

Start the NocoBase application in development mode:

```bash
npm run dev
```

This will:
- Initialize the database
- Install and enable the HVAC plugin
- Start the development server

### 6. Access the Application

Open your browser and navigate to:

```
http://localhost:13000
```

### 7. Log In

Use the following credentials to log in:

- Email: admin@nocobase.com
- Password: admin123

## Using the HVAC Service Platform

After logging in, you'll see the NocoBase admin interface with the HVAC Service menu in the sidebar. From here, you can:

1. Navigate to the HVAC Dashboard to see an overview of your service business
2. Manage customers, service requests, technicians, and equipment
3. Create and track service requests
4. Assign technicians to service requests
5. Track equipment for customers

## Troubleshooting

### Port Already in Use

If port 13000 is already in use, you can change it in the `.env` file:

```
APP_PORT=13001
```

Then restart the application.

### Database Issues

If you encounter database issues, you can reset the database:

```bash
npm run clean
npm run dev
```

This will delete the existing database and create a new one.

### Plugin Not Loading

If the HVAC plugin doesn't appear in the menu:

1. Make sure `PLUGINS=hvac-plugin` is in your `.env` file
2. Restart the application
3. Check the console for any error messages

## Development

### Modifying the HVAC Plugin

The HVAC plugin code is located in:

```
backend/hvac-service-app/plugins/hvac-plugin/
```

After making changes to the plugin, you may need to restart the application.

### Building for Production

To build the application for production:

```bash
npm run build
npm run start
```

This will create an optimized production build and start the server.