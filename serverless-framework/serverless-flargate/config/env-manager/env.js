const ssmPrefix = "/prod/curso-serverless01"
const variables = {
  ECS_TASK_DEFINITION: {
    value: 'process-data:1',
    type: "String"
  },
  ECS_CLUSTER_NAME: {
    value: "curso-serverless",
    type: "String"
  },
  ECS_TASK_LAUNCH_TYPE: {
    value: "FARGATE",
    type: "String"
  },
  ECS_TASK_COUNT: {
    value: '1',
    type: "String"
  },
  ECS_TASK_PLATFROM_VERSION: {
    value: "LATEST",
    type: "String"
  },
  ECS_TASK_CONTAINER_FILE_ENV_NAME: {
    value: 'SURVERY_FILE',
    type: "String"
  },
  ECS_TASK_SUBNNETS: {
    value: [
      "subnet-3ec0431f",
      "subnet-809159b1",
      "subnet-3af78834",
      "subnet-480f8917",
      "subnet-7e4dc818",
      "subnet-feca9fb3"
    ].join(','),
    type: "StringList"
  },
  ECS_TASK_SECURITY_GROUPS: {
    value: ["sg-0488f4102d130f8ca"].join(','),
    type: "StringList"
  },
  ECS_TASK_ASSIGN_PUBLIC_IP: {
    value: 'ENABLED',
    type: "String"
  },
  ECS_PROCESS_DATA_IMAGE_URL: {
    value: '149239330696.dkr.ecr.us-east-1.amazonaws.com/process-data',
    type: "String"
  },
  BUCKET_REPORTS: {
    value: "reports",
    type: "String"
  },
  LOG_GROUP_NAME: {
    value: "/ecs/curso-serverless01",
    type: "String"
  },
  SSM_PREFIX: {
    value: ssmPrefix,
    type: "String"
  },
  BUCKET_SURVEYS: {
    value: "otallyto-serverless",
    type: "String"
  },
  REGION: {
    value: "us-east-1",
    type: "String"
  }

}

module.exports = {
  variables, ssmPrefix
}

