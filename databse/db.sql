CREATE DATABASE ccart;
CREATE TABLE seller(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    imgname VARCHAR(200),
    name VARCHAR(40) NOT NULL,
    gst VARCHAR(100) NOT NULL,
    detail VARCHAR(100),
    location VARCHAR(50) NOT NULL,
    opentime TIME NOT NULL,
    totalthr INT NOT NULL,
    servicetime TIME,
    numbslot INT NOT NULL,
    slots VARCHAR,
    password VARCHAR(25) NOT NULL
);
INSERT INTO seller (name,location,gst,opentime,totalthr,servicetime,numbslot,slots,password)
VALUES ('Modi Bakers','Mala','Klfghruigh90','09:00:00',8,'00:10:00',20,'20202020102020','passsword123');

CREATE TABLE product(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    imgname VARCHAR(200),
    name VARCHAR(40) NOT NULL,
    detail VARCHAR(100),
    sellername VARCHAR(40),
    price INT,
    producttime TIME,
    seller INT NOT NULL,
    tcount INT,
    live BOOLEAN,
    FOREIGN KEY(seller) REFERENCES seller(id)
);
INSERT INTO product (name,detail,sellername,price,producttime,seller,live)
VALUES ('apple','Fresh green 1kg','Cherry Bakers',100,'00:00:00',1,TRUE);

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
    cid BIGSERIAL NOT NULL PRIMARY KEY,
    cuser BIGINT NOT NULL,
    product BIGINT NOT NULL,
    pcount INT NOT NULL,
    seller BIGINT NOT NULL,
    paid BOOLEAN NOT NULL,
    slot TIME,
    FOREIGN KEY(cuser) REFERENCES customer(id),
    FOREIGN KEY(product) REFERENCES product(id),
    FOREIGN KEY(seller) REFERENCES seller(id)
);
INSERT INTO cart (cuser,product,pcount,seller,paid,slot)
VALUES (5,1,1,1,TRUE,'13:00:00');