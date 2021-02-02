# instalar
npm i -g serverless

# sls inicializar
sls

# deploy
sls deploy --aws-profile otallyto

# invocar na AWS
sls invoke -f hello --aws-profile otallyto

# invocar local
sls invoke local -f hello --log --aws-profile otallyto

#logs
sls logs -f hello -t --aws-profile otallyto

#remove
sls remove --aws-profile otallyto
