aws \
    sqs create-queue \
    --queue-name sqs-localstack-dev \
    --endpoint-url=http://localhost:4566 

aws \
    sqs list-queues \
    --endpoint-url=http://localhost:4566 
