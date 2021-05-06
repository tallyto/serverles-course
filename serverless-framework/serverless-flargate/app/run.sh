IMAGE_URL="149239330696.dkr.ecr.us-east-1.amazonaws.com/process-data"

docker build -t 149239330696.dkr.ecr.us-east-1.amazonaws.com/process-data .

docker run 149239330696.dkr.ecr.us-east-1.amazonaws.com/process-data

aws ecr get-login-password | docker login --username AWS --password-stdin 149239330696.dkr.ecr.us-east-1.amazonaws.com/process-data
