# role de segurança AWS
aws iam create-role \
    --role-name lambda-exemplo \
    --assume-role-policy-document file://politicas.json \
    --profile otallyto \
    | tee logs/role.log

# criar o arquivo com conteudo e zipa-lo
zip function.zip index.js


# criando lambda
aws lambda create-function \
    --function-name my-function \
    --zip-file fileb://function.zip \
    --handler index.handler --runtime nodejs12.x \
    --role arn:aws:iam::149239330696:role/lambda-exemplo \
    --profile otallyto \
    | tee logs/lambda-create.log

# chamando lambda

aws lambda invoke \
    --function-name my-function \
    --log-type Tail \
    --profile otallyto \
    logs/lambda-exec.log

# atualizar lambda

aws lambda update-function-code \
    --zip-file fileb://function.zip \
    --function-name my-function \
    --publish \
    --profile otallyto \
    | tee logs/lambda-update.log
    
# remover lambda
aws lambda delete-function \
    --function-name my-function \
    --profile otallyto \

# remover iam role
aws iam delete-role \
    --role-name lambda-exemplo\
    --profile otallyto \


