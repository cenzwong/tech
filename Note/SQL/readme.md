# SQL

To copy an entire table from one database to another database in the same SQL environment, you can use the `SELECT INTO` statement. Here's an example:

```
SELECT *
INTO [destination_database].[schema].[new_table_name]
FROM [source_database].[schema].[old_table_name]
```

In this example, replace `[destination_database]` with the name of the database where you want to copy the table, `[schema]` with the schema name (if applicable), `[new_table_name]` with the name you want to give to the new table, `[source_database]` with the name of the database where the original table is located, and `[old_table_name]` with the name of the original table.

Note that the `SELECT INTO` statement will create a new table in the destination database with the same structure and data as the original table. If you want to copy only the data from the original table into an existing table in the destination database, use the `INSERT INTO` statement instead. Here's an example:

```
INSERT INTO [destination_database].[schema].[existing_table_name]
SELECT *
FROM [source_database].[schema].[old_table_name]
```

In this example, replace `[destination_database]`, `[schema]`, `[existing_table_name]`, `[source_database]`, and `[old_table_name]` with the appropriate values for your environment.