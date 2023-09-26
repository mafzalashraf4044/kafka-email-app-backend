# Stage 1: Build the application
FROM node:18.16.0-alpine3.16 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy only the package.json & package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code, .env, and necessary configuration files
COPY ./src ./src
COPY ./.env ./.env
COPY ./tsconfig.build.json ./tsconfig.build.json
COPY ./tsconfig.json ./tsconfig.json

# Build the application
RUN npm run build

# Stage 2: Create a lightweight production image
FROM node:18.16.0-alpine3.16

# Set the working directory in the container
WORKDIR /app

# Copy the built application from the previous stage
COPY --from=builder /app/dist ./

# Define the command to start the production application
CMD ["node", "main"]