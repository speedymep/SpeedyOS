FROM node:18

WORKDIR /app

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

# Expose port
EXPOSE 13000

# Start the application
CMD ["npm", "run", "start"]