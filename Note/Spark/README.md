# [PySpark](https://cenzwong.github.io/tech/Note/Spark/)
- [pySpark API](https://spark.apache.org/docs/latest/api/python/pyspark.html)
- [Spark API](https://spark.apache.org/docs/latest/index.html)
- https://runawayhorse001.github.io/LearningApacheSpark/index.html
- https://pages.databricks.com/rs/094-YMS-629/images/LearningSpark2.0.pdf
- [Spark by Example](https://sparkbyexamples.com/) 
## Basic information
- Spark Components
    - (edge node)Driver program: Spark Session; {run normal python program?}
    - Cluster manager
    - (Cluster/Local)Workers: Executor and tasks  {run pyspark program?}
- Spark Session
    - Tell Spark how and where to access cluster
- Spark Core
    - Task Scheduling
    - Memory Management
    - Fault recovery
    - interacting within storage system
- Data Sources: Local FS, HDFS, MapR XD, Hive, HBase or MapR Database, JDBC databases, Cloud storage
- Data formats: Text, JSON, CSV, Parquet, Sequence File, Protocol Buffer, Object
- Datasets vs DataFrames
  - DataFrame: Unknown Schema (DF)
  - df.as[T] --> turn from df to ds
  - Dataset: Known Schema (DS)
  - RDD: Resilient Distributed Datasets
- Closure
    ``` python
    # sum = 0 # this won't work, because it do not send to worker
    sum = sc.accumulator(0) # spark object that will send to worker
    rdd = sc.parallelize(range(20),2) 
    def update_sum(x):
        global sum
        sum += x
    rdd.foreach(update_sum)
    print(sum) # 190
    ```
- Run Python Script: bin/spark-submit myscript/helloworld.py

### This show show the usage of the Spark API in Human language

Key terminology:
- RDD: [(),(),(),()]
- Lines of RDD: (K,V)
- Key: K
- Value: V

```py
# If you know the input of the lambda function, you can unpackage it on define

rdd.map(lambda x: (x[0]+x[1]))
rdd.map(lambda (x,y): x+y)
```

# Getting Started
## Installation

### on Colab
```bash
# Run this on bash with "!"
apt-get -y install openjdk-8-jre-headless
pip install pyspark
```
```py
# initiate Spark Context
from pyspark.sql import SparkSession
from pyspark import SparkContext, SparkConf
spark = SparkSession.builder.master("local").getOrCreate()
sc = SparkContext.getOrCreate()
```

# RDD Transformation (RDD --> RDD)
## Data preparation
```py
txt = sc.textFile("./myText.txt",4)
hdfs = sc.textFile("hdfs://[url]:[port]/path/to/file.txt",8)
numbers = sc.parallelize(range(1,100),8)
```

## rdd.map()
```py
rdd.map(lambda tuple_l: tuple_l[0]).take(5)
wordsReversed = words.map(lambda word: word[::-1])
```
- map function will take in each LINE of the RDD and do a transformation. 
- You can access each element from the line level
- One to one mapping

## rdd.mapPartitions()
```py
def f(iterator):
  result = 0
  for tuple_l in iterator:
    yield tuple_l # this return every element

rdd.mapPartitions(f).take(20)

def f(iterator):
  result = 0
  for tuple_l in iterator:
    pass
  yield tuple_l # this return last element of each partition

rdd.mapPartitions(f).take(20)
```
- input para is iterator
- access each line of tuple via for interator
- interator is storing one Partitions of data!
- yield is used, you will receive a rdd at the end

## rdd.mapPartitionsWithIndex()
```py
def f(index,iterator):
  index # is just a number
  for tuple_l in iterator:
    pass
  yield tuple_l # this return last element of each partition

rdd.mapPartitionsWithIndex(f).take(20)
```
- nearly the same as mapPartitions()

## rdd.glom()
```py
rdd = sc.parallelize(range(8),2) 
print(rdd.collect())
# [0, 1, 2, 3, 4, 5, 6, 7]
print(rdd.glom().collect())
# [[0, 1, 2, 3], [4, 5, 6, 7]]
```
- Wraping partitions into single line (list)

## rdd.flatMap()
```py
rdd.flatMap(lambda x: (x[0], x[1]+1)).take(5)
```
- Take in each LINE of RDD (Tuple) 
- it turn all your output, flatten it to numbers of elements
- the output will be one big rdd without tuple

## rdd.filter()
```py
rdd.filter(lambda tuple_l: True).take(5)
rdd.filter(lambda x: x * x > t ).take(5)
rdd.filter(lambda x: len(x) <> 5).take(5)
```
- Take in each LINE of RDD (Tuple) 
- Filter according to the decision made by the return of lambda function (You must return True or False statement)

## rdd.sortBy()
```py
rdd.sortBy(lambda tuple_l: tuple_l[1], True).take(5)
```
- Sort according to tuple_l[1] result 
- True: Asscending, False: Desending


## rdd.reduceByKey()
```py
rdd.reduceByKey(lambda val_a, val_b: val_a+val_a).take(5)
rdd.reduceByKey(lambda a,b: a if len(a) > len(b) else b).collect()

from operator import add
rdd.reduceByKey(add).take(5)
```
- Spark will help you to do the operation Key by Key
- Pass in will be the VAL of the corresponding KEY (K,V): You V can be a list of any datatype
- Multiple Same Key, will be combined into one value.

## rdd.join(rdd2)/rdd.fullOuterJoin(rdd2)/rdd.leftOuterJoin(rdd2)/rdd.rightOuterJoin(rdd2)
```py
rdd = sc.parallelize([("K1", "v1"),("K2", "v1"),("K3", "v1"),("K4", "v1")]) 
rdd2 = sc.parallelize([("K1", ("V11","V22")),("K2", ("V21","V32")),("K1", ("V13","V24")),("K4", ("V11","V22")), ("K5", ("V11","V22"))]) 
rdd.join(rdd2).collect()
"""
[('K1', ('v1', ('V11', 'V22'))),
 ('K1', ('v1', ('V13', 'V24'))),
 ('K2', ('v1', ('V21', 'V32'))),
 ('K4', ('v1', ('V11', 'V22')))]
"""
rdd.fullOuterJoin(rdd2).collect()
"""
[('K1', ('v1', ('V11', 'V22'))),
 ('K1', ('v1', ('V13', 'V24'))),
 ('K2', ('v1', ('V21', 'V32'))),
 ('K3', ('v1', None)),
 ('K4', ('v1', ('V11', 'V22'))),
 ('K5', (None, ('V11', 'V22')))]
"""
rdd.leftOuterJoin(rdd2).collect()
"""
[('K1', ('v1', ('V11', 'V22'))),
 ('K1', ('v1', ('V13', 'V24'))),
 ('K2', ('v1', ('V21', 'V32'))),
 ('K3', ('v1', None)),
 ('K4', ('v1', ('V11', 'V22')))]
"""
rdd.rightOuterJoin(rdd2).collect()
"""
[('K1', ('v1', ('V11', 'V22'))),
 ('K1', ('v1', ('V13', 'V24'))),
 ('K2', ('v1', ('V21', 'V32'))),
 ('K4', ('v1', ('V11', 'V22'))),
 ('K5', (None, ('V11', 'V22')))]
"""
```
- Join By Key.
-  (K, V) and (K, W), returns a dataset of (K, (V, W))

## rdd.zip()
```py
rdd1 = sc.parallelize([5,0,0,3])
rdd2 = sc.parallelize([3,4,6,2])
rdd1.zip(rdd2).take(5)
# [(5, 3), (0, 4), (0, 6), (3, 2)]
```
- make it horizontal zipping

## rdd.zip()
```py
rdd1 = sc.parallelize([5,0,0,3])
rdd2 = sc.parallelize([3,4,6,2])
rdd1.zip(rdd2).take(5)
# [(5, 3), (0, 4), (0, 6), (3, 2)]
```
- make it horizontal zipping

## rdd.union()
```py
rdd1 = sc.parallelize(["apple","cat","duck"])
rdd2 = sc.parallelize(["apple","boy","cat"])
rdd1.union(rdd2).take(10)
# >> ['apple', 'cat', 'duck', 'apple', 'boy', 'cat']
```
- This union is just append two rdd togather

## rdd.intersection()
```py
rdd1 = sc.parallelize(["apple","cat","duck"])
rdd2 = sc.parallelize(["apple","boy","cat"])
rdd1.intersection(rdd2).take(10)
# >> ['cat', 'apple']
```
- return only element they share

## rdd.distinct()
```py
rdd2 = sc.parallelize(["apple","boy","cat", "apple"])
rdd2.distinct().take(10)
# >> ['apple', 'boy', 'cat']
```
- return distinct element

# RDD Action (RDD --> Value)
## rdd.take(_int)/collect()
- RDD to Python list

## rdd.foreach(lambda tuple_l: tuple_l[0])
## rdd.reduce()
```py
rdd.reduce(lambda tuple_a, tuple_b: tuple_a)
rdd.reduce(lambda tuple_a,tuple_b: tuple_a if len(a[1]) > len(b[1]) else tuple_b)
```
- If you return one row of rdd, it will cast to a tuple. Also you can return a value.
- The input of reduce() will be one line of rdd. rdd_a and rdd_b is two lines of the same rdd

## rdd.cache()/persist()
- [Spark](https://spark.apache.org/docs/latest/rdd-programming-guide.html#rdd-persistence)
- [pySpark](https://spark.apache.org/docs/latest/api/python/pyspark.html#pyspark.RDD.persist)
- Cache is just the shorthand of persist

---
# SQL, DataFrame (DF), Datasets (DS)
## Import CSV
```py
df = spark.read.csv('file.csv', header=True, inferSchema=True)
```

## Import Table
```py
table_df = spark.read.table(f"{database_name}.{table_name}")
```

### Options
You can find the options directly using the source code
- https://spark.apache.org/docs/3.2.0/api/python/reference/api/pyspark.sql.DataFrameReader.table.html 
- https://spark.apache.org/docs/latest/sql-data-sources-json.html
- https://spark.apache.org/docs/latest/api/python/_modules/pyspark/sql/readwriter.html#DataFrameWriter.csv

## Under DataFrame
```py
# rdd --> Dataframe
rdd = sc.parallelize([('Michael', 29), ('Andy', 30), ('Justin', 19)])
df = spark.createDataFrame(rdd)
df = spark.createDataFrame(rdd, ['_1', '_2'])
"""
+-------+---+
|     _1| _2|
+-------+---+
|Michael| 29|
|   Andy| 30|
| Justin| 19|
+-------+---+
"""
df.rdd.take(3)
"""
[Row(_1='Michael', _2=29),
 Row(_1='Andy', _2=30),
 Row(_1='Justin', _2=19)]
"""

```
## Data exploration
```py
df.printSchema()
df.show() # only show top 20 result
df.show(5) # show top 5 result
df.show(truncate = False) # Don't hide some word, show all word
df.count() # return number of data
df.withColumnRenamed("OldColumnName", "NewColumnName") # rename
df.explain()

# Databricks
display(df)
display(table_df.limit(3)) # Display only three row
# limit will return spark object
```
## Data Aggregation
### Select
```py
df.select(df['name'], df['age'] + 1).show()
df.select('*',
        (df.column1*df.column2).alias("rename"))
df.select(df['Country']).distinct().show()
df.select(df['Product'], lit('OK')).show() # Literal:constant OK on that column
```
### Group By
```py
df.groupBy("ColumnName").sum("AnotherColumnName").na.fill(0)
df.groupBy("age").count().show()
```
### Order
```py
df.orderBy("ColumnName", ascending = False) # Desending order (Default = True)
```
### Filter
```py
# where() is an alias for filter()
df.filter("ColumnName < 'Value'")
df.filter("ColumnName = 'Value'")
df.filter(df.ColumnName == 'Value')
```
- Check the number of equal sign!!

### Join
- dummy

## SQL Running
- [Ref](https://spark.apache.org/docs/latest/sql-getting-started.html#running-sql-queries-programmatically)

## Create Datasets
- [Ref](https://spark.apache.org/docs/latest/sql-getting-started.html#creating-datasets)

---
# Graphframe
- [GraphFrames Quick-Start Guide](https://graphframes.github.io/graphframes/docs/_site/user-guide.html)
## Preparation
You have two way to use graphframe
1. Import it when starting the shell
```bash
./bin/pyspark --packages graphframes:graphframes:0.x.x-sparkx.x-s_x.xx
```
2. Import it on-the-go (suitable for using Colab)
```bash
# COLAB
# the pyaddfile only look into the jars file, so we need to put the file inside the jars file, both in pyspark and in full spark
# Note: I don't know why I need two file in these two place LOL
# Location is the key for importing this files
!curl -L -o "/usr/local/lib/python3.6/dist-packages/pyspark/jars/graphframes-0.8.1-spark3.0-s_2.12.jar" \
http://dl.bintray.com/spark-packages/maven/graphframes/graphframes/0.8.1-spark3.0-s_2.12/graphframes-0.8.1-spark3.0-s_2.12.jar
!wget http://dl.bintray.com/spark-packages/maven/graphframes/graphframes/0.8.1-spark3.0-s_2.12/graphframes-0.8.1-spark3.0-s_2.12.jar
```
3. After activating Spark Context (sc), import graphframe file

```py
# import library of graphframe
sc.addPyFile('./graphframes-0.8.1-spark3.0-s_2.12.jar')

from graphframes import *
from pyspark.sql.functions import *
```
## Prepare GraphFrame
```py
v = spark.createDataFrame([
 ("a", "Alice", 34),
 ("b", "Bob", 36),
 ("c", "Charlie", 37)
], ["id", "name", "age"])

# Edges DataFrame
e = spark.createDataFrame([
 ("a", "b", "follow"),
 ("a", "c", "follow"),
 ("b", "c", "friend")
], ["src", "dst", "relationship"])
# Create a GraphFrame
g = GraphFrame(v, e)
```
- vertex and edge
## GraphFrame exploration
```py
g.triplets.show() # display all
g.vertices.show() # display vertices
g.edges.show()    # display edges
g.degrees.show()
g.inDegrees.show()
g.outDegrees.show()
```
- GraphFrame is based on Dataframe
- g.edges, g.vertices are two Dataframe

## Motif finding "(a)-[e]->(b)"
```py
g.find("(a)-[]->(b);(b)-[]->(a)").filter("a.id < b.id") # find the mutual friend connection
g.find("(a)-[]->(b); !(b)-[]->(a)").filter("a.id < b.id") # I follow you, you not follow me
g.find("!()-[]->(a)") # find vertices without incoming edges
g.find("(a)-[e]->(b)").filter("e.relationship = 'follow'")
```
### Filter
```py
g.filterVerices("columnName > 30")
g.filterEdges("columnName = 30")
g.dropIsolatedVertices()
```
- the filter equal sign is one  "=" not double equal sign



---
# Spark Streamming (DStream)
## Preparation
```py
from pyspark.streaming import StreamingContext
```
```py
# Create a queue of RDDs
rdd = sc.textFile('./adj_noun_pairs.txt', 8)
# split the rdd into 5 equal-size parts
rddQueue = rdd.randomSplit([1,1,1,1,1], 123)
# Create a StreamingContext with batch interval of 5 seconds
ssc = StreamingContext(sc, 5)
# Feed the rdd queue to a DStream
dstrm = ssc.queueStream(rddQueue)
```
```py
# YOUR code in one batch
lines.pprint()
```
```py
ssc.start()
ssc.awaitTermination(60)
ssc.stop(False)
```
## dstrm.updateStateByKey()
```py
# Provide a checkpointing directory. Required for stateful transformations
ssc.checkpoint("checkpoint")
# ...
dstrm.updateStateByKey(lambda list_of_batch_values, state_value: any_value)
```
- This function will execute within two streamming batch.
- It take in a LIST of values of SAME key and state_value.
- You return any kind of value, and updateStateByKey will help you stick back key and back to ssc

## dstrm.transform()
```py
dstrm.transform(lambda rdd: rdd.sortBy(lambda tuple_l: tuple_l[1], False))
```
- Use transform() to access any rdd transformations not directly available in SparkStreaming
- one batch as one RDD
- return dstrm

## dstrm.foreachRDD()
```py
dstrm.foreachRDD(lambda rdd: rdd.dosomething())
```
- Use transform() to access any rdd transformations not directly available in SparkStreaming
- one batch as one RDD

# Exam Sample Code Solution
## Q: 
In social networks, "zombies" are users that follow many other users, but are not followed by anybody. Given the following graph representing a social network, find the name of the largest zombie, i.e., the user who follows the most other users but is not followed by anybody. 
```py
from graphframes import *

# Vertices DataFrame
v = spark.createDataFrame([
 ("a", "Alice", 34),
 ("b", "Bob", 36),
 ("c", "Charlie", 37),
 ("d", "David", 29),
 ("e", "Esther", 32),
 ("f", "Fanny", 38),
 ("g", "Gabby", 60)
], ["id", "name", "age"])

# Edges DataFrame
e = spark.createDataFrame([
 ("a", "b", "follow"),
 ("c", "a", "friend"),
 ("b", "c", "follow"),
 ("d", "a", "follow"),
 ("f", "c", "follow"),
 ("f", "d", "follow"),
 ("f", "b", "follow"),
 ("c", "d", "follow"),
 ("g", "a", "friend"),
 ("g", "d", "friend"),
 ("g", "c", "friend"),
 ("e", "a", "follow"),
 ("e", "d", "follow")
], ["src", "dst", "relationship"])
# Create a GraphFrame
g = GraphFrame(v, e)

# FILL IN YOUR CODE HERE
e1 = g.edges.filter("relationship = 'follow'")
v1 = e1.groupBy('dst').count().select('dst')
v2 = e1.groupBy('src').count().orderBy('count', ascending=False)
v3 = v2.select('src').subtract(v1.select('dst'))
v4 = v3.join(v2,'src').first()
e.filter(e['src']==v4.src).select('dst').show()
# +---+
# |dst|
# +---+
# |  c|
# |  d|
# |  b|
# +---+
```

# Library
Register the spark-xml library - edit your cluster configuration and then from the Libraries tab, install the following library:
Type: Maven
Coordinates: com.databricks:spark-xml_2.12:0.10.0

# Utility

## Finding the Max/Min element of a column
```
table_df.select("my_col").rdd.min()[0]
table_df.select("my_col").rdd.max()[0]
```

## Distinct Value from ROW to List
```py
data = table_df.select(col).distinct()
myDict[col] = [row[col] for row in data.collect()]
```

# Print the Schema
```
describe_table = spark.sql(f"describe table `{database_name}`.`{table_name}`")
display(describe_table)
```

# Databricks
## Filesystem
2 Filesystem we are dealing with
1. Spark system
2. Python Runtime system

```
# this is refering to the first filesystem
# the /mnt is in the spark system
# You can use dbfs:/mnt/foldername
describe_table.coalesce(1).write.format("com.databricks.spark.csv").option("header", "true").save("/mnt/foldername")
```

```
# This is refering the PYthon local system
# they are connected in the root /dbfs files
!ls /
```
![image](https://user-images.githubusercontent.com/44856918/165670721-55f99fc7-2887-4f78-8b51-30b334f642f0.png)

## Mounting Spark to Azure
Ref: https://docs.microsoft.com/en-us/azure/databricks/data/data-sources/azure/azure-storage
Ref: https://docs.databricks.com/data/data-sources/azure/adls-gen2/azure-datalake-gen2-sp-access.html

```python
source = "abfss://<container-name>@<storage-account-name>.dfs.core.windows.net/"
source = "wasbs://<container-name>@<storage-account-name>.blob.core.windows.net",
mount_point = "/mnt/<mount-name>"

# directory-id : # Directory (tenant) ID (https://portal.azure.com/#blade/Microsoft_AAD_IAM/TenantPropertiesBlade)
# Azure AD Connection
configs = {"fs.azure.account.auth.type": "OAuth",
          "fs.azure.account.oauth.provider.type": "org.apache.hadoop.fs.azurebfs.oauth2.ClientCredsTokenProvider",
          "fs.azure.account.oauth2.client.id": "<application-id>",
          "fs.azure.account.oauth2.client.secret": dbutils.secrets.get(scope="<scope-name>",key="<service-credential-key-name>"),
          "fs.azure.account.oauth2.client.endpoint": "https://login.microsoftonline.com/<directory-id>/oauth2/token"}

# Normal connection
extra_configs = {"<conf-key>":dbutils.secrets.get(scope = "<scope-name>", key = "<key-name>")})

dbutils.fs.mount(
source = source,
mount_point = mount_point,
extra_configs = configs
)
```

## Reading Tables and Filter the Tables

```
table_name = 'my_table_name'
cols_selections = ["mycol1", "mycol2", "mycol3", "mycol4"]

df = spark.read.table(f"curated.{table_name}").select(cols_selections).filter((col("customer_source") != "SFMC") & (col("business_unit") != ""))
# or
filters_logics = [(col("mycol1") != "abc"), (col("mycol2") != "")]
df = spark.read.table(f"curated.{table_name}").select(cols_selections).filter(reduce(and_, filters_logics))
df = spark.read.table(f"curated.{table_name}")
                .select(cols_selections)
                .filter(reduce(and_, (conditions for conditions in filters_logics)))
# or
filters_logics = ['mycol1 <> "abc"', 'mycol2 <> ""']
df = spark.read.table(f"curated.{table_name}").select(cols_selections).filter(" and ".join(filters_logics))


df.display()

```

```
table_name = 'your_table_name'
cols_selections = ["*"]
filters_logics = []
df = spark.read.table(f"curated.{table_name}").select(cols_selections).filter(reduce(and_, filters_logics, lit(True)))
```


```
def filter_row_from_list(dataframe, filters_logics):
  return dataframe.filter(reduce(and_, filters_logics, lit(True)))

def select_col_from_list(dataframe, cols_selections):
  return dataframe.select(cols_selections)
  
def get_distinct_value_from_df_columns(df, columns_names, display=True):
  # 
  myDict = {}
  for col in columns_names:
    data = df.select(col).distinct()
    myDict[col] = [row[col] for row in data.collect()]
    
    df.groupBy(col).count().show()
  return myDict 
  
def get_daterange_df(start, end_exclude):
  date_range_dtidx = pd.date_range(start=start, end=end_exclude, closed="left")
  date_range_pddf = date_range_dtidx.to_frame()
  date_range_df  =  spark.createDataFrame(  date_range_pddf   ).withColumnRenamed('0', 'date').select(col("date").cast("date"))
  return date_range_df

def transaction_to_flat(df, col_name, col_value, join_key):
  for i, ele in enumerate([row[col_name] for row in df.select(col_name).distinct().collect()]):
    print(ele)
    temp = df.filter(col(col_name) == ele).drop(*[col_name]).withColumnRenamed(col_value, f"{ele}_{col_value}")
    if i == 0:
      result = temp
    else:
      result = result.join(temp, join_key, "outer").fillna(0)
  return result
```

```
#https://docs.databricks.com/libraries/notebooks-python-libraries.html
%pip install july
```
