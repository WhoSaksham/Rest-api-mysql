CREATE TABLE customer_data(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL UNIQUE,
    phone varchar(10) NOT NULL UNIQUE,
    posted_date datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);