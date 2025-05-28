
# Oracle Performance Tuning

*Advanced guide for optimizing Oracle Database performance*

## Overview

This document provides comprehensive strategies for Oracle Database performance tuning, covering SQL optimization, memory management, I/O tuning, and monitoring techniques.

## SQL Performance Tuning

### Explain Plan Analysis

```sql
-- Generate execution plan
EXPLAIN PLAN FOR
SELECT e.employee_id, e.first_name, d.department_name
FROM employees e
JOIN departments d ON e.department_id = d.department_id
WHERE e.salary > 50000;

-- Display execution plan
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);
```

### Index Optimization

```sql
-- Create composite index
CREATE INDEX idx_emp_salary_dept 
ON employees (department_id, salary);

-- Monitor index usage
SELECT index_name, table_name, num_rows, distinct_keys, clustering_factor
FROM user_indexes
WHERE table_name = 'EMPLOYEES';
```

### Query Hints

```sql
-- Use index hint
SELECT /*+ INDEX(e, idx_emp_salary_dept) */
  employee_id, first_name, salary
FROM employees e
WHERE department_id = 10
AND salary > 50000;

-- Use parallel hint
SELECT /*+ PARALLEL(e, 4) */
  COUNT(*), AVG(salary)
FROM employees e;
```

## Memory Management

### SGA Configuration

```sql
-- Check current SGA settings
SELECT component, current_size/1024/1024 as size_mb
FROM v$sga_dynamic_components;

-- Modify SGA parameters
ALTER SYSTEM SET sga_target = 2G SCOPE=SPFILE;
ALTER SYSTEM SET shared_pool_size = 512M SCOPE=SPFILE;
ALTER SYSTEM SET buffer_cache_size = 1G SCOPE=SPFILE;
```

### PGA Optimization

```sql
-- Set PGA parameters
ALTER SYSTEM SET pga_aggregate_target = 1G;
ALTER SYSTEM SET workarea_size_policy = AUTO;

-- Monitor PGA usage
SELECT name, value/1024/1024 as value_mb
FROM v$pgastat
WHERE name IN ('total PGA allocated', 'total PGA used for auto workareas');
```

## I/O Performance Tuning

### Tablespace Management

```sql
-- Create tablespace with multiple datafiles
CREATE TABLESPACE high_performance_ts
DATAFILE '/u01/oradata/orcl/hp01.dbf' SIZE 1G,
         '/u02/oradata/orcl/hp02.dbf' SIZE 1G,
         '/u03/oradata/orcl/hp03.dbf' SIZE 1G
EXTENT MANAGEMENT LOCAL
SEGMENT SPACE MANAGEMENT AUTO;
```

### Partitioning Strategy

```sql
-- Range partitioning by date
CREATE TABLE sales_data (
  sale_id NUMBER,
  sale_date DATE,
  amount NUMBER(10,2)
)
PARTITION BY RANGE (sale_date) (
  PARTITION p_2023_q1 VALUES LESS THAN (DATE '2023-04-01'),
  PARTITION p_2023_q2 VALUES LESS THAN (DATE '2023-07-01'),
  PARTITION p_2023_q3 VALUES LESS THAN (DATE '2023-10-01'),
  PARTITION p_2023_q4 VALUES LESS THAN (DATE '2024-01-01')
);
```

## Database Configuration

### Initialization Parameters

```sql
-- Key performance parameters
ALTER SYSTEM SET db_cache_size = 1G;
ALTER SYSTEM SET log_buffer = 32M;
ALTER SYSTEM SET processes = 500;
ALTER SYSTEM SET sessions = 600;
ALTER SYSTEM SET parallel_max_servers = 20;
```

### Redo Log Configuration

```sql
-- Add redo log groups for better performance
ALTER DATABASE ADD LOGFILE GROUP 4 
'/u01/oradata/orcl/redo04.log' SIZE 200M;

ALTER DATABASE ADD LOGFILE GROUP 5 
'/u02/oradata/orcl/redo05.log' SIZE 200M;
```

## Performance Monitoring

### AWR Reports

```sql
-- Generate AWR report
@$ORACLE_HOME/rdbms/admin/awrrpt.sql

-- Create AWR snapshot
EXEC DBMS_WORKLOAD_REPOSITORY.CREATE_SNAPSHOT();
```

### Real-Time Monitoring

```sql
-- Active session history
SELECT sql_id, event, count(*)
FROM v$active_session_history
WHERE sample_time > SYSDATE - 1/24
GROUP BY sql_id, event
ORDER BY count(*) DESC;

-- Top SQL by CPU
SELECT sql_id, cpu_time/1000000 as cpu_seconds, executions
FROM v$sql
WHERE cpu_time > 1000000
ORDER BY cpu_time DESC;
```

### System Statistics

```sql
-- Wait events
SELECT event, total_waits, time_waited/100 as time_waited_seconds
FROM v$system_event
WHERE total_waits > 0
ORDER BY time_waited DESC;

-- I/O statistics
SELECT name, phyrds, phywrts, phyblkrd, phyblkwrt
FROM v$filestat f, v$datafile d
WHERE f.file# = d.file#;
```

## Performance Tuning Checklist

### SQL Level
- [x] Review execution plans for full table scans
- [x] Ensure proper indexing strategy
- [x] Optimize join operations
- [x] Use bind variables to reduce parsing

### Database Level
- [x] Configure appropriate SGA and PGA sizes
- [x] Optimize redo log configuration
- [x] Implement proper partitioning
- [x] Monitor wait events

### System Level
- [x] Ensure adequate I/O subsystem performance
- [x] Configure appropriate RAID levels
- [x] Monitor CPU and memory utilization
- [x] Implement proper backup strategies

## Common Performance Issues

| Issue | Symptoms | Solution |
|-------|----------|----------|
| Buffer Cache Hit Ratio Low | High physical reads | Increase db_cache_size |
| High CPU Usage | CPU wait events | Optimize SQL, add indexes |
| I/O Bottleneck | High I/O wait times | Distribute files across disks |
| Memory Paging | High swap usage | Increase physical memory |

> ⚠️ **Warning**: Always test performance changes in a development environment first

> 💡 **Pro Tip**: Use Oracle Enterprise Manager for comprehensive performance monitoring

## Related Documents

- [Oracle Database Setup](/docs/oracle-setup)
- [Oracle Backup Strategies](/docs/oracle-backup)
- [AWS RDS Configuration](/docs/aws-rds-configuration)

---

*Last updated: ${new Date().toLocaleDateString()}*
