CREATE DATABASE IF NOT EXISTS android_app;
USE android_app;

DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    username VARCHAR(10) NOT NULL UNIQUE PRIMARY KEY,
    email    VARCHAR(50) NOT NULL UNIQUE,
    name     VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    contact  VARCHAR(20) NOT NULL
);

DESC users;
