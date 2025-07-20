# Docker Setup Guide for Mac

This guide will help you set up the SpeedyOS HVAC Service Platform using Docker Desktop on your Mac.

## Prerequisites

- Docker Desktop for Mac installed and running
- Git

## Installation Steps

### 1. Clone the Repository

Open Terminal and run:

```bash
git clone https://github.com/speedymep/SpeedyOS.git
cd SpeedyOS
```

### 2. Start the Application with Docker Compose

From the root directory of the project, run:

```bash
docker-compose up
```

This command will:
- Build the Docker image based on the Dockerfile
- Set up the necessary environment variables
- Start the NocoBase application with the HVAC service plugin
- Map port 13000 from the container to your local machine

If you want to run it in the background, use:

```bash
docker-compose up -d
```

### 3. Access the Application

Once the container is running, open your browser and navigate to:

```
http://localhost:13000
```

### 4. Log In

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

## Docker Commands

### View Running Containers

```bash
docker ps
```

### View Logs

```bash
docker-compose logs
```

To follow the logs in real-time:

```bash
docker-compose logs -f
```

### Stop the Application

```bash
docker-compose down
```

### Restart the Application

```bash
docker-compose restart
```

### Rebuild the Container

If you make changes to the Dockerfile or need to rebuild:

```bash
docker-compose up --build
```

## Troubleshooting

### Port Conflicts

If port 13000 is already in use on your Mac, you can modify the `docker-compose.yml` file to use a different port:

```yaml
ports:
  - "13001:13000"  # Change 13001 to any available port
```

Then restart Docker Compose.

### Container Fails to Start

If the container fails to start, check the logs:

```bash
docker-compose logs
```

### Database Issues

If you encounter database issues, you can reset the database by removing the container and volume:

```bash
docker-compose down -v
docker-compose up
```

### Permission Issues

If you encounter permission issues with Docker on Mac:

1. Open Docker Desktop
2. Go to Preferences > Resources > File Sharing
3. Make sure the directory containing your project is in the list of shared paths

## Data Persistence

The application data is stored in a SQLite database inside the Docker container. The database file is located at:

```
/app/storage/db/hvac-service.sqlite
```

To persist this data between container restarts, the Docker Compose configuration mounts the application directory as a volume.

## Accessing the Container Shell

If you need to access the shell inside the container:

```bash
docker-compose exec app bash
```

This gives you a bash shell inside the running container where you can run commands directly.