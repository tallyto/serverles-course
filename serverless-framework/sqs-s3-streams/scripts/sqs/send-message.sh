aws \
    sqs send-message \
    --queue-url https://sqs.us-east-1.amazonaws.com/149239330696/sqs-localstack-dev \
    --message-body 'Hello world' \
    --profile otallyto
#    --endpoint-url=http://localhost:4566 

aws \
    sqs receive-message \
    --queue-url https://sqs.us-east-1.amazonaws.com/149239330696/sqs-localstack-dev \
    --profile otallyto

#    --endpoint-url=http://localhost:4566 
