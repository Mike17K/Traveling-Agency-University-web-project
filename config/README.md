# Set up database container

docker build -t mysql-container .

docker run -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password mysql-container
