# Docker Setup Instructions for SpeedyOS HVAC Service Platform

This guide will help you set up the SpeedyOS HVAC Service Platform using Docker Desktop on your local machine.

## Prerequisites

- Docker Desktop installed on your machine
- Git installed on your machine

## Setup Steps

### 1. Clone the Repository

```bash
git clone https://github.com/speedymep/SpeedyOS.git
cd SpeedyOS
```

### 2. Start the Application with Docker Compose

```bash
docker-compose up
```

This command will:
- Build the Docker image based on the Dockerfile
- Set up the necessary environment variables
- Start the NocoBase application with the HVAC service plugin
- Map port 13000 from the container to your local machine

### 3. Access the Application

Once the container is running, you can access the application at:

http://localhost:13000

### 4. Login Credentials

Use the following credentials to log in:

- Email: admin@nocobase.com
- Password: admin123

## Alternative: Build and Run Docker Image Directly

If you prefer to build and run the Docker image directly instead of using Docker Compose:

### 1. Build the Docker Image

```bash
docker build -t hvac-service-app .
```

### 2. Run the Docker Container

```bash
docker run -p 13000:13000 hvac-service-app
```

### 3. Access the Application

Access the application at http://localhost:13000

## Troubleshooting

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

### Port Conflicts

If port 13000 is already in use on your machine, you can modify the `docker-compose.yml` file to use a different port:

```yaml
ports:
  - "13001:13000"  # Change 13001 to any available port
```

Then access the application at http://localhost:13001

## Data Persistence

The application data is stored in a SQLite database inside the Docker container. The database file is located at:

```
/app/storage/db/hvac-service.sqlite
```

To persist this data between container restarts, the Docker Compose configuration mounts the application directory as a volume.