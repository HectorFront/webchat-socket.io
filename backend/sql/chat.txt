CREATE DATABASE chat_fullcam;
USE chat_fullcam;

SELECT * FROM profile_app;
SELECT * FROM login;

CREATE TABLE profile_app (
   id INT AUTO_INCREMENT,
   name_user VARCHAR(200),
   email_user VARCHAR(300),
   PRIMARY KEY(id)
);

CREATE TABLE login (
   id INT AUTO_INCREMENT,
   login_user VARCHAR(300),
   password_user TEXT,
   PRIMARY KEY(id),
   FOREIGN KEY(id) REFERENCES profile_app(id)
);

CREATE TABLE message (
   id INT AUTO_INCREMENT,
   author VARCHAR(50),
   data_message VARCHAR(1000),
   hour_message VARCHAR(5),
   message TEXT,
   PRIMARY KEY(id)
);

CREATE TABLE upload (
   id INT AUTO_INCREMENT,
   type_arquive VARCHAR(100),
   data_upload TEXT,
   PRIMARY KEY(id),
   FOREIGN KEY(id) REFERENCES message(id)
);

CREATE TABLE group_app (
   id INT AUTO_INCREMENT,
   name_group VARCHAR(100),
   group_photo VARCHAR(1000),
   PRIMARY KEY(id),
   FOREIGN KEY(id) REFERENCES profile_app(id)
);