
# Database Setup Guide

Complete guide for setting up and configuring databases for your applications.

## PostgreSQL Setup

### Installation

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# macOS with Homebrew
brew install postgresql
brew services start postgresql

# Windows - Download from postgresql.org
```

### Initial Configuration

```sql
-- Connect as postgres user
sudo -u postgres psql

-- Create new database
CREATE DATABASE myapp_db;

-- Create new user
CREATE USER myapp_user WITH PASSWORD 'secure_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE myapp_db TO myapp_user;

-- Exit
\q
```

### Connection Configuration

```javascript
// Using pg (node-postgres)
const { Pool } = require('pg');

const pool = new Pool({
  user: 'myapp_user',
  host: 'localhost',
  database: 'myapp_db',
  password: 'secure_password',
  port: 5432,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to PostgreSQL:', res.rows[0]);
  }
});
```

## MySQL Setup

### Installation and Configuration

```bash
# Ubuntu/Debian
sudo apt install mysql-server
sudo mysql_secure_installation

# macOS
brew install mysql
brew services start mysql

# Connect to MySQL
mysql -u root -p
```

```sql
-- Create database
CREATE DATABASE myapp_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user
CREATE USER 'myapp_user'@'localhost' IDENTIFIED BY 'secure_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON myapp_db.* TO 'myapp_user'@'localhost';
FLUSH PRIVILEGES;
```

### Node.js Connection

```javascript
const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'myapp_user',
  password: 'secure_password',
  database: 'myapp_db',
  charset: 'utf8mb4'
};

const pool = mysql.createPool(dbConfig);

// Test connection
async function testConnection() {
  try {
    const [rows] = await pool.execute('SELECT 1 as test');
    console.log('MySQL connected successfully');
  } catch (error) {
    console.error('MySQL connection error:', error);
  }
}
```

## MongoDB Setup

### Installation

```bash
# Ubuntu - Add MongoDB repository
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install mongodb-org

# macOS
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

### Node.js with Mongoose

```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://localhost:27017/myapp_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// User schema example
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);
```

## Database Migrations

### PostgreSQL Migrations with Knex.js

```javascript
// knexfile.js
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'myapp_db',
      user: 'myapp_user',
      password: 'secure_password'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    }
  }
};

// Migration file: 001_create_users_table.js
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
```

### Running Migrations

```bash
# Install knex CLI
npm install -g knex

# Create migration
knex migrate:make create_users_table

# Run migrations
knex migrate:latest

# Rollback migration
knex migrate:rollback
```

## Connection Pooling

### PostgreSQL Pool Configuration

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  user: 'myapp_user',
  host: 'localhost',
  database: 'myapp_db',
  password: 'secure_password',
  port: 5432,
  // Pool configuration
  max: 20,          // Maximum number of clients
  min: 5,           // Minimum number of clients
  idle: 10000,      // Close idle clients after 10 seconds
  acquire: 60000,   // Acquire timeout
  evict: 1000       // Check for idle clients every second
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Closing database pool...');
  await pool.end();
  process.exit(0);
});
```

## Environment Configuration

### Environment Variables

```bash
# .env file
DB_HOST=localhost
DB_PORT=5432
DB_NAME=myapp_db
DB_USER=myapp_user
DB_PASSWORD=secure_password
DB_SSL=false

# Production
DB_HOST=prod-db.example.com
DB_SSL=true
```

```javascript
// config/database.js
require('dotenv').config();

module.exports = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'myapp_db',
  user: process.env.DB_USER || 'myapp_user',
  password: process.env.DB_PASSWORD,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  max: 20,
  min: 5
};
```

## Backup and Recovery

### PostgreSQL Backup

```bash
# Create backup
pg_dump -h localhost -U myapp_user -d myapp_db > backup.sql

# Create compressed backup
pg_dump -h localhost -U myapp_user -d myapp_db | gzip > backup.sql.gz

# Restore backup
psql -h localhost -U myapp_user -d myapp_db < backup.sql

# Restore from compressed backup
gunzip -c backup.sql.gz | psql -h localhost -U myapp_user -d myapp_db
```

### MySQL Backup

```bash
# Create backup
mysqldump -u myapp_user -p myapp_db > backup.sql

# Restore backup
mysql -u myapp_user -p myapp_db < backup.sql
```

### MongoDB Backup

```bash
# Create backup
mongodump --db myapp_db --out /backup/

# Restore backup
mongorestore --db myapp_db /backup/myapp_db/
```

## Performance Optimization

### Indexing Strategies

```sql
-- PostgreSQL indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_products_category ON products(category);

-- Composite index
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);

-- Partial index
CREATE INDEX idx_active_users ON users(id) WHERE active = true;
```

### Query Optimization

```sql
-- Use EXPLAIN to analyze queries
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'user@example.com';

-- Optimize with proper WHERE clauses
SELECT id, name FROM users WHERE active = true LIMIT 10;

-- Use JOIN instead of subqueries when possible
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;
```

## Security Best Practices

1. **Use environment variables for credentials**
2. **Enable SSL/TLS in production**
3. **Implement connection pooling**
4. **Regular backups and testing**
5. **Use least privilege principle**
6. **Monitor database performance**
7. **Keep database software updated**
8. **Use prepared statements to prevent SQL injection**

## Monitoring and Maintenance

### Health Check Query

```javascript
const healthCheck = async () => {
  try {
    const result = await pool.query('SELECT 1');
    return { status: 'healthy', timestamp: new Date() };
  } catch (error) {
    return { status: 'unhealthy', error: error.message, timestamp: new Date() };
  }
};
```

Remember to always test your database setup in a development environment before deploying to production!
