CREATE DATABASE IF NOT EXISTS books; 

use books;

CREATE TABLE User (
    id_user INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
); 

CREATE TABLE book(
    id_book INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(150) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    description TEXT,
    id_user INT NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    FOREIGN KEY (id_user) REFERENCES User(id_user)
    ON DELETE CASCADE 
	ON UPDATE CASCADE
);