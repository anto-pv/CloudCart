CREATE DATABASE ccart;
CREATE TABLE seller(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    detail VARCHAR(100),
    location VARCHAR(50) NOT NULL,
    servicetime TIME,
    queuetime TIME,
    password VARCHAR(25) NOT NULL
);
INSERT INTO seller (id,name,location,servicetime,password)
VALUES (7,'Cherry Bakers','Kombodinjamakkal','00:05:00','passsword');

CREATE TABLE timeslot(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    seller INT NOT NULL,
    opentime TIME NOT NULL,
    totalthr INT NOT NULL,
    numbslot INT NOT NULL,
    slots VARCHAR,
    live BOOLEAN,
    FOREIGN KEY(seller) REFERENCES seller(id)
);
INSERT INTO timeslot (seller,opentime,totaltime,numbslot,slots,live)
VALUES (1,'09:00:00',7,10,‘10101010101010’,TRUE);

CREATE TABLE product(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    detail VARCHAR(100),
    price INT,
    producttime TIME,
    seller INT NOT NULL,
    tcount INT,
    live BOOLEAN,
    FOREIGN KEY(seller) REFERENCES seller(id)
);
INSERT INTO product (id,name,detail,price,producttime,seller,live)
VALUES (101,'apple','Fresh green 1kg',100,'00:00:00',7,TRUE);

CREATE TABLE customer(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(40) NOT NULL,
    email VARCHAR(50) NOT NULL,
    address VARCHAR(100),
    contact VARCHAR(50),
    location VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    UNIQUE (email)
);
INSERT INTO customer (id,username,email,address,contact,location,password)
VALUES (5,'firstuser','antopv19@gmail.com','Kezhekkemala P o, Kombodinjamakkal','9874793409','Kombodinjamakkal','iamfirstuser');

CREATE TABLE cart(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    user BIGINT NOT NULL,
    product BIGINT NOT NULL,
    pcount INT NOT NULL,
    slotnumber
)
