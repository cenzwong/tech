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





