# PySpark

### This show show the usage of the Spark API in Human language

# RDD
## rdd.map()
```py
rdd.map(lambda l: l[0]).take(5)
```
- map function will take in each LINE of the RDD and do a transformation. 
- You can access each element from the line level

## rdd.filter(lambda l: True).take(5)
```py
rdd.map(lambda l: l[0]).take(5)
```
- filter function will take in each LINE and filter out according to the decision made by the return of lambda function
