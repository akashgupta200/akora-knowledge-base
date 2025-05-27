
# API Development Guide

Complete guide for building robust APIs with modern best practices.

## Getting Started

### REST API Fundamentals

REST (Representational State Transfer) is an architectural style for designing web services.

#### HTTP Methods

- **GET**: Retrieve data
- **POST**: Create new resources  
- **PUT**: Update entire resources
- **PATCH**: Partial updates
- **DELETE**: Remove resources

#### Status Codes

```javascript
// Success responses
200 - OK
201 - Created
204 - No Content

// Client errors
400 - Bad Request
401 - Unauthorized
403 - Forbidden
404 - Not Found
422 - Unprocessable Entity

// Server errors
500 - Internal Server Error
502 - Bad Gateway
503 - Service Unavailable
```

## API Design Patterns

### Resource-Based URLs

```javascript
// Good
GET /api/users
POST /api/users
GET /api/users/123
PUT /api/users/123
DELETE /api/users/123

// Nested resources
GET /api/users/123/orders
POST /api/users/123/orders
```

### Request/Response Format

```javascript
// Standard API response format
{
  "success": true,
  "data": {
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "message": "User retrieved successfully",
  "timestamp": "2024-01-01T00:00:00Z"
}

// Error response format
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": {
      "field": "email",
      "value": "invalid-email"
    }
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## Authentication & Authorization

### JWT Implementation

```javascript
// Generate JWT token
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email,
      role: user.role 
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// Verify JWT middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      error: { message: 'Access token required' } 
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ 
        success: false, 
        error: { message: 'Invalid token' } 
      });
    }
    req.user = user;
    next();
  });
};
```

### Role-Based Access Control

```javascript
const authorize = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        error: { message: 'Authentication required' } 
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        error: { message: 'Insufficient permissions' } 
      });
    }

    next();
  };
};

// Usage
app.get('/api/admin/users', 
  authenticateToken, 
  authorize(['admin']), 
  getUsersController
);
```

## Data Validation

### Input Validation with Joi

```javascript
const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])')).required(),
  age: Joi.number().integer().min(18).max(120).optional()
});

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: error.details[0].message,
        details: error.details
      }
    });
  }
  
  next();
};
```

## Error Handling

### Global Error Handler

```javascript
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: errors
      }
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      error: {
        code: 'DUPLICATE_ERROR',
        message: `${field} already exists`,
        details: { field, value: err.keyValue[field] }
      }
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      error: {
        code: 'TOKEN_ERROR',
        message: 'Invalid token'
      }
    });
  }

  // Default error
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Something went wrong'
    }
  });
};

app.use(errorHandler);
```

## Performance Optimization

### Caching Strategies

```javascript
const redis = require('redis');
const client = redis.createClient();

// Cache middleware
const cache = (duration = 300) => {
  return async (req, res, next) => {
    const key = req.originalUrl;
    
    try {
      const cached = await client.get(key);
      if (cached) {
        return res.json(JSON.parse(cached));
      }
      
      res.sendResponse = res.json;
      res.json = (body) => {
        client.setex(key, duration, JSON.stringify(body));
        res.sendResponse(body);
      };
      
      next();
    } catch (error) {
      next();
    }
  };
};

// Usage
app.get('/api/users', cache(600), getUsersController);
```

### Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests, please try again later'
    }
  }
});

app.use('/api/', limiter);
```

## Testing

### Unit Testing with Jest

```javascript
const request = require('supertest');
const app = require('../app');

describe('Users API', () => {
  test('GET /api/users should return users list', async () => {
    const response = await request(app)
      .get('/api/users')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test('POST /api/users should create new user', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'SecurePass123!'
    };

    const response = await request(app)
      .post('/api/users')
      .send(newUser)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data.email).toBe(newUser.email);
  });
});
```

## Documentation

### API Documentation with Swagger

```javascript
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 */
```

## Best Practices

1. **Use consistent naming conventions**
2. **Implement proper error handling**
3. **Add comprehensive logging**
4. **Use environment variables for configuration**
5. **Implement rate limiting and security measures**
6. **Write comprehensive tests**
7. **Document your APIs thoroughly**
8. **Version your APIs properly**
9. **Use HTTPS in production**
10. **Monitor API performance and usage**

Remember: Good API design is about creating intuitive, reliable, and scalable interfaces that developers love to use!
