# Amazon Virtual Private Cloud (Amazon VPC)

![image](https://user-images.githubusercontent.com/44856918/155835981-e9dd6073-1c31-4532-9bb6-24b704c32621.png)

## Task 1: Creating a VPC

A VPC is a virtual network that is dedicated to your Amazon Web Services (AWS) account. It is logically isolated from other virtual networks in the AWS Cloud.

![image](https://user-images.githubusercontent.com/44856918/155836179-a92692b8-e673-4f70-8381-5b83cfee003f.png)

The VPC will have a Classless Inter-Domain Routing (CIDR) range of 10.0.0.0/16, which includes all IP address that start with 10.0.x.x. It contains more than 65,000 addresses.

![image](https://user-images.githubusercontent.com/44856918/155836324-3f392e7b-5dc7-46ef-ae30-929e8957901e.png)

```
ec2-52-42-133-255.us-west-2.compute.amazonaws.com
```
add a more-meaningful DNS name (such as app.example.com) later by using Amazon Route 53

Use a public subnet for resources that must be connected to the internet, and use a private subnet for resources that must remain isolated from the internet.

![image](https://user-images.githubusercontent.com/44856918/155836390-91f209cb-fb06-48ee-9cbf-0cf843bf691e.png)

The VPC has a CIDR block of 10.0.0.0/16, which includes all 10.0.x.x IP addresses. 
The subnet you just created has a CIDR block of 10.0.0.0/24, which includes all 10.0.0.x IP addresses
The CIDR block of 10.0.2.0/23 includes all IP addresses that start with 10.0.2.x and 10.0.3.x.

![image](https://user-images.githubusercontent.com/44856918/155836546-09693ea3-efa2-4e06-b7e7-46d9df9ceb86.png)


A public subnet must have an internet gateway. An internet gateway is a horizontally scaled, redundant, and highly available VPC component. It allows communication between the instances in a VPC and the internet. It imposes no availability risks or bandwidth constraints on network traffic.

Must also configure the public subnet route table so that it uses the internet gateway

A route table contains a set of rules, called routes, that are used to determine where network traffic is directed

![image](https://user-images.githubusercontent.com/44856918/155836880-78895ff6-fc41-44b8-aca1-74c8546fa956.png)
![image](https://user-images.githubusercontent.com/44856918/155836891-e715334b-da90-44d1-995d-bc0196ed22d1.png)

It shows that all traffic that is destined for 10.0.0.0/16 (which is the range of the Lab VPC) will be routed locally. This route allows all subnets in a VPC to communicate with each other.

Public Route table
![image](https://user-images.githubusercontent.com/44856918/155836962-b67eea50-0da3-45e0-902a-3b52374a2d92.png)
![image](https://user-images.githubusercontent.com/44856918/155836923-bd71e136-1071-4785-8ee7-738cb4255434.png)

To summarize, you can create a public subnet by following these steps:
- Create an internet gateway.
- Create a route table.
- Add a route to the route table that directs 0.0.0.0/0 traffic to the internet gateway.
- Associate the route table with a subnet, which then becomes a public subnet.

## Security Group
A security group acts as a virtual firewall for instances to control inbound and outbound traffic. Security groups operate at the level of the elastic network interface for the instance. 

