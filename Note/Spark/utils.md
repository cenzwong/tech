```python
def test_pyspark_function(data_to_be_test: typing.Any, column_function: Column):
    spark.createDataFrame([(data_to_be_test, )]).select(column_function).display()
```

```python
def convert_dict_to_dataframe_with_explode(_dict: dict[str, list], column_name: list[str]) -> pyspark.sql.DataFrame:
    """
    Converts a dictionary with list values into a Spark DataFrame and explodes the list values into separate rows.

    Args:
        _dict (dict): The dictionary to convert. Keys will be the first column, values will be the second column.
        column_names (list[str]): List containing the names of the columns.

    Returns:
        pyspark.sql.DataFrame: A DataFrame with the dictionary keys and exploded list values.

    Example:
        data_dict = {
            "key1": [1],
            "key2": [2, 3]
        }
        column_names = ["keys", "values"]
        df = convert_dict_to_dataframe_with_explode(data_dict, column_names)
        display(df)
        # key1,1
        # key2,2
        # key2,3
    """

    # Assert that the input dictionary is not empty and column_names has exactly two elements
    assert isinstance(data_dict, dict), "Input must be a dictionary"
    assert all(isinstance(val, list) for val in data_dict.values()), "All values in the dictionary must be lists"
    assert len(column_names) == 2, "Column names list must contain exactly two elements"

    return spark.createDataFrame(list(zip(_dict.keys(), _dict.values())), column_name).withColumn(column_name[1], F.explode(column_name[1]))
```