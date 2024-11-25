def make_columns_null_according_to(
    sdf: DataFrame,
    columns_dummy_name: str,
    columns_dummy_value: str,
    columns_to_be_null: Tuple[str],
) -> DataFrame:
    """
    Removes dummy records from the given DataFrame.

    Args:
        sdf (DataFrame): The input DataFrame.
        columns_dummy_name (str): The name of the column containing the dummy value.
        columns_dummy_value (str): The value indicating a dummy record.
        columns_to_be_null (Tuple[str]): The tuple of columns to be set as null if the dummy value is found.

    Returns:
        DataFrame: The updated DataFrame with dummy records removed.
    """  # noqa: 501
    return sdf.withColumns(
        {
            col_: F.when(
                F.col(columns_dummy_name) == columns_dummy_value, F.lit(None)
            ).otherwise(F.col(col_))
            for col_ in columns_to_be_null
        }
    )


def replace_strings_to_none(
    col_name: Column | str,
    list_of_null_string: list[str],
    customize_output: Any = None,
) -> Column:
    """
    Replaces empty string values in a column with None.
    Parameters:
    col_name (ColumnOrName): The name of the column to check for empty string values.

    Returns:
    Column: A Spark DataFrame column with the values replaced.
    """
    col_name = F.col(col_name) if isinstance(col_name, str) else col_name

    return F.when(col_name.isin(list_of_null_string), customize_output).otherwise(
        col_name
    )


def get_unique_values(df1: DataFrame, df2: DataFrame, column_name: str) -> DataFrame:
    """Unions two DataFrames and returns a DataFrame with unique values.

    Args:
        df1 (DataFrame): First DataFrame.
        df2 (DataFrame): Second DataFrame.
        column_name (str): The column name containing the values.

    Returns:
        DataFrame: A DataFrame with unique values.
    """
    union_df = df1.select(column_name).union(df2.select(column_name))
    unique_values_df = union_df.distinct()

    return unique_values_df
