
# Oracle Database Setup

*Complete guide for setting up Oracle Database*

## Overview

This document provides comprehensive instructions for setting up Oracle Database in various environments, covering installation, configuration, and initial setup procedures.

## Prerequisites

- **System Requirements**: Minimum 8GB RAM, 50GB disk space
- **Operating System**: Oracle Linux, Red Hat Enterprise Linux, or Windows Server
- **Network Configuration**: Proper hostname resolution and port availability

## Installation Steps

### 1. Download Oracle Database Software

```bash
# Download from Oracle website or use wget (with proper credentials)
wget https://download.oracle.com/otn/linux/oracle19c/190000/LINUX.X64_193000_db_home.zip
```

### 2. Pre-Installation Tasks

```bash
# Create Oracle user and groups
sudo groupadd oinstall
sudo groupadd dba
sudo useradd -g oinstall -G dba oracle

# Set kernel parameters
echo "fs.file-max = 6815744" >> /etc/sysctl.conf
echo "net.ipv4.ip_local_port_range = 9000 65500" >> /etc/sysctl.conf
sysctl -p
```

### 3. Database Installation

```bash
# Extract installation files
unzip LINUX.X64_193000_db_home.zip -d $ORACLE_HOME

# Run installer
cd $ORACLE_HOME
./runInstaller -silent -responseFile /path/to/db_install.rsp
```

## Configuration

### Environment Variables

```bash
# Add to .bash_profile
export ORACLE_BASE=/u01/app/oracle
export ORACLE_HOME=$ORACLE_BASE/product/19.0.0/dbhome_1
export ORACLE_SID=ORCL
export PATH=$ORACLE_HOME/bin:$PATH
export LD_LIBRARY_PATH=$ORACLE_HOME/lib:$LD_LIBRARY_PATH
```

### Database Creation

```sql
-- Create database using DBCA or manual scripts
CREATE DATABASE ORCL
  USER SYS IDENTIFIED BY password
  USER SYSTEM IDENTIFIED BY password
  LOGFILE GROUP 1 ('/u01/oradata/orcl/redo01.log') SIZE 100M,
          GROUP 2 ('/u01/oradata/orcl/redo02.log') SIZE 100M,
          GROUP 3 ('/u01/oradata/orcl/redo03.log') SIZE 100M
  MAXLOGFILES 3
  MAXLOGMEMBERS 3
  DATAFILE '/u01/oradata/orcl/system01.dbf' SIZE 700M REUSE
  EXTENT MANAGEMENT LOCAL
  SYSAUX DATAFILE '/u01/oradata/orcl/sysaux01.dbf' SIZE 550M REUSE
  CHARACTER SET AL32UTF8
  NATIONAL CHARACTER SET AL16UTF16;
```

## Post-Installation Tasks

### 1. Start Database Services

```bash
# Start listener
lsnrctl start

# Start database
sqlplus / as sysdba
SQL> STARTUP;
```

### 2. Create Additional Tablespaces

```sql
-- Create user tablespace
CREATE TABLESPACE users
  DATAFILE '/u01/oradata/orcl/users01.dbf' SIZE 100M
  AUTOEXTEND ON NEXT 10M MAXSIZE UNLIMITED;

-- Create temporary tablespace
CREATE TEMPORARY TABLESPACE temp
  TEMPFILE '/u01/oradata/orcl/temp01.dbf' SIZE 100M
  AUTOEXTEND ON NEXT 10M MAXSIZE UNLIMITED;
```

## Verification

### Check Database Status

```sql
-- Connect and verify
sqlplus / as sysdba
SQL> SELECT name, open_mode FROM v$database;
SQL> SELECT instance_name, status FROM v$instance;
```

### Test Connectivity

```bash
# Test TNS connectivity
tnsping ORCL

# Test SQL*Plus connection
sqlplus system/password@ORCL
```

## Common Issues and Solutions

> ⚠️ **Issue**: ORA-00845: MEMORY_TARGET not supported on this system
> 
> **Solution**: Increase /dev/shm size or disable automatic memory management

> ❌ **Issue**: TNS-12541: TNS:no listener
> 
> **Solution**: Start the listener service using `lsnrctl start`

## Related Documents

- [Oracle Backup Strategies](/docs/oracle-backup)
- [Oracle Performance Tuning](/docs/oracle-performance)
- [Quick Start Guide](/docs/quick-start)

---

*Last updated: ${new Date().toLocaleDateString()}*
