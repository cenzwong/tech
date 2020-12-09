# PySpark

## Basic information
- Spark Session
- Spark Core
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
```
- map function will take in each LINE of the RDD and do a transformation. 
- You can access each element from the line level
- One to one mapping

## rdd.filter()
```py
rdd.filter(lambda tuple_l: True).take(5)
```
- Take in each LINE of RDD (Tuple) 
- Filter according to the decision made by the return of lambda function (You must return True or False statement)

## rdd.reduceByKey()
```py
rdd.reduceByKey(lambda val_a, val_b: val_a+val_a).take(5)
rdd.reduceByKey(lambda a,b: a if len(a) > len(b) else b).collect()
```
- Spark will help you to do the operation Key by Key
- Pass in will be the VAL of the corresponding KEY (K,V): You V can be a list of any datatype
- Multiple Same Key, will be combined into one value.

# RDD Action (RDD --> Value)
## rdd.reduce()
```py
rdd.reduce(lambda tuple_a, tuple_b: tuple_a)
rdd.reduce(lambda tuple_a,tuple_b: tuple_a if len(a[1]) > len(b[1]) else tuple_b)
```
- If you return one row of rdd, it will cast to a tuple. Also you can return a value.
- The input of reduce() will be one line of rdd. rdd_a and rdd_b is two lines of the same rdd

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
```
## Data Aggregation
### Select
```py
df.select(df['name'], df['age'] + 1).show()

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

# Graphframe
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
