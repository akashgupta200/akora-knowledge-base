
# API Documentation

Complete API reference for developers.

## Authentication

All API requests require authentication using an API key.

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.example.com/v1/endpoint
```

## Endpoints

### GET /api/users

Retrieve a list of users.

**Parameters:**
- `limit` (optional): Number of results to return (default: 20)
- `offset` (optional): Number of results to skip (default: 0)

**Example Request:**
```bash
GET /api/users?limit=10&offset=0
```

**Example Response:**
```json
{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  ],
  "total": 100,
  "limit": 10,
  "offset": 0
}
```

### POST /api/users

Create a new user.

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "role": "user|admin"
}
```

**Example Response:**
```json
{
  "id": 2,
  "name": "Jane Smith",
  "email": "jane@example.com",
  "role": "user",
  "created_at": "2024-01-15T10:30:00Z"
}
```

## Error Handling

The API uses conventional HTTP response codes:

- `200` - Success
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

Error responses include a JSON object with details:

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "The request parameters are invalid"
  }
}
```
