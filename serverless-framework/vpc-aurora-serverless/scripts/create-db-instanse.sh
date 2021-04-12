# CLUSTER_NAME=serverlesscourse
# USERNAME=otallyto
# PASSWORD=abc123
# DB_NAME=heroes
# SECRET_NAME=aurora-secret

aws rds create-db-cluster \
--db-cluster-identifier serverlesscourse \
--engine aurora \
--engine-version 5.6.10a \
--engine-mode serverless \
--engine aurora \
--master-username otallyto \
--master-user-password abc12345678 \
--scaling-configuration MinCapacity=2,MaxCapacity=4,AutoPause=false,TimeoutAction=ForceApplyCapacityChange \
--enable-http-endpoint --region us-east-1 --profile otallyto | tee rds-cluster.txt

aws rds describe-db-clusters --db-cluster-identifier serverlesscourse --query 'DBClusters[0].Status' --profile otallyto | tee rds-status.txt

aws secretsmanager create-secret --name aurora-secret --description "Credentials for aurora serverless db" --secret-string '{"username": "otallyto", "password": "abc12345678"}' --region us-east-1 --profile otallyto | tee secret.txt

aws rds-data execute-statement \
--resource-arn arn:aws:rds:us-east-1:149239330696:cluster:serverlesscourse \
--secret-arn arn:aws:secretsmanager:us-east-1:149239330696:secret:aurora-secret-XI6L3Q \
--database mysql --sql "show databases;" --region us-east-1 --profile otallyto | tee sql.txt

aws rds-data execute-statement \
--resource-arn arn:aws:rds:us-east-1:149239330696:cluster:serverlesscourse \
--secret-arn arn:aws:secretsmanager:us-east-1:149239330696:secret:aurora-secret-XI6L3Q \
--database mysql --sql "create database heroes" --region us-east-1 --profile otallyto | tee create-db.txt

aws rds describe-db-subnet-groups --profile otallyto \
| tee db-subnets.txt


aws secretsmanager delete-secret \
--secret-id aurora-secret --profile otallyto \
| tee secret-delete.txt


aws rds delete-db-cluster \
--db-cluster-identifier serverlesscourse \
--skip-final-snapshot \
--profile otallyto \
| tee res-delele-cluster.txt
