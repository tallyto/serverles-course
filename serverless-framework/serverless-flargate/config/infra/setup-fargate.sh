APP_NAME="process-data"
CLUSTER_NAME="curso-serverless"
PROJECT_NAME="curso-serverless01"
REGION="us-east-1"
LOG_GROUP_NAME="/ecs/$PROJECT_NAME"

ESC_ROLE_NAME="ecsTaskExecutionRole"
ECS_ROLE_ARN="arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
ECR_URI_DOCKER="149239330696.dkr.ecr.us-east-1.amazonaws.com/process-data"

CUSTOM_POLICY_NAME="$APP_NAME"-policy
CUSTOM_POLICY_ARN="arn:aws:iam::149239330696:policy/process-data-policy"
SSM_ENV_PATH="/prod/$PROJECT_NAME/"

TASK_DEFINITION_ARN="arn:aws:ecs:us-east-1:149239330696:task-definition/process-data:1"
VPC_ID="vpc-4af42537"
SECURITY_GROUP_NAME="$PROJECT_NAME"
GROUP_ID="sg-0488f4102d130f8ca"

aws iam create-role \
--region $REGION \
--role-name $ESC_ROLE_NAME \
--assume-role-policy-document file://templates/task-execution-assume-role.json \
| tee logs/1.iam-create-role.txt

# dar permissao de executar chamadas ecs na role
aws iam attach-role-policy \
--region $REGION \
--role-name $ESC_ROLE_NAME \
--policy-arn $ECS_ROLE_ARN \
| tee attch.txt

# permissoes para a instancia acessar o S3 e variaveis de ambiente

# Permissoes:
# Acessar o bucket serverless
# Fazer download do csv de serverless
# Fazer relatorio xlsx para serverless/reports
# Ler variaveis do Systems Manager Parameter Store
aws iam create-policy \
--policy-name $CUSTOM_POLICY_NAME \
--policy-document file://templates/custom-access-policy.json \
| tee logs/2.create-policy.txt

aws iam attach-role-policy \
--region $REGION \
--role-name $ESC_ROLE_NAME \
--policy-arn $CUSTOM_POLICY_ARN\
| tee attch.txt

# criar cluster do Elastic Container Service (ECS)
aws ecs create-cluster \
--cluster-name $CLUSTER_NAME \
| tee logs/3.create-cluster.txt

# criar um grupo de logs especifico para o cluster

aws logs create-log-group \
--log-group-name $LOG_GROUP_NAME \
| tee logs/4.logs-create-log-group.txt

# criar container registry 
aws ecr create-repository \
--repository-name $APP_NAME \
--image-scanning-configuration scanOnPush=true \
--region $REGION \
| tee logs/5.create-docker-repo.txt


aws ecs register-task-definition \
--cli-input-json file://templates/task-definition.json \
| tee logs/6.register-task.txt

aws ecs list-task-definitions \
| tee logs/7.tasks-definitions.txt

# Security
aws ec2 describe-vpcs \
| tee logs/8.describe-vpcs.txt

aws ec2 describe-subnets \
--filters="Name=vpc-id,Values=$VPC_ID" \
--query "Subnets[*].SubnetId" \
| tee logs/9.describe-subnets.txt

aws ec2 create-security-group \
--group-name $SECURITY_GROUP_NAME \
--description "grupo de acesso em ecs tasks" \
| tee logs/10.create-security-group.txt

aws ec2 authorize-security-group-ingress \
--group-id $GROUP_ID \
--protocol tcp \
--port 80 \
--cidr 0.0.0.0/0 \
| tee logs/11.authorize-sec-group.txt
