metadata_comment = {}
metadata_comment["_col1_"] = ""
metadata_comment["_col2_"] = ""
###
OUTPUT_TABLE_NAME_schema = T.StructType(
    [
        T.StructField("_col1_", T.StringType(), True, metadata={
            "comment": metadata_comment["_col1_"]
        }),
        T.StructField("_col2_", T.StringType(), True, metadata={
            "comment": metadata_comment["_col2_"]
        }),
    ]
)
OUTPUT_TABLE_NAME_sdf = OUTPUT_TABLE_NAME_sdf.to(OUTPUT_TABLE_NAME_schema)
###
table_comment = f"""
comment
"""
###
spark.conf.set("spark.databricks.delta.commitInfo.userMetadata", f"DELTA_COMMENT")
OUTPUT_TABLE_NAME_sdf.writeTo(
    OUTPUT_TABLE_NAME_table
).tableProperty(
    "comment", table_comment
).createOrReplace()
