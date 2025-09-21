# Doctor Appointment Management System Backend

A Node.js backend API for managing doctor appointments using Express and PostgreSQL.

## Features

- User authentication (JWT)
- Role-based authorization (Patient, Doctor, Admin)
- Appointment management
- PostgreSQL database with Sequelize ORM
- Error handling
- Input validation

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a PostgreSQL database named 'doctor_appointments'

4. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the database credentials and JWT secret

5. Run database migrations:
   ```bash
   npx sequelize-cli db:migrate
   ```

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication
- POST /api/users/register - Register a new user
- POST /api/users/login - User login
- GET /api/users/profile - Get user profile (authenticated)

### Appointments
- POST /api/appointments - Create appointment (patients only)
- GET /api/appointments - List all appointments (doctors & admins)
- GET /api/appointments/:id - Get specific appointment
- PUT /api/appointments/:id - Update appointment (doctors only)
- PATCH /api/appointments/:id/cancel - Cancel appointment (patients & doctors)

## Environment Variables

```
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=doctor_appointments
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=24h
```

## Error Handling

The API uses a centralized error handling mechanism with appropriate HTTP status codes and error messages.

## Security

- Password hashing using bcrypt
- JWT for authentication
- Role-based access control
- Input validation
- SQL injection protection through Sequelize