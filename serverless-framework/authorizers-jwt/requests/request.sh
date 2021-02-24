curl --location --request POST 'http://0.0.0.0:3000/dev/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "admin",
    "password": "admin"
}'
