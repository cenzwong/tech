# Pandas

## How to rename dataframe columns name
```py
mydf = pd.DataFrame(myArray)
mydf.columns = ["change","the","name","you", "want"]
```

## How to clone/copy dataframe
```py
mydf2 = mydf.copy()
```

## How to Reset index in Pandas
```py
df.reset_index()
```

## How to drop column
```py
df.drop(columns=["my","column"])
```


# SKlearn

## How to do OneHotEncoding
```py
from sklearn.preprocessing import OneHotEncoder
onehotencoder = OneHotEncoder()
data_str_ohe=onehotencoder.fit_transform(df_train_data_nn[["columnname"]]).toarray()
my_phe = pd.DataFrame(data_str_ohe)
my_phe
```
