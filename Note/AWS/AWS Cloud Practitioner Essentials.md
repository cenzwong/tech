# AWS

# Compute in the Cloud
## AWS EC2
### Instance types
- General Purpose Instances
    - resource needs for compute, memory, and networking are roughly equivalent.
- Compute Optimized Instances
    - high-performance web servers, compute-intensive applications servers, and dedicated gaming servers.
    - batch processing workloads that require processing many transactions
- Memory Optimized Instances
    - real-time processing of a large amount of unstructured data
    - High Performance Databases
- Accelerated Computing Instances
    - hardware accelerators, or coprocessors,
- Storage Optimized Instances
    - distributed file systems, data warehousing applications, and high-frequency online transaction processing (OLTP) systems.

### Pricing
- On-Demand
    - short-term, irregular workloads that cannot be interrupted.
- Amazon EC2 Savings Plans
    - committing to a consistent amount of compute usage for a 1-year or 3-year term. 
- Reserved Instances
    - billing discount applied to the use of On-Demand Instances
- Spot Instances
    - workloads with flexible start and end times, or that can withstand interruptions.
- Dedicated Hosts
    - physical servers with Amazon EC2 instance capacity that is fully dedicated to your use. 

### Amazon EC2 Auto Scaling & Elastic Load Balancing

![](https://assets.skillbuilder.aws/files/a/w/aws_prod1_docebosaas_com/1657958400/C9khKeuFVAcm75zvzkQubw/tincan/31d9c0cca79c54bdceaf3e938fd424e97c98c7e8/assets/12wfvrLI1e79hjMb_f8VZ-ZFC2TOC7k5B.png)

![](https://assets.skillbuilder.aws/files/a/w/aws_prod1_docebosaas_com/1657958400/C9khKeuFVAcm75zvzkQubw/tincan/31d9c0cca79c54bdceaf3e938fd424e97c98c7e8/assets/3OO8icoc4ZvQE-x1_q_fQ0lM9jrHOGE2v.png)

## Messaging and Queuing
- Amazon Simple Notification Service (Amazon SNS)
    - publish/subscribe service
- Amazon Simple Queue Service (Amazon SQS)
    - an application sends messages into a queue. A user or service retrieves a message from the queue, processes it, and then deletes it from the queue.

## Serverless Computing
- AWS Lambda
- Amazon Elastic Container Service (Amazon ECS)
- Amazon Elastic Kubernetes Service (Amazon EKS)
- AWS Fargate
    - serverless compute engine for containers

# Global Infra and Reliability
- AWS Regions
- Availability Zones
    - A single data center or group of data centers within a Region
- Edge locations
    - a site that Amazon CloudFront uses to store cached copies of your content closer to your customers for faster delivery.

![](https://assets.skillbuilder.aws/files/a/w/aws_prod1_docebosaas_com/1657958400/C9khKeuFVAcm75zvzkQubw/tincan/31d9c0cca79c54bdceaf3e938fd424e97c98c7e8/assets/old4pJtvN7HvddhL_zBL1ijNGsMMu3-4j.png)

## How to provision AWS resources
- AWS Management Console
- AWS CLI
- Software Development Kits
- AWS Elastic Beanstalk
    - Instead of clicking around the console or writing multiple commands to build out your network, EC2 instances, scaling and Elastic Load Balancers, you can instead provide your application code and desired configurations to the AWS Elastic Beanstalk service, which then takes that information and builds out your environment for you. 
- AWS CloudFormation
    - AWS CloudFormation is an infrastructure as code tool that allows you to define a wide variety of AWS resources in a declarative way using JSON or YAML text-based documents called CloudFormation templates.

# Networking
- Amazon Virtual Private Cloud (Amazon VPC)
- Internet gateway
- Virtual private gateway
- AWS Direct Connect


![](https://assets.skillbuilder.aws/files/a/w/aws_prod1_docebosaas_com/1657958400/C9khKeuFVAcm75zvzkQubw/tincan/31d9c0cca79c54bdceaf3e938fd424e97c98c7e8/assets/Q_HnMl_BAEsDZGxf_NEblbQjD0vn0-pPU.png)

![](https://assets.skillbuilder.aws/files/a/w/aws_prod1_docebosaas_com/1657958400/C9khKeuFVAcm75zvzkQubw/tincan/31d9c0cca79c54bdceaf3e938fd424e97c98c7e8/assets/tthacSS-FyYNWwE3_s8U3lQzEONXm1FMX.png)

![](https://assets.skillbuilder.aws/files/a/w/aws_prod1_docebosaas_com/1657958400/C9khKeuFVAcm75zvzkQubw/tincan/31d9c0cca79c54bdceaf3e938fd424e97c98c7e8/assets/p53HDtoqu2euSy0Y_YdzRvczPABE_j-yV.png)

## Subnets
![](https://assets.skillbuilder.aws/files/a/w/aws_prod1_docebosaas_com/1657958400/C9khKeuFVAcm75zvzkQubw/tincan/31d9c0cca79c54bdceaf3e938fd424e97c98c7e8/assets/-HQN-9SqkWc5e-yv_pi4TpfvEYaalWuIu.png)

In a VPC, subnets can communicate with each other. For example, you might have an application that involves Amazon EC2 instances in a public subnet communicating with databases that are located in a private subnet.

## Network access control lists (ACLs)
- A network access control list (ACL) is a virtual firewall that controls inbound and outbound traffic at the subnet level.
- Network ACLs perform stateless packet filtering. They remember nothing and check packets that cross the subnet border each way: inbound and outbound. 
- By default, your account’s default network ACL allows all inbound and outbound traffic

## Security groups
- A security group is a virtual firewall that controls inbound and outbound traffic for an Amazon EC2 instance.
- By default, a security group denies all inbound traffic and allows all outbound traffic. You can add custom rules to configure which traffic to allow or deny.
- Security groups perform stateful packet filtering. They remember previous decisions made for incoming packets.

![](https://assets.skillbuilder.aws/files/a/w/aws_prod1_docebosaas_com/1657958400/C9khKeuFVAcm75zvzkQubw/tincan/31d9c0cca79c54bdceaf3e938fd424e97c98c7e8/assets/QkcDe-SJB4lQAuyB_ha8um-1InZb0jryB.png)

## Global Networking
- Amazon Route 53
    - DNS web service
    - AWS Route 53 takes its name with reference to Port 53, which handles DNS for both the TCP and UDP traffic requests
![](https://assets.skillbuilder.aws/files/a/w/aws_prod1_docebosaas_com/1657958400/C9khKeuFVAcm75zvzkQubw/tincan/31d9c0cca79c54bdceaf3e938fd424e97c98c7e8/assets/mR1nvYoC4OSUVg9a_WE71CA369xcdceJ2.png)

# Storage and Databases
## Amazon Elastic Block Store (Amazon EBS)
- Instance stores
    - An instance store provides temporary block-level storage for an Amazon EC2 instance.
    - Same lifespan as EC2

- Amazon EBS
    - all the data on the attached EBS volume remains available.
    - persist
- Amazon EBS snapshots
    - an incremental backup

![](https://assets.skillbuilder.aws/files/a/w/aws_prod1_docebosaas_com/1657958400/C9khKeuFVAcm75zvzkQubw/tincan/31d9c0cca79c54bdceaf3e938fd424e97c98c7e8/assets/FsqE_uY1Kh44ZQYQ_ym_B26HbnRb-vq3N.png)
- [](https://assets.skillbuilder.aws/files/a/w/aws_prod1_docebosaas_com/1657958400/C9khKeuFVAcm75zvzkQubw/tincan/31d9c0cca79c54bdceaf3e938fd424e97c98c7e8/assets/8PP53iK51gK7pU4Q_ruyKsXvVP8ZbeHC1.png)
## Amazon Simple Storage Service (Amazon S3)
In object storage, each object consists of data, metadata, and a key.
### Amazon S3 storage classes
- S3 Standard
    -  11 nines of durability
- S3 Standard-Infrequent Access or S3 Standard-IA
- S3 One Zone-Infrequent Access or S3 One Zone-IA
- S3 Intelligent-Tiering
- S3 Glacier
- S3 Glacier Deep Archive

- Lifecycle policies
## Amazon Elastic File System (Amazon EFS)
- Regional Service
large number of services and resources need to access the same data at the same time
\
scalable file system used with AWS Cloud services and on-premises resources
## Amazon Relational Database Service (Amazon RDS)
- a service that enables you to run relational databases in the AWS Cloud.

### Amazon RDS Database Engines
- Amazon Aurora
    - enterprise-class relational database
    - compatible with MySQL and PostgreSQL relational databases
- PostgreSQL
- MySQL
- MariaDB
- Oracle Database
- Microsoft SQL Server
## Amazon DynamoDB
- serverless database
- non-relational, NoSQL database
- key-value database service
## Amazon Redshift
- Data Warehousing as a Service
- use for big data analytics
- Data warehouses are engineered specifically for this kind of big data, where you are looking at historical analytics as opposed to operational analysis.

## AWS Database Migration Service (AWS DMS)

## Additional Database Service
- Amazon DocumentDB
    - Amazon DocumentDB is a fully managed document database service that supports MongoDB workloads, and Amazon DynamoDB is a serverless key-value database that delivers single-digit millisecond performance at any scale.
- Amazon Neptune
    - a graph database, engineered for social networking and recommendation engines, also great for fraud detection needs
- Amazon Managed Blockchain
- Amazon QLDB, or Quantum Ledger Database
    - An immutable system of record where any entry can never be removed from the audits. 
- Amazon ElastiCache
    - service that adds caching layers on top of your databases to help improve the read times of common requests. 
    - It supports two types of data stores: Redis and Memcached.
- DynamoDB DAX, the DynamoDB Accelerator
    - in-memory cache for DynamoDB.