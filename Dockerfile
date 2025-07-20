FROM node:18

WORKDIR /app

# Install curl for healthcheck
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json
COPY backend/hvac-service-app/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY backend/hvac-service-app ./

# Set environment variables
ENV DB_DIALECT=sqlite
ENV DB_STORAGE=storage/db/hvac-service.sqlite
ENV LOCAL_STORAGE_DEST=storage
ENV APP_PORT=13000
ENV API_BASE_PATH=/api/
ENV PLUGIN_COLLECTION_MANAGER_COLLECTION_SORT=true
ENV PLUGIN_USERS_INIT_PASSWORD=admin123
ENV PLUGIN_USERS_SUPER_EMAIL=admin@nocobase.com
ENV PLUGIN_USERS_SUPER_PASSWORD=admin123
ENV INIT_APP_LANG=en-US
ENV INIT_ROOT_EMAIL=admin@nocobase.com
ENV INIT_ROOT_PASSWORD=admin123
ENV INIT_ROOT_NICKNAME="Super Admin"
ENV ENABLE_DYNAMIC_YIELD=true
ENV PLUGINS=hvac-plugin

# Expose port
EXPOSE 13000

# Start the application
CMD ["npm", "run", "start"]