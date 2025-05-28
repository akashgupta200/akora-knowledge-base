
# AWS EC2 Setup Guide

*Complete guide for setting up and configuring AWS EC2 instances*

## Overview

This document provides step-by-step instructions for launching, configuring, and managing Amazon EC2 instances for various workloads.

## Prerequisites

- AWS Account with appropriate permissions
- AWS CLI installed and configured
- Basic understanding of cloud computing concepts

## Launch EC2 Instance

### Using AWS Console

1. **Navigate to EC2 Dashboard**
   - Open AWS Management Console
   - Search for "EC2" and select the service

2. **Launch Instance Wizard**
   ```bash
   # Click "Launch Instance" button
   # Follow the configuration steps below
   ```

### Instance Configuration

#### Step 1: Choose AMI

```bash
# Popular AMI options:
# - Amazon Linux 2 AMI (HVM) - SSD Volume Type
# - Ubuntu Server 20.04 LTS (HVM) - SSD Volume Type
# - Windows Server 2019 Base - ami-0abcdef1234567890
# - Red Hat Enterprise Linux 8 (HVM) - SSD Volume Type
```

#### Step 2: Choose Instance Type

| Instance Type | vCPUs | Memory | Network | Use Case |
|---------------|-------|---------|---------|----------|
| t3.micro | 2 | 1 GB | Up to 5 Gbps | Testing, low traffic |
| t3.small | 2 | 2 GB | Up to 5 Gbps | Small applications |
| t3.medium | 2 | 4 GB | Up to 5 Gbps | Small to medium workloads |
| m5.large | 2 | 8 GB | Up to 10 Gbps | Balanced workloads |
| c5.large | 2 | 4 GB | Up to 10 Gbps | Compute intensive |

#### Step 3: Configure Instance Details

```json
{
  "Number of instances": 1,
  "Network": "vpc-12345678",
  "Subnet": "subnet-12345678",
  "Auto-assign Public IP": "Enable",
  "IAM role": "EC2-Role",
  "Monitoring": "Enable CloudWatch detailed monitoring",
  "Tenancy": "Shared"
}
```

### Using AWS CLI

```bash
# Launch instance using CLI
aws ec2 run-instances \
    --image-id ami-0abcdef1234567890 \
    --count 1 \
    --instance-type t3.micro \
    --key-name MyKeyPair \
    --security-group-ids sg-12345678 \
    --subnet-id subnet-12345678 \
    --associate-public-ip-address \
    --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=MyWebServer}]'
```

## Security Configuration

### Security Groups

```bash
# Create security group
aws ec2 create-security-group \
    --group-name MyWebServerSG \
    --description "Security group for web server"

# Add inbound rules
aws ec2 authorize-security-group-ingress \
    --group-id sg-12345678 \
    --protocol tcp \
    --port 22 \
    --cidr 0.0.0.0/0

aws ec2 authorize-security-group-ingress \
    --group-id sg-12345678 \
    --protocol tcp \
    --port 80 \
    --cidr 0.0.0.0/0

aws ec2 authorize-security-group-ingress \
    --group-id sg-12345678 \
    --protocol tcp \
    --port 443 \
    --cidr 0.0.0.0/0
```

### Key Pairs

```bash
# Create key pair
aws ec2 create-key-pair \
    --key-name MyKeyPair \
    --query 'KeyMaterial' \
    --output text > MyKeyPair.pem

# Set proper permissions
chmod 400 MyKeyPair.pem
```

## Initial Server Setup

### Connect to Instance

```bash
# SSH connection (Linux/Mac)
ssh -i MyKeyPair.pem ec2-user@ec2-xx-xx-xx-xx.compute-1.amazonaws.com

# Using AWS CLI
aws ec2-instance-connect ssh --instance-id i-1234567890abcdef0
```

### System Updates

```bash
# Amazon Linux 2
sudo yum update -y

# Ubuntu
sudo apt update && sudo apt upgrade -y

# Install essential packages
sudo yum install -y htop curl wget git vim
```

### Configure Time Zone

```bash
# Set timezone
sudo timedatectl set-timezone America/New_York

# Verify
timedatectl status
```

## Application Setup

### Install Web Server

#### Apache HTTP Server

```bash
# Amazon Linux 2
sudo yum install -y httpd
sudo systemctl start httpd
sudo systemctl enable httpd

# Ubuntu
sudo apt install -y apache2
sudo systemctl start apache2
sudo systemctl enable apache2
```

#### Nginx

```bash
# Amazon Linux 2
sudo amazon-linux-extras install nginx1
sudo systemctl start nginx
sudo systemctl enable nginx

# Ubuntu
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Install Node.js

```bash
# Using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### Install Docker

```bash
# Amazon Linux 2
sudo yum install -y docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -a -G docker ec2-user

# Ubuntu
sudo apt update
sudo apt install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ubuntu
```

## Storage Configuration

### EBS Volume Management

```bash
# List attached volumes
lsblk

# Format new volume
sudo mkfs -t ext4 /dev/xvdf

# Create mount point
sudo mkdir /data

# Mount volume
sudo mount /dev/xvdf /data

# Add to fstab for persistent mounting
echo '/dev/xvdf /data ext4 defaults,nofail 0 2' | sudo tee -a /etc/fstab
```

### S3 Integration

```bash
# Install AWS CLI v2
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Configure AWS CLI
aws configure

# Sync with S3 bucket
aws s3 sync /local/path s3://my-bucket/path
```

## Monitoring and Maintenance

### CloudWatch Agent

```bash
# Download and install CloudWatch agent
wget https://s3.amazonaws.com/amazoncloudwatch-agent/amazon_linux/amd64/latest/amazon-cloudwatch-agent.rpm
sudo rpm -U ./amazon-cloudwatch-agent.rpm

# Configure agent
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-config-wizard
```

### System Monitoring

```bash
# Check system resources
htop
df -h
free -m

# Check running services
sudo systemctl status httpd
sudo systemctl status nginx
```

### Log Management

```bash
# View system logs
sudo journalctl -u httpd -f
sudo tail -f /var/log/messages

# Application logs
sudo tail -f /var/log/httpd/access_log
sudo tail -f /var/log/httpd/error_log
```

## Best Practices

> 💡 **Security**: Always use security groups to restrict access to necessary ports only

> 📝 **Monitoring**: Enable detailed CloudWatch monitoring for better insights

> ✅ **Backup**: Create AMI snapshots regularly for disaster recovery

### Cost Optimization

- Use appropriate instance types for your workload
- Implement auto-scaling for variable workloads
- Use Spot Instances for non-critical workloads
- Schedule instances to stop during off-hours

### Performance Optimization

- Choose the right instance type for your application
- Use Placement Groups for high-performance applications
- Implement load balancing for high availability
- Monitor CPU, memory, and network utilization

## Related Documents

- [AWS RDS Configuration](/docs/aws-rds-configuration)
- [AWS S3 Management](/docs/aws-s3-management)
- [Azure VM Deployment](/docs/azure-vm-deployment)

---

*Last updated: ${new Date().toLocaleDateString()}*
