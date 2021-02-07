aws \
    sqs create-queue \
    --queue-name queue-localstack \
    --endpoint-url=http://localhost:4566 

aws \
    sqs list-queues \
    --queue-name queue-localstack \
    --endpoint-url=http://localhost:4566 
