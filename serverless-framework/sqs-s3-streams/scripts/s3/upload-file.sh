
aws \
     s3 cp test.txt s3://balde \
     --endpoint-url=http://localhost:4566

aws \ 
    s3 ls s3://balde \
    --endpoint-url=http://localhost:4566 

