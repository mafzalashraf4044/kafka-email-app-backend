# Email Sending Application with NestJS

This is the backend for a simple email sending application built with NestJS, Kafka, and MySQL. It allows you to trigger email sending jobs and monitor their progress in near real-time.

## Requirements

- Node.js
- Docker
- Docker Compose

## Getting Started

Follow these steps to set up and run the applicatioClone the repository from GitHub:

1. ```bash
   git clone https://github.com/mafzalashraf4044/kafka-email-app-backend.git
   ```
2. Navigate to the project directory:

   ```bash
   cd kafka-email-app-backend
   ```
3. Build and start the Docker containers using Docker Compose:

   ```bash
   docker-compose up --build
   ```
4. The application will be accessible at [http://localhost:3003](http://localhost:3003/).

## Docker Compose Configuration

* The `docker-compose.yml` file includes configurations for Docker containers, including MySQL, Kafka, and Zookeeper.

## Technologies Used

* Frontend: React
* Backend: NestJS
* Queue: Kafka
* Web Sockets: Socket.io
* Database: MySQL

## API Endpoints

### `GET /bulk-email-job`

Retrieves a list of bulk email jobs with pagination.

**Request:**

- Query Parameters:
  - `skip` (optional): Number of records to skip (default: 0).
  - `take` (optional): Maximum number of records to retrieve (default: 10, max: 100).

**Response:** List of bulk email job records with pagination.

**Example:**

```http
GET http://localhost:3003/bulk-email-job?skip=0&take=10
```

### `POST /bulk-email-job`

Creates a new bulk email job.

**Request:**

* Body:
  * `numberOfEmails`: Number of emails to send (positive integer, required).

**Response:** Returns a job ID or email sending ID immediately.

**Example:**

```bash
POST http://localhost:3003/bulk-email-job
{
  "numberOfEmails": 100
}
```

### `GET /bulk-email-job/sent-emails-count`

Retrieves the total count of sent emails.

**Response:** Returns the total count of sent emails.

**Example:**

```bash
GET http://localhost:3003/bulk-email-job/sent-emails-count
```

These endpoints allow you to interact with the bulk email job system, including creating new jobs, retrieving job lists with pagination, and checking the total count of sent emails.

## Contributing

If you would like to contribute to this project or report issues, please visit the GitHub repository at [https://github.com/mafzalashraf4044/kafka-email-app-backend](https://github.com/yourusername/email-sending-app).
