# desenvolvimento

# -> copy file in bucket local
aws s3 cp test.csv s3://s3-localstack-dev --endpoint-url=http://localhost:4566

# -> list files in bucket local
aws s3 ls s3://s3-localstack-dev --endpoint-url=http://localhost:4566 

# producao

# -> copy file in bucket aws
aws s3 cp test.csv s3://s3-localstack-dev --profile otallyto
