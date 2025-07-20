# Docker Setup for Mac

This guide provides step-by-step instructions for setting up Ninja OS on macOS using Docker Desktop.

## Prerequisites

- macOS 10.15 or newer
- Docker Desktop for Mac installed
- Git installed

## Installation Steps

### 1. Install Docker Desktop for Mac

If you haven't already installed Docker Desktop:

1. Download Docker Desktop from [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
2. Install the application by dragging it to your Applications folder
3. Start Docker Desktop and wait for it to complete initialization
4. Verify installation by running `docker --version` and `docker-compose --version` in Terminal

### 2. Clone the Repository

```bash
git clone https://github.com/speedymep/SpeedyOS.git
cd SpeedyOS
```

### 3. Configure Environment

```bash
cp .env.ninja .env
```

Edit the `.env` file to set your specific configuration values if needed.

### 4. Start the Platform

For a simplified setup with just the core components:

```bash
docker-compose up -d
```

For the full platform with all components:

```bash
docker-compose -f docker-compose.ninja.yml up -d
```

### 5. Verify Services

Check that all services are running:

```bash
docker-compose ps
```

You should see all services in the "Up" state.

### 6. Access the Platform

- Main Landing Page: http://localhost:8080
- NocoBase Admin: http://localhost:12000 or http://localhost:8080/nocobase/
- n8n Workflow Editor: http://localhost:12001 or http://localhost:8080/workflow/

### 7. Initial Login

- NocoBase:
  - Email: admin@ninjaos.com
  - Password: NinjaAdmin123

- n8n:
  - Username: admin
  - Password: NinjaAdmin123

## Using the Platform

After logging in to NocoBase, you'll have access to:

1. Data models for customers, technicians, equipment, and service requests
2. Dashboard with business analytics and service schedule
3. Technician scheduling with calendar view
4. Service request management
5. Customer management

In n8n, you can create workflows for:

1. Automated scheduling
2. Notifications and alerts
3. Data synchronization
4. Custom business processes

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

### Stop the Platform

```bash
docker-compose down
```

### Restart the Platform

```bash
docker-compose restart
```

## Troubleshooting

### Port Conflicts

If you encounter port conflicts, you can modify the port mappings in the `docker-compose.yml` file:

```yaml
ports:
  - "NEW_PORT:CONTAINER_PORT"
```

### Docker Desktop Resources

Ensure Docker Desktop has sufficient resources allocated:

1. Open Docker Desktop
2. Go to Preferences > Resources
3. Allocate at least:
   - 4 CPUs
   - 8 GB RAM
   - 2 GB Swap
   - 60 GB Disk

### Database Initialization Issues

If the database fails to initialize properly:

```bash
docker-compose down -v  # This will remove volumes, so use with caution
docker-compose up -d
```

### Checking Logs

To view logs for a specific service:

```bash
docker-compose logs -f nocobase
docker-compose logs -f n8n
docker-compose logs -f postgres
```

## Data Persistence

All data is stored in Docker volumes:

- `postgres_data`: Database data
- `nocobase_data`: NocoBase storage
- `n8n_data`: n8n workflows and credentials

## Accessing Container Shells

If you need to access a shell inside a container:

```bash
docker-compose exec nocobase sh
docker-compose exec n8n sh
docker-compose exec postgres bash
```