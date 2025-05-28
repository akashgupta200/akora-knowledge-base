
# AWS RDS Configuration

*Comprehensive guide for setting up and managing Amazon RDS databases*

## Overview

Amazon RDS (Relational Database Service) simplifies database administration by handling routine tasks like hardware provisioning, database setup, patching, and backups.

## Supported Database Engines

| Engine | Versions | Use Cases |
|--------|----------|-----------|
| MySQL | 5.7, 8.0 | Web applications, e-commerce |
| PostgreSQL | 11, 12, 13, 14 | Analytics, geospatial applications |
| MariaDB | 10.3, 10.4, 10.5, 10.6 | Drop-in MySQL replacement |
| Oracle | 12c, 19c | Enterprise applications |
| SQL Server | 2016, 2017, 2019 | Microsoft stack applications |
| Aurora | MySQL, PostgreSQL | High-performance applications |

## Creating RDS Instance

### Using AWS Console

```bash
# Navigation steps:
# 1. AWS Console > RDS > Create database
# 2. Choose creation method: Standard create
# 3. Select engine type and version
# 4. Configure DB instance settings
```

### Using AWS CLI

```bash
# Create MySQL RDS instance
aws rds create-db-instance \
    --db-instance-identifier mydb-instance \
    --db-instance-class db.t3.micro \
    --engine mysql \
    --engine-version 8.0.32 \
    --master-username admin \
    --master-user-password MySecurePassword123 \
    --allocated-storage 20 \
    --storage-type gp2 \
    --vpc-security-group-ids sg-12345678 \
    --db-subnet-group-name my-db-subnet-group \
    --backup-retention-period 7 \
    --multi-az \
    --storage-encrypted \
    --enable-performance-insights
```

## Database Configuration

### Parameter Groups

```bash
# Create custom parameter group
aws rds create-db-parameter-group \
    --db-parameter-group-name mysql-custom-params \
    --db-parameter-group-family mysql8.0 \
    --description "Custom MySQL parameters"

# Modify parameters
aws rds modify-db-parameter-group \
    --db-parameter-group-name mysql-custom-params \
    --parameters "ParameterName=innodb_buffer_pool_size,ParameterValue={DBInstanceClassMemory*3/4},ApplyMethod=pending-reboot"
```

### Option Groups

```bash
# Create option group for Oracle
aws rds create-option-group \
    --option-group-name oracle-ssl \
    --engine-name oracle-ee \
    --major-engine-version 19 \
    --option-group-description "Oracle SSL options"

# Add SSL option
aws rds add-option-to-option-group \
    --option-group-name oracle-ssl \
    --options OptionName=SSL
```

## Security Configuration

### VPC and Subnet Groups

```bash
# Create DB subnet group
aws rds create-db-subnet-group \
    --db-subnet-group-name my-db-subnet-group \
    --db-subnet-group-description "Subnet group for RDS" \
    --subnet-ids subnet-12345678 subnet-87654321

# Create security group
aws ec2 create-security-group \
    --group-name rds-security-group \
    --description "Security group for RDS instances"

# Allow MySQL access from application servers
aws ec2 authorize-security-group-ingress \
    --group-id sg-12345678 \
    --protocol tcp \
    --port 3306 \
    --source-group sg-87654321
```

### Encryption

```bash
# Create encrypted RDS instance
aws rds create-db-instance \
    --db-instance-identifier encrypted-db \
    --storage-encrypted \
    --kms-key-id alias/aws/rds \
    # ... other parameters
```

## Database Administration

### Connection Examples

#### MySQL Connection

```bash
# Using mysql client
mysql -h mydb-instance.cluster-xyz.us-east-1.rds.amazonaws.com \
      -P 3306 \
      -u admin \
      -p

# Using SSL
mysql -h mydb-instance.cluster-xyz.us-east-1.rds.amazonaws.com \
      -P 3306 \
      -u admin \
      -p \
      --ssl-ca=rds-ca-2019-root.pem \
      --ssl-verify-server-cert
```

#### PostgreSQL Connection

```bash
# Using psql
psql -h mydb-instance.cluster-xyz.us-east-1.rds.amazonaws.com \
     -p 5432 \
     -U admin \
     -d mydb

# Connection string
postgresql://admin:password@mydb-instance.cluster-xyz.us-east-1.rds.amazonaws.com:5432/mydb?sslmode=require
```

### Database Maintenance

```sql
-- MySQL maintenance queries
SHOW PROCESSLIST;
SHOW ENGINE INNODB STATUS;
ANALYZE TABLE my_table;
OPTIMIZE TABLE my_table;

-- PostgreSQL maintenance queries
SELECT * FROM pg_stat_activity;
VACUUM ANALYZE my_table;
REINDEX TABLE my_table;
```

## Backup and Recovery

### Automated Backups

```bash
# Modify backup retention period
aws rds modify-db-instance \
    --db-instance-identifier mydb-instance \
    --backup-retention-period 14 \
    --preferred-backup-window "03:00-04:00" \
    --apply-immediately
```

### Manual Snapshots

```bash
# Create manual snapshot
aws rds create-db-snapshot \
    --db-instance-identifier mydb-instance \
    --db-snapshot-identifier mydb-manual-snapshot-$(date +%Y%m%d)

# Restore from snapshot
aws rds restore-db-instance-from-db-snapshot \
    --db-instance-identifier restored-db \
    --db-snapshot-identifier mydb-manual-snapshot-20231201
```

### Point-in-Time Recovery

```bash
# Restore to specific time
aws rds restore-db-instance-to-point-in-time \
    --source-db-instance-identifier mydb-instance \
    --target-db-instance-identifier mydb-restored \
    --restore-time 2023-12-01T12:00:00.000Z
```

## Performance Optimization

### Performance Insights

```bash
# Enable Performance Insights
aws rds modify-db-instance \
    --db-instance-identifier mydb-instance \
    --enable-performance-insights \
    --performance-insights-retention-period 7
```

### Read Replicas

```bash
# Create read replica
aws rds create-db-instance-read-replica \
    --db-instance-identifier mydb-read-replica \
    --source-db-instance-identifier mydb-instance \
    --db-instance-class db.t3.micro
```

### Connection Pooling

```python
# Python example with connection pooling
import sqlalchemy
from sqlalchemy.pool import QueuePool

engine = sqlalchemy.create_engine(
    "mysql+pymysql://admin:password@mydb-instance.cluster-xyz.us-east-1.rds.amazonaws.com:3306/mydb",
    poolclass=QueuePool,
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True
)
```

## Monitoring and Alerting

### CloudWatch Metrics

```bash
# Key RDS metrics to monitor:
# - CPUUtilization
# - DatabaseConnections
# - FreeableMemory
# - ReadLatency / WriteLatency
# - ReadIOPS / WriteIOPS
```

### CloudWatch Alarms

```bash
# Create CPU utilization alarm
aws cloudwatch put-metric-alarm \
    --alarm-name "RDS-High-CPU" \
    --alarm-description "RDS CPU utilization" \
    --metric-name CPUUtilization \
    --namespace AWS/RDS \
    --statistic Average \
    --period 300 \
    --threshold 80 \
    --comparison-operator GreaterThanThreshold \
    --dimensions Name=DBInstanceIdentifier,Value=mydb-instance \
    --evaluation-periods 2
```

## High Availability

### Multi-AZ Deployment

```bash
# Enable Multi-AZ
aws rds modify-db-instance \
    --db-instance-identifier mydb-instance \
    --multi-az \
    --apply-immediately
```

### Failover Testing

```bash
# Force failover for testing
aws rds reboot-db-instance \
    --db-instance-identifier mydb-instance \
    --force-failover
```

## Cost Optimization

### Reserved Instances

```bash
# Purchase reserved instance
aws rds purchase-reserved-db-instances-offering \
    --reserved-db-instances-offering-id 8ba30be1-b9ec-447d-9f19-7b0d5EXAMPLE \
    --reserved-db-instance-id myreserveddb
```

### Instance Sizing

| Workload Type | Recommended Instance |
|---------------|---------------------|
| Development/Testing | db.t3.micro, db.t3.small |
| Small Production | db.t3.medium, db.m5.large |
| Medium Production | db.m5.xlarge, db.r5.large |
| Large Production | db.m5.2xlarge, db.r5.xlarge |

## Best Practices

> 💡 **Security**: Always use VPC and security groups to isolate your databases

> 📝 **Monitoring**: Set up CloudWatch alarms for key metrics

> ✅ **Backup**: Test your backup and restore procedures regularly

> ⚠️ **Performance**: Use read replicas to offload read traffic from primary instance

## Related Documents

- [AWS EC2 Setup Guide](/docs/aws-ec2-setup)
- [AWS S3 Management](/docs/aws-s3-management)
- [Postgres Installation Guide](/docs/postgres-installation)

---

*Last updated: ${new Date().toLocaleDateString()}*
