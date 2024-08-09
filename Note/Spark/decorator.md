# Decorator
## Decorator for function that is columnOrName
```python
import functools
import operator

import pyspark
from pyspark.sql import functions as F

def pyspark_column_or_name_enabler(*param_names):
    """
    A decorator to enable PySpark functions to accept either column names (as strings) or Column objects.

    Parameters:
    param_names (str): Names of the parameters that should be converted from strings to Column objects.

    Returns:
    function: The decorated function with specified parameters converted to Column objects if they are strings.

    Example
    @pyspark_column_or_name_enabler("column_or_name")
    def your_function(column_or_name):
        return column_or_name.startswith(bins)
    """
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            # Convert args to a list to modify them
            # args: This is the list of argument of the function.
            # Get the parameter indices from the function signature
            # func.__code__.co_varnames : Return the function parameter names as a tuple.
            # param_names : the list of parameter from the decorator

            # Merging the args into Kwargs
            args_name_used = func.__code__.co_varnames[:len(args)]
            kw_from_args = dict(zip(args_name_used, args))
            kwargs = (kw_from_args | kwargs)

            # print(kwargs)
            # transform all the input param
            for param_name in param_names:
                # if it is string, wrap it as string, else do nth
                kwargs[param_name] = F.col(kwargs[param_name]) if isinstance(kwargs[param_name], str) else kwargs[param_name]

            return func(**kwargs)
        return wrapper
    return decorator

@pyspark_column_or_name_enabler("column_or_name")
def startswiths(column_or_name: "ColumnOrName", list_of_string: list[str]) -> pyspark.sql.Column:
    """
    Creates a PySpark Column expression that checks if the given column starts with any of the strings in the list.

    Args:
        column_or_name (ColumnOrName): The column to check.
        list_of_string (List[str]): A list of strings to check if the column starts with.

    Returns:
        Column: A PySpark Column expression that evaluates to True if the column starts with any of the strings in the list, otherwise False.
    """
    # If we are not using the decorator
    # column_or_name = F.col(column_or_name) if isinstance(column_or_name, str) else column_or_name
    
    return functools.reduce(
        operator.or_, 
        map(lambda bins: column_or_name.startswith(bins), list_of_string), 
        F.lit(False)
    ).alias(f"startswiths_len{len(list_of_string)}")

```
