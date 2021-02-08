# -> list all buckets local

aws s3api list-buckets --endpoint-url=http://localhost:4566

# -> create bucket local

aws s3api create-bucket --bucket s3-localstack-dev --endpoint-url=http://localhost:4566
