CREATE DATABASE IF NOT EXISTS WebProjectDb;
USE WebProjectDb;
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    password VARCHAR(255)
);
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    date VARCHAR(255),
    time VARCHAR(255),
    location VARCHAR(255),
    image VARCHAR(255),
    post_id int
);
CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    date VARCHAR(255),
    time VARCHAR(255),
    location VARCHAR(255)
);
CREATE TABLE IF NOT EXISTS comment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content VARCHAR(255),
    post_id INT,
    user_id INT
);
CREATE TABLE IF NOT EXISTS respond (
    id INT AUTO_INCREMENT PRIMARY KEY,
    comment_id INT,
    respond_id INT
);
CREATE TABLE IF NOT EXISTS reaction (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content VARCHAR(255),
    comment_id INT,
    user_id INT
);
ALTER TABLE events
ADD CONSTRAINT FK_enevts_post FOREIGN KEY (post_id) REFERENCES posts (id);
ALTER TABLE comment
ADD CONSTRAINT FK_comment_post FOREIGN KEY (post_id) REFERENCES posts (id);
ALTER TABLE respond
ADD CONSTRAINT FK_comment_id FOREIGN KEY (comment_id) REFERENCES posts (id);
ALTER TABLE respond
ADD CONSTRAINT FK_respond_id FOREIGN KEY (respond_id) REFERENCES posts (id);
ALTER TABLE reaction
ADD CONSTRAINT FK_comment_id FOREIGN KEY (comment_id) REFERENCES comment (id);
ALTER TABLE reaction
ADD CONSTRAINT FK_user_id FOREIGN KEY (user_id) REFERENCES users (id);