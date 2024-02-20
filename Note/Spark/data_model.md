# Creating ID in a table

```sql
CREATE OR REPLACE TABLE table_name (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    your_col STRING,
)
```
```python
record = [
    ('a',),
    ('b',),
    ('c',),
    ('d',),
    ('e',),
    ('f',),
    ('g',),
]
spark.createDataFrame(record, col).write.format('delta').mode('append').saveAsTable('table_name')
```