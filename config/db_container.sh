

docker build --build-arg MYSQL_ROOT_PASSWORD_ARG=$(cat .env | grep MYSQL_ROOT_PASSWORD | cut -d '=' -f2) \
             --build-arg MYSQL_DATABASE_ARG=$(cat .env | grep MYSQL_DATABASE | cut -d '=' -f2) \
             --build-arg MYSQL_USER_ARG=$(cat .env | grep MYSQL_USER | cut -d '=' -f2) \
             --build-arg MYSQL_PASSWORD_ARG=$(cat .env | grep MYSQL_PASSWORD | cut -d '=' -f2) \
             -t uni-web-mysql-image .

docker run -d -p 3307:3306 --name uni-web-mysql-container uni-web-mysql-image