# PySpark

### This show show the usage of the Spark API in Human language

Key terminology:
RDD

# RDD Transformation (RDD --> RDD)
## rdd.map()
```py
rdd.map(lambda tuple_l: tuple_l[0]).take(5)
```
- map function will take in each LINE of the RDD and do a transformation. 
- You can access each element from the line level

## rdd.filter()
```py
rdd.filter(lambda tuple_l: True).take(5)
```
- filter function will take in each LINE and filter out according to the decision made by the return of lambda function

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


# RDD Stream
## ssc.updateStateByKey()
```py
ssc.updateStateByKey(lambda list_of_batch_values, state_value: any_value)
```
- This function will execute within two streamming batch.
- It take in a LIST of values of SAME key and state_value.
- You return any kind of value, and updateStateByKey will help you stick back key and back to ssc
