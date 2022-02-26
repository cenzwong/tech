# IAM

- Exploring pre-created IAM Users and Groups
- Inspecting IAM policies as applied to the pre-created groups
- Following a real-world scenario, adding users to groups with specific capabilities enabled
- Locating and using the IAM sign-in URL
- Experimenting with the effects of policies on service access

![image](https://user-images.githubusercontent.com/44856918/155837479-cfa9c9ab-eed2-4888-9fc0-8e05f5f03505.png)

![image](https://user-images.githubusercontent.com/44856918/155837552-edfc0d8f-939f-4175-9bef-951a71b9de0a.png)

Statements in an IAM policy have the following basic structure:
- Effect says whether to Allow or Deny the permissions.
- Action specifies the API calls that can be made against an AWS service (for example, cloudwatch:ListMetrics).
- Resource defines the scope of entities covered by the policy rule (for example, a specific Amazon Simple Storage Service [Amazon S3] bucket or Amazon EC2 instance; an asterisk [ * ] means any resource).

Inline policy, not managed policy, a policy assigned to just one user or group
![image](https://user-images.githubusercontent.com/44856918/155837637-de5e927b-f1fe-45a8-99ea-dbb917c0d59f.png)

