IMAGE_URL="149239330696.dkr.ecr.us-east-1.amazonaws.com/process-data"

docker build -t $IMAGE_URL .

docker run $IMAGE_URL
