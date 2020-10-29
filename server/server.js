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
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                shops: results.rows
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
// Create a customer
app.post("/api/v1/user", async (req,res) => {
    try {
        const results = await db.query(
            `INSERT INTO customer (username, address, contact, location, password) values($1, $2, $3, $4, $5) returning *`,
            [req.body.username,req.body.address, req.body.contact, req.body.location, req.body.password]);
        res.status(201).json({
            status: "success",
            data: {
                user: results.rows[0],
            },
        });
    }catch(err){
        console.log(err);
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