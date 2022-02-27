# Amazon DynamoDB

Amazon DynamoDB is a fast and flexible NoSQL database service for all applications that need consistent, single-digit millisecond latency at any scale. It is a fully managed database that supports both document and key-value data models. Its flexible data model and reliable performance make it a great fit for mobile, web, gaming, advertising technology, Internet of Things (IoT), and many other applications.


Amazon DynamoDB has two read/write capacity modes for processing reads and writes on your tables:
- On-demand
- Provisioned (default, free-tier eligible)

Each table contains multiple items. An item is a group of attributes that is uniquely identifiable among all of the other items. Items in DynamoDB are similar in many ways to rows in other database systems. In DynamoDB, there is no limit to the number of items that you can store in a table.

Each item consists of one or more attributes. An attribute is a fundamental data element, something that does not need to be broken down any further.

When you write an item to a DynamoDB table, only the primary key and sort key (if used) are required.

There are also faster ways to load data into DynamoDB, such as using AWS Data Pipeline, programmatically loading data, or using one of the free tools available on the internet.

There are two ways to query a DynamoDB table: query and scan. A query operation finds items based on the Primary Key and optionally based on the Sort Key. It is fully indexed, so it runs very fast.

![image](https://user-images.githubusercontent.com/44856918/155865865-e8470469-b386-4eb0-b39c-dbc7ab6e0ba9.png)

![image](https://user-images.githubusercontent.com/44856918/155865874-48f2e01c-7ffa-4607-8c9f-90cd859f0f03.png)

The song quickly appears in the list. A query is the most efficient way to retrieve data from a DynamoDB table.

you can scan for an item. This option involves looking through every item in a table, so this option is less efficient and can take significant time for larger tables.
