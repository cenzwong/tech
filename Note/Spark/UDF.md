Sure, here are some examples of PySpark UDFs for each of the categories 1-6:

1. String manipulation:

Example 1: Splitting a string column into multiple columns based on a delimiter

```python
from pyspark.sql.functions import udf, split

split_string = udf(lambda x: x.split(','))

df = df.withColumn('column_name', split(split_string(col('string_column')), ','))
```

Example 2: Replacing a substring in a string column

```python
from pyspark.sql.functions import udf, regexp_replace

replace_string = udf(lambda x: x.replace('old_string', 'new_string'))

df = df.withColumn('column_name', replace_string(col('string_column')))
```

2. Date/time manipulation:

Example 1: Extracting the year from a date column

```python
from pyspark.sql.functions import udf, year

get_year = udf(lambda x: x.year)

df = df.withColumn('year_column', get_year(col('date_column')))
```

Example 2: Converting a timestamp column to a different timezone

```python
from pyspark.sql.functions import udf, from_utc_timestamp

convert_timezone = udf(lambda x: from_utc_timestamp(x, 'America/New_York'))

df = df.withColumn('new_timestamp_column', convert_timezone(col('timestamp_column')))
```

3. Mathematical functions:

Example 1: Adding two numeric columns

```python
from pyspark.sql.functions import udf

add_numbers = udf(lambda x, y: x + y)

df = df.withColumn('sum_column', add_numbers(col('numeric_column_1'), col('numeric_column_2')))
```

Example 2: Calculating the square of a numeric column

```python
from pyspark.sql.functions import udf

square_number = udf(lambda x: x**2)

df = df.withColumn('squared_column', square_number(col('numeric_column')))
```

4. Boolean functions:

Example 1: Performing a logical AND operation on two boolean columns

```python
from pyspark.sql.functions import udf

and_operation = udf(lambda x, y: x and y)

df = df.withColumn('and_column', and_operation(col('boolean_column_1'), col('boolean_column_2')))
```

Example 2: Performing a logical NOT operation on a boolean column

```python
from pyspark.sql.functions import udf

not_operation = udf(lambda x: not x)

df = df.withColumn('not_column', not_operation(col('boolean_column')))
```

5. Machine learning functions:

Example 1: Applying a logistic regression model to multiple columns

```python
from pyspark.ml.classification import LogisticRegression
from pyspark.ml.feature import VectorAssembler
from pyspark.sql.functions import udf

assembler = VectorAssembler(inputCols=['numeric_column_1', 'numeric_column_2'], outputCol='features')
lr_model = LogisticRegression(featuresCol='features', labelCol='target')

def apply_model(features):
    return float(lr_model.predict(features))

apply_lr_model = udf(apply_model)

df = df.withColumn('prediction_column', apply_lr_model(assembler(col('numeric_column_1'), col('numeric_column_2'))))
```

Example 2: Applying a k-means clustering algorithm to a numeric column

```python
from pyspark.ml.clustering import KMeans
from pyspark.ml.feature import VectorAssembler
from pyspark.sql.functions import udf

assembler = VectorAssembler(inputCols=['numeric_column'], outputCol='features')
kmeans_model = KMeans(featuresCol='features', k=3)

def apply_model(features):
    return int(kmeans_model.predict(features))

apply_kmeans_model = udf(apply_model)

df = df.withColumn('cluster_column', apply_kmeans_model(assembler(col('numeric_column'))))
```

6. Text analytics functions:

Example 1: Performing sentiment analysis on a text column

```python
from textblob import TextBlob
from pyspark.sql.functions import udf

def get_sentiment(text):
    return TextBlob(text).sentiment.polarity

get_text_sentiment = udf(get_sentiment)

df = df.withColumn('sentiment_column', get_text_sentiment(col('text_column')))
```

Example 2: Performing named entity recognition on a text column

```python
from nltk import word_tokenize, pos_tag, ne_chunk
from pyspark.sql.functions import udf

def get_named_entities(text):
    tagged_text = pos_tag(word_tokenize(text))
    named_entities = ne_chunk(tagged_text)
    return named_entities

get_entities = udf(get_named_entities)

df = df.withColumn('entity_column', get_entities(col('text_column')))
```

Note that some of the examples above may require additional libraries to be installed, such as `textblob` or `nltk`.



# Set Intersection
```py
@udf(returnType=T.ArrayType(T.IntegerType())) 
def setIntersection(list1, list2):
    set1 = set(list1)
    set2 = set(list2)
    return list(set1.intersection(set2))
```