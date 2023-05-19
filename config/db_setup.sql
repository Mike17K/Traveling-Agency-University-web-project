create database WebProjectDb;
use WebProjectDb;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    password VARCHAR(255)
);
INSERT INTO users (name, password)
VALUES ('Mike', 'mike');