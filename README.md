# Railway Management System

## Overview
The Railway Management System is an application designed to facilitate efficient railway operations, including ticket booking, train scheduling, and passenger management. It uses Node.js with an Express.js framework and provides secure API endpoints protected by JWT authentication. This system ensures smooth management of railway services and user interactions.

## System Architecture
The system is structured using a modular **MVC (Model-View-Controller)** architecture:
- **Models**: Define data structures and handle database interactions.
- **Controllers**: Contain business logic and handle incoming requests.
- **Routes**: Manage API endpoint definitions and route requests to the appropriate controllers.
- **Middleware**: Handles user authentication and request processing (e.g., JWT verification).

## Technologies Used
- **Node.js**: Backend framework
- **Express.js**: Web application framework for Node.js
- **MySQL**: Database to store user, train, and booking information
- **Sequelize ORM**: For database interaction
- **JWT**: For user authentication and secure API access
- **bcrypt**: For password hashing
- **dotenv**: For environment configuration

## Project Structure
```plaintext
railway-management/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── trainController.js
│   ├── models/
│   │   ├── user.js
│   │   └── booking.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── routes/
│   │   └── index.js
│   └── index.js
├── .env
├── package.json
└── README.md
```

## Setup Instructions

1. **Clone the Repository**
```bash
git clone https://github.com/ayushhthakurr/railway-management.git
cd railway-management
```

2. **Install Dependencies**
```bash
npm install
```

3. **Database Setup**
   - Install MySQL if it’s not already installed.
   - Create a database named `irctc`.
   - Update the database credentials in the `.env` file.

4. **Start the Server**
```bash
npm start
```

## Environment Configuration
Create a `.env` file in the root directory with the following configuration:
```plaintext
DB_NAME=irctc
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306
JWT_SECRET=your_jwt_secret
```

## API Documentation

### Authentication Endpoints
- **Register User**
  - `POST /api/public/register`
  - Body: 
    ```json
    {
        "email": "user@example.com",
        "password": "password123"
    }
    ```

- **Login**
  - `POST /api/public/login`
  - Body: 
    ```json
    {
        "email": "user@example.com",
        "password": "password123"
    }
    ```

### Protected Routes
Protected routes require Bearer token authentication. Example:
- `GET /api/admin/test`
  - Headers: 
    ```plaintext
    Authorization: Bearer <your_jwt_token>
    ```

## Authentication
The system uses JWT (JSON Web Token) for authentication:
1. User registers or logs in.
2. Server validates the credentials.
3. JWT token is generated.
4. Token must be included in the Authorization header for protected routes.
5. Token expires after 24 hours.

## System Design Flowchart


## Error Handling
The system implements comprehensive error handling for:
- Authentication errors (401, 403)
- Validation errors (400)
- Server errors (500)
- Custom error messages for debugging

## Security Features
- **Password Hashing**: All passwords are hashed using bcrypt for secure storage.
- **JWT Authentication**: All protected routes require JWT tokens.
- **Environment Variables**: Sensitive information like JWT secrets and database credentials are stored in `.env` files.
- **Input Validation**: All user inputs are validated to prevent common attacks like SQL injection.
- **Secure Headers**: HTTP headers are configured for additional security.

## Contributing
1. Fork the repository.
2. Create a feature branch.
3. Commit changes.
4. Push to the branch.
5. Create a Pull Request.
