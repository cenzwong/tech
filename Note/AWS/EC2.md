# Getting Start with EC2

 Amazon EC2 is a web service that provides resizable compute capacity in the cloud. It is designed to make web-scale cloud computing easier for developers.
 
 - Amazon Machine Image (AMI)
An AMI includes the following:
- A template for the root volume for the instance (for example, an operating system or an application server with applications)
- Launch permissions that control which AWS accounts can use the AMI to launch instances
- A block device mapping that specifies the volumes to attach to the instance when it is launched

You can also create your own AMI or select an AMI from the AWS Marketplace, an online store where you can sell or buy software that runs on AWS.

![image](https://user-images.githubusercontent.com/44856918/155832231-e7ee1e0e-c6f6-4c2b-b554-82615c206545.png)

Amazon EC2 stores data on a network-attached virtual disk called Amazon Elastic Block Store (Amazon EBS).

You launch the EC2 instance using a default 8 GiB disk volume. This is your root volume (also known as a boot volume).
A security group acts as a virtual firewall that controls the traffic for one or more instances.

Amazon EC2 sends metrics to Amazon CloudWatch for your EC2 instances.

# instance type
## General Purpose Instances
## Compute Optimized Instances
high-performance web servers, compute-intensive applications servers, and dedicated gaming servers.
## Memory OPtimized Instances
involves performing real-time processing of a large amount of unstructured data.
## Accelerated Computing Instances
use hardware accelerators, or coprocessors, to perform some functions more efficiently than is possible in software running on CPUs
## Storage optimized instances
distributed file systems, data warehousing applications, and high-frequency online transaction processing (OLTP) systems.
