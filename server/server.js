require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const app = express();
app.use(cors());
app.use(express.json());

//Get all shops
app.get("/api/v1/shops", async (req,res) =>{
    try{
        const results = await db.query("SELECT * FROM seller");
        const services = await db.query(`SELECT * FROM product WHERE producttime !='00:00:00'`);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                shops: results.rows,
                services: services.row,
            },
        });
    }catch(err){
        console.log(err);
    };
});
//Get a shop
app.get("/api/v1/shops/:id",async(req,res)=>{
    console.log(req.params.id);
    try{
        const shop = await db.query(`SELECT * FROM seller WHERE id = $1`,[req.params.id]);
        const products = await db.query(`SELECT * FROM product WHERE seller = $1`,[req.params.id]);
        res.status(200).json({
            status: "sucsess",
            data: {
                shop: shop.rows[0],
                products: products.rows,
            },
        });
    }catch(err) {
        console.log(err);
    };
});

// Create a shop
app.post("/api/v1/shops", async (req,res) => {
    try {
        const results = await db.query(
            `INSERT INTO seller (name, location, servicetime, password) values($1, $2, $3, $4) returning *`,
            [req.body.name, req.body.location, req.body.servicetime, req.body.password]);
        res.status(201).json({
            status: "sucsess",
            data: {
                shop: results.rows[0],
            },
        });
    }catch(err){
        console.log(err);
    }
});
//login
app.post("/api/v1/user/login", async (req,res) => {
    let errors = "";
    const results = await db.query(`SELECT * FROM customer WHERE username = $1`,[req.body.username]);
    if (results.rows.length > 0){
        const sresults = await db.query(`SELECT * FROM customer WHERE password = $1`,[req.body.password]);
        if (sresults.rows.length == 1){
            res.status(201).json({
                status: "success",
                data: {
                    user: sresults.rows[0],
                },
            });
        }else{
            errors= errors.concat("i");
            console.log("fdhxdh")
        };
    }else{
        errors = errors.concat("u");
    };
    res.send(errors);
});
//register
app.post("/api/v1/user/register", async (req,res) => {
    let {username, email, address, contact, location, password, password2} = req.body;
    let errors = "";
    if (!username || ! email || !address || !contact || !location || !password || !password2) {
        errors = errors.concat("e");
    }
    if (password.length < 6) {
        errors = errors.concat("i");
    }
    if (password != password2) {
        errors = errors.concat("o");
    }
    if (errors.length > 0){
        res.send(errors);
    }else{
        const results = await db.query(
            `SELECT * FROM customer WHERE email = $1 && username = $2`,
            [email,username]);
        if (results.rows.length > 0){
            errors = errors.concat("u");
        }else{
            try {
                const results = await db.query(
                    `INSERT INTO customer (username, email, address, contact, location, password) values($1, $2, $3, $4, $5, $6) returning *`,
                    [username, email, address, contact, location, password]);
                res.status(201).json({
                    status: "success",
                    data: {
                        user: results.rows[0],
                    },
                });
            }catch(err){
                console.log(err);
            }
        }
        res.send(errors);
    }
});
//add product
app.post("/api/v1/shops/:id/add", async (req,res) => {
    try {
        const results = await db.query(
            `INSERT INTO product (name, detail, price, producttime, seller, live) values($1, $2, $3, $4, $5, $6) returning *`,
            [req.body.name, req.body.detail, req.body.price, req.body.producttime, req.params.id, req.body.live]);
        res.status(201).json({
            status: "sucsess",
            data: {
                product: results.rows[0],
            },
        });
    }catch(err){
        console.log(err);
    }
});
// Update Product
app.put("/api/v1/product/:id", async(req,res) =>{
    try{
        const results = await db.query(`UPDATE product SET name = $1, detail= $2, price= $3, producttime= $4,live=$5 where id=$6 returning *`, [req.body.name, req.body.detail, req.body.price, req.body.producttime, req.body.live, req.params.id]);
        res.status(200).json({
            status: "success",
            data:{
                product: results.rows[0],
            },
        });
    }catch(err){
        console.log(err);
    }
});

// Delete Product

app.delete("/api/v1/product/:id", async (req,res) =>{
    try{
        const results = await db.query(`DELETE FROM product where id= $1`,[req.params.id]);
        res.status(204).json({
            status: "success",
        });
    }catch(err){
        console.log(err);
    }
});
const port = process.env.PORT || 3005;
app.listen(port, () =>{
    console.log(`server is up and listening port ${port}`);
});