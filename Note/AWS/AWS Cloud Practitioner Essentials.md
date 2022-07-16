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
    - Amazon S3 moves objects between a frequent access tier and an infrequent access tier. (two standard)
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

# Security
- AWS shared responsibility model

## AWS Identity and Access Management (IAM)
least privilege principle

- IAM Users, 
    - by default, it has no permissions
    - It represents the person or application that interacts with AWS services and resources.
- IAM Groups
    - a collection of IAM users
- IAM Roles
    - Roles have associated permissions that allow or deny specific actions. And these roles can be assumed for temporary amounts of time.
- IAM Policies
    - To associate an IAM policy (a JSON document) to an IAM user.
- MFA

## AWS Organizations
- to consolidate and manage multiple AWS accounts within a central location.
    - apply service control policies (SCPs) to the organization root, an individual member account, or an OU. An SCP affects all IAM users, groups, and roles within an account, including the AWS account root user.

## AWS Artifact
- a service that provides on-demand access to AWS security and compliance reports and select online agreements
- Access AWS compliance reports on-demand.
- Review, accept, and manage agreements with AWS.
## AWS Shield
- AWS Shield Standard
    - free
- AWS Shield Advanced
    - paid

## AWS Key Management Service (AWS KMS)
- enables you to perform encryption operations through the use of cryptographic keys.
- use AWS KMS to create, manage, and use cryptographic keys

## AWS WAF
- web application firewall that lets you monitor network requests that come into your web applications. 
- Web access control lists (web ACLs)

## Amazon Inspector
- To perform automated security assessments

## Amazon GuardDuty
- provides intelligent threat detection for your AWS infrastructure and resources
- monitoring your network and account activity

# Monitoring And Analytics
## Amazon CloudWatch
- web service that enables you to monitor and manage various metrics and configure alarm actions based on data from those metrics.
- Monitor your resources’ utilization and performance
- Access metrics from a single dashboard
## AWS CloudTrail
- records API calls for your account
- Filter logs to assist with operational analysis and troubleshooting
- Track user activities and API requests throughout your AWS infrastructure
## AWS Trusted Advisor
- web service that inspects your AWS environment and provides real-time recommendations in accordance with AWS best practices.
- to review the security of your Amazon S3 buckets by checking for open access permissions
- Dashboard included Performance and Fault Tolerance
# Pricing and Support
## AWS Free Tier
- Always Free
    - AWS Lambda allows 1 million free requests and up to 3.2 million seconds of compute time per month. 
    - Amazon DynamoDB allows 25 GB of free storage per month.
- 12 Months Free
    - free for 12 months following your initial sign-up date to AWS.
- Trials

## AWS Pricing Option
- Pay for what you use
- Pay less when you reserve
- Pay less with volume-based discounts when you use more
### AWS Pricing Calculator
- [AWS Pricing Calculator](https://calculator.aws/#/)

## AWS Budgets
- Receive alerts when your service usage exceeds a threshold that you have defined
## AWS Cost Explorer
- to visualize, understand, and manage your AWS costs and usage over time
## AWS Support
- Basic 
- Developer
- Business
    - includes all AWS Trusted Advisor checks at the lowest cost
- Enterprise
    - receive support from an AWS Technical Account Manager (TAM)

## AWS Marketplace
- digital catalog that includes thousands of software listings from independent software vendors

# Migration and Innovation
## AWS Cloud Adoption Framework (AWS CAF)
- Business Perspective
    - helps you to move from a model that separates business and IT strategies into a business model that integrates IT strategy
- People Perspective
    - helps Human Resources (HR) employees prepare their teams for cloud adoption by updating organizational processes and staff skills to include cloud-based competencies
- Governance Perspective
    - helps you understand how to update the staff skills and organizational processes that are necessary to ensure business governance in the cloud
- Platform Perspective
    - helps you design, implement, and optimize your AWS infrastructure based on your business goals and perspectives
- Security Perspective
    - helps you structure the selection and implementation of permissions
- Operations Perspective
    - focuses on recovering IT workloads to meet the requirements of your business stakeholders
## Migration strategies
- Rehosting
    - moving an application to the cloud with little to no modifications to the application itself. It is also known as “lift and shift.”
- Replatforming
    - selectively optimizing aspects of an application to achieve benefits in the cloud without changing the core architecture of the application. It is also known as “lift, tinker, and shift.”
- Refactoring/re-architecting
    - changing how an application is architected and developed, typically by using cloud-native features
- Repurchasing
    - moving to a different product
    - replacing an existing application with a cloud-based version, such as software found in AWS Marketplace
- Retaining
- Retiring
    - removing an application that is no longer used or that can be turned off.

## AWS Snow Family
collection of physical devices that help to physically transport up to exabytes of data into and out of AWS. 

- AWS Snowcone 
    - 2CPU, 4GB+8TB
- AWS Snowball
    - Snowball Edge Storage Optimized
        - 80TB + 40vCPU
    - Snowball Edge Compute Optimized
        - 42TB + 52vCPU
- AWS Snowmobile
    - 100PB

## Innovation with AWS
- Serverless Applications
    - AWS Lambda
- AI
    - Convert speech to text with Amazon Transcribe.
    - Discover patterns in text with Amazon Comprehend.
    - Identify potentially fraudulent online activities with Amazon Fraud Detector.
    - Build voice and text chatbots with Amazon Lex.
    - Amazon Textract is a machine learning service that automatically extracts text and data from scanned documents.
    - Amazon Augmented AI; enables you to build the workflows that are required for human review of machine learning predictions
- ML
    - Amazon SageMaker
    - AWS DeepRacer 
        - an autonomous 1/18 scale race car that you can use to test reinforcement learning models.

# The Cloud Journey
## The AWS Well-Architected Framework
- Operational excellence
    - includes the ability to run workloads effectively and gain insights into their operations
- Security
    - protecting data, systems, and assets, and using cloud technologies to improve the security of your workloads
- Reliability
    - focuses on the ability of a workload to consistently and correctly perform its intended functions
- Performance efficiency
    - focuses on using computing resources efficiently to meet system requirements and to maintain that efficiency as demand changes and technologies evolve
- Cost optimization
    -  focuses on the ability to run systems to deliver business value at the lowest price point
## Six advantages of cloud computing:
- Trade upfront expense for variable expense.
- Benefit from massive economies of scale.
- Stop guessing capacity.
- Increase speed and agility.
- Stop spending money running and maintaining data centers.
- Go global in minutes.