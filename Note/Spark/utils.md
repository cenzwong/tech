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
    assert isinstance(_dict, dict), "Input must be a dictionary"
    assert all(isinstance(val, list) for val in data_dict.values()), "All values in the dictionary must be lists"
    assert len(column_names) == 2, "Column names list must contain exactly two elements"

    return spark.createDataFrame(_dict.items(), column_name).withColumn(column_name[1], F.explode(column_name[1]))
```

```python
def convert_dict_to_dataframe(_dict: dict[str, Any], column_name: list[str]) -> pyspark.sql.DataFrame:
    """
    Converts a dictionary with list values into a Spark DataFrame.

    Args:
        _dict (dict): The dictionary to convert. Keys will be the first column, values will be the second column.
        column_names (list[str]): List containing the names of the columns.

    Returns:
        pyspark.sql.DataFrame: A DataFrame with the dictionary keys and exploded list values.

    Example:
        data_dict = {
            "key1": 1,
            "key2": 2
        }
        column_names = ["keys", "values"]
        df = convert_dict_to_dataframe(data_dict, column_names)
        display(df)
        # key1,1
        # key2,2
    """

    # Assert that the input dictionary is not empty and column_names has exactly two elements
    assert isinstance(_dict, dict), "Input must be a dictionary"
    assert len(column_names) == 2, "Column names list must contain exactly two elements"

    return spark.createDataFrame(_dict.items(), column_name)
```

```python
def get_latest_record_from_column_v2(
    sdf: pyspark.sql.DataFrame,
    window_partition_column_name: str,
    window_order_by_column_names: str | list,
    window_function: pyspark.sql.Column = F.row_number,
) -> pyspark.sql.DataFrame:
    """
    Returns the latest record from a DataFrame based on a specified column. You have to specify your own desc asc

    Parameters:
        sdf (DataFrame): The input DataFrame.
        window_partition_column_name (str): The column used for partitioning the DataFrame.
        window_order_by_column_names (str | list): The column used for ordering the DataFrame.
        is_desc (bool, optional): The order in which the DataFrame is sorted. Can be either True(desc) or False(asc).
            Defaults to True.
        window_function (Column, optional): The window function to be used for ranking the records.
            Defaults to F.row_number.


    Returns:
        DataFrame: The resulting DataFrame containing the latest record for each partition.
    """
    if not isinstance(window_order_by_column_names, list):
        window_order_by_column_names = list(window_order_by_column_names)

    return (
        sdf.withColumn(
            "temp",
            window_function().over(
                Window.partitionBy(window_partition_column_name).orderBy(*window_order_by_column_names)
            ),
        )
        .filter(F.col("temp") == 1)
        .drop("temp")
    )

```