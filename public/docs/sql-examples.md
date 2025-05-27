
# SQL Query Examples

A comprehensive collection of SQL queries for common database operations.

## Basic Queries

### SELECT Queries

```sql
-- Basic SELECT
SELECT * FROM users;

-- SELECT with specific columns
SELECT id, name, email FROM users;

-- SELECT with WHERE clause
SELECT * FROM users WHERE age > 18;
```

### Filtering Data

```sql
-- Multiple conditions
SELECT * FROM orders 
WHERE status = 'completed' 
  AND created_at >= '2024-01-01';

-- Using IN operator
SELECT * FROM products 
WHERE category IN ('electronics', 'books', 'clothing');

-- Pattern matching
SELECT * FROM users 
WHERE email LIKE '%@company.com';
```

## Advanced Queries

### Joins

```sql
-- INNER JOIN
SELECT u.name, o.order_id, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- LEFT JOIN
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;
```

### Aggregations

```sql
-- COUNT and GROUP BY
SELECT category, COUNT(*) as product_count
FROM products
GROUP BY category;

-- SUM and AVG
SELECT 
  category,
  SUM(price) as total_value,
  AVG(price) as average_price
FROM products
GROUP BY category;
```

### Window Functions

```sql
-- ROW_NUMBER
SELECT 
  name,
  salary,
  ROW_NUMBER() OVER (ORDER BY salary DESC) as rank
FROM employees;

-- RANK with PARTITION
SELECT 
  department,
  name,
  salary,
  RANK() OVER (PARTITION BY department ORDER BY salary DESC) as dept_rank
FROM employees;
```

## Database Administration

### Index Management

```sql
-- Create index
CREATE INDEX idx_user_email ON users(email);

-- Create composite index
CREATE INDEX idx_order_user_date ON orders(user_id, created_at);

-- Drop index
DROP INDEX idx_user_email;
```

### Table Operations

```sql
-- Create table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2),
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Alter table
ALTER TABLE products 
ADD COLUMN description TEXT;

-- Add foreign key
ALTER TABLE orders 
ADD CONSTRAINT fk_user_id 
FOREIGN KEY (user_id) REFERENCES users(id);
```

## Performance Optimization

### Query Optimization

```sql
-- Use EXPLAIN to analyze query performance
EXPLAIN ANALYZE 
SELECT * FROM orders o
JOIN users u ON o.user_id = u.id
WHERE o.created_at >= '2024-01-01';

-- Optimize with proper indexing
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_orders_user_id ON orders(user_id);
```

### Common Performance Tips

1. **Use appropriate indexes**
2. **Avoid SELECT \***
3. **Use LIMIT for large datasets**
4. **Optimize JOIN conditions**
5. **Use WHERE clauses effectively**

## Data Analysis Queries

### Time-based Analysis

```sql
-- Daily sales report
SELECT 
  DATE(created_at) as sale_date,
  COUNT(*) as orders_count,
  SUM(total) as daily_revenue
FROM orders
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY sale_date DESC;
```

### User Behavior Analysis

```sql
-- User activity summary
SELECT 
  u.id,
  u.name,
  COUNT(o.id) as total_orders,
  SUM(o.total) as total_spent,
  MAX(o.created_at) as last_order_date
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name
ORDER BY total_spent DESC;
```

## Best Practices

- Always use parameterized queries to prevent SQL injection
- Use transactions for data consistency
- Index frequently queried columns
- Avoid unnecessary JOINs
- Use appropriate data types
- Regular database maintenance and optimization

Remember to backup your database before running any DDL commands!
