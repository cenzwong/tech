# PySpark
- [pySpark API](https://spark.apache.org/docs/latest/api/python/pyspark.html)
- [Spark API](https://spark.apache.org/docs/latest/index.html)
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
```
- Spark will help you to do the operation Key by Key
- Pass in will be the VAL of the corresponding KEY (K,V): You V can be a list of any datatype
- Multiple Same Key, will be combined into one value.

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

# RDD Action (RDD --> Value)
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
## Data exploration
```py
df.printSchema()
df.show() # only show top 20 result
df.show(5) # show top 5 result
df.show(truncate = False) # Don't hide some word, show all word
df.withColumnRenamed("OldColumnName", "NewColumnName") # rename
```
## Data Aggregation
### Select
```py
df.select(df['name'], df['age'] + 1).show()
df.select('*',
        (df.column1*df.column2).alias("rename"))
```
### Group By
```py
df.groupby("ColumnName").sum("AnotherColumnName").na.fill(0)
df.groupBy("age").count().show()
```
### Order
```py
df.orderBy("ColumnName", ascending = False) # Desending order (Default = True)
```
## SQL Running

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
## GraphFrame exploration
```py
g.triplets.show()
g.vertices.show()
g.edges.show()
g.degrees.show()
g.inDegrees.show()
g.outDegrees.show()
```
## GraphFrame 

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
