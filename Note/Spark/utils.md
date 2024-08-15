```

def test_pyspark_function(data_to_be_test: typing.Any, column_function: Column):
    spark.createDataFrame([(data_to_be_test, )]).select(column_function).display()
```