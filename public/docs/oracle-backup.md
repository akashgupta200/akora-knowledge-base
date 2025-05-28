
# Oracle Backup Strategies

*Comprehensive guide for Oracle Database backup and recovery*

## Overview

This document covers various backup strategies for Oracle Database, including RMAN (Recovery Manager) backups, Data Pump exports, and cold backups.

## RMAN Backup Strategy

### Configure RMAN

```sql
-- Connect to RMAN
rman target /

-- Configure backup settings
CONFIGURE RETENTION POLICY TO REDUNDANCY 2;
CONFIGURE DEFAULT DEVICE TYPE TO DISK;
CONFIGURE BACKUP OPTIMIZATION ON;
CONFIGURE CONTROLFILE AUTOBACKUP ON;
```

### Full Database Backup

```sql
-- Full database backup
BACKUP DATABASE PLUS ARCHIVELOG;

-- Backup with compression
BACKUP AS COMPRESSED BACKUPSET DATABASE PLUS ARCHIVELOG;
```

### Incremental Backup Strategy

```sql
-- Level 0 backup (baseline)
BACKUP INCREMENTAL LEVEL 0 DATABASE;

-- Level 1 differential backup
BACKUP INCREMENTAL LEVEL 1 DATABASE;

-- Level 1 cumulative backup
BACKUP INCREMENTAL LEVEL 1 CUMULATIVE DATABASE;
```

## Data Pump Export

### Full Database Export

```bash
# Export entire database
expdp system/password@ORCL \
  FULL=Y \
  DIRECTORY=backup_dir \
  DUMPFILE=full_backup_%U.dmp \
  LOGFILE=full_backup.log \
  PARALLEL=4 \
  COMPRESSION=ALL
```

### Schema-Level Export

```bash
# Export specific schemas
expdp system/password@ORCL \
  SCHEMAS=HR,SALES \
  DIRECTORY=backup_dir \
  DUMPFILE=schema_backup.dmp \
  LOGFILE=schema_backup.log
```

### Table-Level Export

```bash
# Export specific tables
expdp hr/password@ORCL \
  TABLES=EMPLOYEES,DEPARTMENTS \
  DIRECTORY=backup_dir \
  DUMPFILE=table_backup.dmp \
  LOGFILE=table_backup.log
```

## Cold Backup (Offline)

### Steps for Cold Backup

```sql
-- 1. Shutdown database cleanly
SHUTDOWN IMMEDIATE;

-- 2. Copy all datafiles, control files, and redo logs
```

```bash
# Copy database files
cp -r /u01/oradata/orcl /backup/cold_backup/
cp /u01/app/oracle/product/19.0.0/dbhome_1/dbs/spfileORCL.ora /backup/cold_backup/
```

```sql
-- 3. Restart database
STARTUP;
```

## Backup Scheduling

### RMAN Script Example

```bash
#!/bin/bash
# rman_backup.sh

export ORACLE_SID=ORCL
export ORACLE_HOME=/u01/app/oracle/product/19.0.0/dbhome_1
export PATH=$ORACLE_HOME/bin:$PATH

rman target / << EOF
BACKUP DATABASE PLUS ARCHIVELOG DELETE INPUT;
DELETE OBSOLETE;
EXIT;
EOF
```

### Cron Job Setup

```bash
# Add to crontab for daily backup at 2 AM
0 2 * * * /scripts/rman_backup.sh > /logs/backup_$(date +\%Y\%m\%d).log 2>&1
```

## Monitoring and Validation

### Check Backup Status

```sql
-- List all backups
LIST BACKUP SUMMARY;

-- List backups by date
LIST BACKUP COMPLETED AFTER 'SYSDATE-7';

-- Check backup validation
VALIDATE BACKUPSET 1;
```

### Recovery Testing

```sql
-- Test restore (without actually restoring)
RESTORE DATABASE VALIDATE;
RESTORE TABLESPACE USERS VALIDATE;
```

## Best Practices

> 💡 **Tip**: Always test your backups by performing periodic recovery tests

> 📝 **Note**: Keep backup files on separate storage systems from production data

> ✅ **Success**: Implement both RMAN and Data Pump backups for comprehensive coverage

| Backup Type | Frequency | Retention | Location |
|-------------|-----------|-----------|----------|
| RMAN Full | Weekly | 4 weeks | Local + Remote |
| RMAN Incremental | Daily | 2 weeks | Local |
| Data Pump Export | Monthly | 6 months | Remote |
| Archive Logs | Continuous | 1 week | Local + Remote |

## Related Documents

- [Oracle Database Setup](/docs/oracle-setup)
- [Oracle Performance Tuning](/docs/oracle-performance)
- [Postgres Backup](/docs/postgres-backup)

---

*Last updated: ${new Date().toLocaleDateString()}*
