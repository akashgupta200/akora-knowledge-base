
# Postgres Installation Guide

*Complete guide for installing and configuring PostgreSQL*

## Overview

This document provides comprehensive instructions for installing PostgreSQL on various operating systems and initial configuration steps.

## Installation Methods

### Ubuntu/Debian

```bash
# Update package list
sudo apt update

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Install specific version
sudo apt install postgresql-14 postgresql-contrib-14
```

### CentOS/RHEL/Amazon Linux

```bash
# Install PostgreSQL repository
sudo yum install -y https://download.postgresql.org/pub/repos/yum/reporpms/EL-7-x86_64/pgdg-redhat-repo-latest.noarch.rpm

# Install PostgreSQL 14
sudo yum install -y postgresql14-server postgresql14-contrib

# Initialize database
sudo /usr/pgsql-14/bin/postgresql-14-setup initdb

# Enable and start service
sudo systemctl enable postgresql-14
sudo systemctl start postgresql-14
```

### Docker Installation

```bash
# Pull PostgreSQL image
docker pull postgres:14

# Run PostgreSQL container
docker run --name postgres-db \
  -e POSTGRES_DB=mydb \
  -e POSTGRES_USER=myuser \
  -e POSTGRES_PASSWORD=mypassword \
  -p 5432:5432 \
  -v postgres_data:/var/lib/postgresql/data \
  -d postgres:14
```

### From Source

```bash
# Install dependencies
sudo apt install -y build-essential zlib1g-dev libreadline-dev libssl-dev

# Download and compile
wget https://ftp.postgresql.org/pub/source/v14.10/postgresql-14.10.tar.gz
tar -xzf postgresql-14.10.tar.gz
cd postgresql-14.10

./configure --prefix=/usr/local/pgsql --with-openssl
make
sudo make install
```

## Initial Configuration

### User Setup

```bash
# Switch to postgres user
sudo -i -u postgres

# Create database user
createuser --interactive --pwprompt myuser

# Create database
createdb -O myuser mydb
```

### Authentication Configuration

```bash
# Edit pg_hba.conf
sudo nano /etc/postgresql/14/main/pg_hba.conf

# Common authentication methods:
# local   all             all                                     peer
# host    all             all             127.0.0.1/32            md5
# host    all             all             ::1/128                 md5
# host    all             all             0.0.0.0/0               md5  # Allow all (not recommended for production)
```

### PostgreSQL Configuration

```bash
# Edit postgresql.conf
sudo nano /etc/postgresql/14/main/postgresql.conf

# Key settings to modify:
listen_addresses = '*'                  # Listen on all interfaces
port = 5432                            # Default port
max_connections = 100                   # Maximum concurrent connections
shared_buffers = 128MB                 # Memory for caching
effective_cache_size = 4GB             # Total memory available
work_mem = 4MB                         # Memory for operations
maintenance_work_mem = 64MB            # Memory for maintenance operations
```

## Database Administration

### Basic Commands

```sql
-- Connect to PostgreSQL
psql -U myuser -d mydb -h localhost

-- List databases
\l

-- Connect to database
\c mydb

-- List tables
\dt

-- Describe table
\d table_name

-- List users
\du

-- Quit
\q
```

### User and Permission Management

```sql
-- Create user
CREATE USER newuser WITH PASSWORD 'password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE mydb TO newuser;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO newuser;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO newuser;

-- Create read-only user
CREATE USER readonly WITH PASSWORD 'readonlypass';
GRANT CONNECT ON DATABASE mydb TO readonly;
GRANT USAGE ON SCHEMA public TO readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly;

-- Alter user password
ALTER USER myuser WITH PASSWORD 'newpassword';
```

### Database Operations

```sql
-- Create database
CREATE DATABASE newdb OWNER myuser;

-- Drop database
DROP DATABASE olddb;

-- Create schema
CREATE SCHEMA myschema;

-- Set default schema
SET search_path TO myschema, public;
```

## Performance Tuning

### Memory Configuration

```bash
# Calculate shared_buffers (25% of RAM)
shared_buffers = 2GB                   # For 8GB RAM system

# Calculate effective_cache_size (75% of RAM)
effective_cache_size = 6GB             # For 8GB RAM system

# Work memory settings
work_mem = 4MB                         # Per operation
maintenance_work_mem = 256MB           # For maintenance operations
```

### Connection Tuning

```bash
# Connection settings
max_connections = 200                   # Adjust based on workload
superuser_reserved_connections = 3      # Reserved for superusers

# Connection pooling with pgbouncer
sudo apt install pgbouncer

# Configure pgbouncer
sudo nano /etc/pgbouncer/pgbouncer.ini
```

### Query Optimization

```sql
-- Enable query logging
log_statement = 'all'
log_min_duration_statement = 1000      # Log queries taking > 1 second

-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'user@example.com';

-- Update table statistics
ANALYZE users;

-- Vacuum tables
VACUUM ANALYZE users;
```

## Backup and Recovery

### pg_dump Backups

```bash
# Backup single database
pg_dump -U myuser -h localhost mydb > mydb_backup.sql

# Backup with compression
pg_dump -U myuser -h localhost -Fc mydb > mydb_backup.dump

# Backup all databases
pg_dumpall -U postgres > all_databases.sql

# Backup specific tables
pg_dump -U myuser -h localhost -t users -t orders mydb > tables_backup.sql
```

### Restore Operations

```bash
# Restore from SQL dump
psql -U myuser -h localhost mydb < mydb_backup.sql

# Restore from custom format
pg_restore -U myuser -h localhost -d mydb mydb_backup.dump

# Restore all databases
psql -U postgres < all_databases.sql
```

### Point-in-Time Recovery

```bash
# Enable WAL archiving in postgresql.conf
wal_level = replica
archive_mode = on
archive_command = 'cp %p /var/lib/postgresql/archives/%f'

# Base backup
pg_basebackup -U postgres -D /backup/base -Ft -z -P

# Recovery configuration
# Create recovery.conf in data directory
restore_command = 'cp /var/lib/postgresql/archives/%f %p'
recovery_target_time = '2023-12-01 12:00:00'
```

## Monitoring and Maintenance

### System Catalogs

```sql
-- Check database sizes
SELECT 
    datname,
    pg_size_pretty(pg_database_size(datname)) as size
FROM pg_database;

-- Check table sizes
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Check active connections
SELECT 
    datname,
    count(*) as connections
FROM pg_stat_activity
GROUP BY datname;
```

### Log Analysis

```bash
# Enable logging in postgresql.conf
logging_collector = on
log_directory = 'pg_log'
log_filename = 'postgresql-%Y-%m-%d_%H%M%S.log'
log_statement = 'all'
log_line_prefix = '%t [%p]: [%l-1] user=%u,db=%d '

# Analyze logs
tail -f /var/log/postgresql/postgresql-14-main.log
grep "ERROR" /var/log/postgresql/postgresql-14-main.log
```

### Maintenance Tasks

```sql
-- Regular maintenance script
DO $$
DECLARE
    r RECORD;
BEGIN
    -- Vacuum and analyze all tables
    FOR r IN SELECT schemaname, tablename FROM pg_tables WHERE schemaname = 'public'
    LOOP
        EXECUTE 'VACUUM ANALYZE ' || quote_ident(r.schemaname) || '.' || quote_ident(r.tablename);
    END LOOP;
END $$;

-- Reindex database
REINDEX DATABASE mydb;
```

## Security Configuration

### SSL Configuration

```bash
# Generate SSL certificates
sudo -u postgres openssl req -new -x509 -days 365 -nodes -text \
    -out /var/lib/postgresql/14/main/server.crt \
    -keyout /var/lib/postgresql/14/main/server.key

# Set permissions
sudo chmod 600 /var/lib/postgresql/14/main/server.key
sudo chown postgres:postgres /var/lib/postgresql/14/main/server.*

# Enable SSL in postgresql.conf
ssl = on
ssl_cert_file = 'server.crt'
ssl_key_file = 'server.key'
```

### Connection Security

```bash
# Configure pg_hba.conf for SSL
hostssl all all 0.0.0.0/0 md5

# Connect with SSL
psql "host=localhost dbname=mydb user=myuser sslmode=require"
```

## Best Practices

> 💡 **Performance**: Regularly run VACUUM and ANALYZE on your tables

> 📝 **Security**: Always use strong passwords and enable SSL for remote connections

> ✅ **Backup**: Implement automated backup procedures with testing

> ⚠️ **Monitoring**: Monitor connection counts and query performance regularly

| Configuration | Development | Production |
|---------------|-------------|------------|
| shared_buffers | 256MB | 25% of RAM |
| work_mem | 4MB | 4-8MB |
| max_connections | 50 | 100-200 |
| log_statement | 'none' | 'ddl' or 'mod' |

## Related Documents

- [Postgres Backup](/docs/postgres-backup)
- [Postgres Restore](/docs/postgres-restore)
- [AWS RDS Configuration](/docs/aws-rds-configuration)

---

*Last updated: ${new Date().toLocaleDateString()}*
