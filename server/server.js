require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db"); 
const path = require('path');
const fileUpload = require('express-fileupload');
const nodemailer = require('nodemailer');
const Razorpay = require('razorpay');
const shortid = require('shortid');
const app = express();
const razorpay = new Razorpay({
    key_id: 'rzp_test_qTrwfutHBo5P6Q',
    key_secret: process.env.Razorpaysec
});
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.put("/api/v1/shops/:id/upload", async (req,res)=>{
    try{
    if(req.files===null){
        return res.status(400).json({ msg: 'No file Uploaded'});
    }
    const file = req.files.file;
    file.name= file.name.split(path.extname(file.name))[0]+'-'+Date.now()+path.extname(file.name);
    file.mv(`../client/public/uploads/${file.name}`,err =>{
        if(err){
                console.error(err);
                return res.status(500).send(err);
            }
        });
        console.log(file.name);
        const results = await db.query(`UPDATE seller SET imgname = $1 where id=$2 returning *`, [file.name, req.params.id]);
        res.status(200).json({
        status: "success",
                data:{
                shops: results.rows[0],
            },

            });
    }catch(err){
        console.log(err);
    }
});
app.put("/api/v1/products/:id/upload", async (req,res)=>{
    try{
    if(req.files===null){
        return res.status(400).json({ msg: 'No file Uploaded'});
    }
    const file = req.files.file;
    file.name= file.name.split(path.extname(file.name))[0]+'-'+Date.now()+path.extname(file.name);
    file.mv(`../client/public/uploads/${file.name}`,err =>{
        if(err){
                console.error(err);
                return res.status(500).send(err);
            }
        });
        console.log(file.name);
        const results = await db.query(`UPDATE product SET imgname = $1 where id=$2 returning *`, [file.name, req.params.id]);
        res.status(200).json({
        status: "success",
                data:{
                shops: results.rows[0],
            },

            });
    }catch(err){
        console.log(err);
    }
});
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
app.get("/api/v1/shops/:id", async(req,res)=>{
    if((req.params.id)!="Dash"){
        console.log(typeof(parseInt(req.params.id)));
    try{
        const shop = await db.query(`SELECT * FROM seller WHERE id = $1`,[req.params.id]);
        const products = await db.query(`SELECT * FROM product WHERE (seller = $1 and live=true)`,[req.params.id]);
        res.status(200).json({
            status: "sucsess",
            data: {
                shop: shop.rows[0],
                products: products.rows
            },
        });
    }catch(err) {
        console.log(err);
    };};
});
//Get a shop in seller
app.get("/api/v1/sel/shops/:id", async(req,res)=>{
    if((req.params.id)!="Dash"){
        console.log(typeof(parseInt(req.params.id)));
    try{
        const shop = await db.query(`SELECT * FROM seller WHERE id = $1`,[req.params.id]);
        const products = await db.query(`SELECT * FROM product WHERE (seller = $1)`,[req.params.id]);
        res.status(200).json({
            status: "sucsess",
            data: {
                shop: shop.rows[0],
                products: products.rows
            },
        });
    }catch(err) {
        console.log(err);
    };};
});
//Get a shop product in seller
app.get("/api/v1/shops/:id/product/:pid", async(req,res)=>{
    try{
        const product = await db.query(`SELECT * FROM product WHERE (seller = $1 and id=$2)`,[req.params.id,req.params.pid]);
        res.status(200).json({
            status: "sucsess",
            data: {
                product: product.rows
            },
        });
    }catch(err) {
        console.log(err);
    };
});
//Get all shops on search
app.get("/api/v1/shops/search/:id", async (req,res) =>{
    try{var det=req.params.id;
        req.params.id=(req.params.id).toUpperCase();
        const results = await db.query(`SELECT * FROM seller where location  like '%' || $1 || '%' or name like '%' || $2 || '%' or detail like '%' || $3 || '%'`,[req.params.id ,req.params.id ,det]);
        const services = await db.query(`SELECT * FROM product WHERE (name like '%' || $1 || '%' or detail like '%' || $2 || '%')`,[req.params.id, det]);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                shops: results.rows,
                services: services.rows
            },
        });
    }catch(err){
        console.log(err);
    };
});
// Create a shop
app.post("/api/v1/shops/register", async(req,res) => {
    let errors = "";
    var hour=0;
    var minute=0;
    var hour2=0;
    var minute2=0;
    if (req.body.password.length < 6) {
        errors = errors.concat("i");
    }
    if (req.body.password != req.body.password2) {
        errors = errors.concat("o");
    }
    var splitTime3= req.body.servicetime.split(':');
    var hour3 = parseInt(splitTime3[0]);
    if (hour3 >= 1) {
        errors = errors.concat("t");
    }
    if (errors.length > 0){
        res.send(errors);
    }else{
        try{
            const results = await db.query(`SELECT * FROM seller WHERE (gst = $1 or name=$2)`,[req.body.gst, req.body.name]);
            if (results.rows.length > 0){
                errors = errors.concat("u");
            }else{
                var splitTime= req.body.opentime.split(':');
                hour = hour+parseInt(splitTime[0]);
                minute = minute+parseInt(splitTime[1]);
                hour = hour + minute/60;
                var splitTime2= req.body.closingtime.split(':');
                hour2 = hour2+parseInt(splitTime2[0]);
                minute2 = minute2+parseInt(splitTime2[1]);
                hour2 = hour2 + minute2/60;
                var totalthr=hour2-hour;
                if(totalthr<0){
                    errors=errors.concat("b")
                }else{
                    var slots="";
                    for(var i=0;i<totalthr;i++){
                        slots=slots+(req.body.numbslot).toString();
                    }
                    req.body.name=(req.body.name).toUpperCase();
                    req.body.location=(req.body.location).toUpperCase();
                    const results = await db.query(`INSERT INTO seller (imgname,name, gst, detail, location, opentime, totalthr, servicetime, numbslot,slots, password) values('no-image-available-icon.jpg',$1, $2, $3, $4, $5, $6,$7,$8,$9,$10) returning *`,
                    [req.body.name, req.body.gst,req.body.detail, req.body.location, req.body.opentime,totalthr,req.body.servicetime,req.body.numbslot ,slots ,req.body.password]);
                    res.status(201).json({
                    status: "success",
                    data: {
                        user: results.rows[0],
                    },
                });
            }
            }
        }catch(err){
            console.log(err);
        };
        if(errors.length>0){
            res.send(errors);
        };
    }
});
// Update shop
app.put("/api/v1/shops/:id", async(req,res) =>{
    try{
        const results = await db.query(`UPDATE seller SET slots = $1 where id=$2 returning *`, [req.body.slot, req.params.id]);
        res.status(200).json({
            status: "success",
            data:{
                shops: results.rows[0],
            },
        });
    }catch(err){
        console.log(err);
    }
});
//update a product
app.put("/api/v1/product/update/:id", async(req,res) =>{
    try{
        const results = await db.query(`UPDATE seller SET slots = $1 where id=$2 returning *`, [req.body.slot, req.params.id]);
        res.status(200).json({
            status: "success",
            data:{
                shops: results.rows[0],
            },
        });
    }catch(err){
        console.log(err);
    }
});
//login
app.put("/api/v1/user/login", async (req,res) => {
    let errors = "";
    try{
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
            };
        }else{
            errors = errors.concat("u");
        };
        if(errors.length>0){
            res.send(errors);
        };
    }catch(err){
        console.log(err);
    };
});
//login seller
app.put("/api/v1/seller/login", async (req,res) => {
    let errors = "";
    try{req.body.name=(req.body.name).toUpperCase();
        const results = await db.query(`SELECT * FROM seller WHERE name = $1`,[req.body.name]);
        if (results.rows.length > 0){
            const sresults = await db.query(`SELECT * FROM seller WHERE name=$1 and password = $2`,[req.body.name,req.body.password]);
            if (sresults.rows.length == 1){
                res.status(201).json({
                    status: "success",
                    data: {
                        user: sresults.rows[0],
                    },
                });
            }else{
                errors= errors.concat("i");
            };
        }else{
            errors = errors.concat("u");
        };
        if(errors.length>0){
            res.send(errors);
        };
    }catch(err){
        console.log(err);
    };
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
        try{
            const results = await db.query(`SELECT * FROM customer WHERE email = $1`,[email]);
            if (results.rows.length > 0){
                errors = errors.concat("u");
            }else{
                const results = await db.query(
                    `INSERT INTO customer (username, email, address, contact, location, password) values($1, $2, $3, $4, $5, $6) returning *`,
                    [username, email, address, contact, location, password]);
                res.status(201).json({
                    status: "success",
                    data: {
                        user: results.rows[0],
                    },
                });
            }
        }catch(err){
            console.log(err);
        };
        if(errors.length>0){
            res.send(errors);
        };
    }
});
//add product
app.post("/api/v1/shops/:id/add", async (req,res) => {
    console.log(req.params.id,req.body);
    try {const resu = await db.query(`SELECT name FROM seller WHERE id=${req.params.id}`);
    if(req.body.producttime==''){
        req.body.producttime=null;
    };
    if(req.body.productcount==''){
        req.body.productcount=null;
    };
    req.body.name=(req.body.name).toUpperCase();
        const results = await db.query(
            `INSERT INTO product (imgname,name, detail, sellername, price, producttime, seller, live, tcount) values('no-image-available-icon.jpg',$1, $2, $3, $4, $5, $6,TRUE,$7) returning *`,
            [req.body.name, req.body.detail,resu.rows[0].name, req.body.price, req.body.producttime, req.params.id,req.body.productcount]);
        res.status(201).json({
            status: "success",
            data: {
                product: results.rows[0],
            },
        });
    }catch(err){
        console.log(err);
    }
});
// Update Product
app.put("/api/v1/product/update/add/:id", async(req,res) =>{
    try{console.log("Updating");
    req.body.name=(req.body.name).toUpperCase();
    if(req.body.productcount==0){
        req.body.live=false;
    }
    console.log(req.body.productcount,req.body.live);
        const results = await db.query(`UPDATE product SET name=$1, price= $2, producttime= $3,live=$4, tcount=$6 where id=$5 returning *`, [req.body.name,req.body.price, req.body.producttime, req.body.live, req.params.id, req.body.productcount]);
        res.status(200).json({
            status: "success",
            data:{
                product: results.rows[0],
            },
        });
        console.log(results);
    }catch(err){
        console.log(err);
    }
});
//get shop slots
app.get("/api/v1/shops/:id/slot", async (req,res) =>{
    try{
        const shop = await db.query(`SELECT * FROM seller WHERE id = $1`,[req.params.id]);
        var length = Math.log(shop.rows[0].numbslot) * Math.LOG10E + 1 | 0;
        if(length==1){
            var slot = (shop.rows[0].slots).match(/.{1,1}/g).map(Number);
        }
        else if(length==2){
            var slot = (shop.rows[0].slots).match(/.{1,2}/g).map(Number);
        }else if(length==3){
            var slot = (shop.rows[0].slots).match(/.{1,3}/g).map(Number);
        }else if(length==4){
            var slot = (shop.rows[0].slots).match(/.{1,4}/g).map(Number);
        }else{
            var slot = (shop.rows[0].slots).match(/.{1,5}/g).map(Number);
        };
        res.status(200).json({
            status: "sucsess",
            data: {
                shop: shop.rows[0],
                slots: slot,
            },
        });
    }catch(err) {
        console.log(err);
    };
});
//adding slot to cart by updating from slot page 
app.put("/api/v1/user/:id/cart", async(req,res) =>{
    try{const results = await db.query(`select producttime,servicetime from cart c left join product p  on c.product=p.id left join seller s on c.seller=s.id where c.cuser=$1 and c.slot is null and c.seller=$2`, [req.params.id, req.body.seller]);
        console.log(req.params.id, req.body.seller,req.body.slot,results.rows);
        let errors = "";
        var hour=0;
        var minute=0;
        var second=0;
        for(var i=0;i<(results.rows.length);i++){
            if(results.rows[i].producttime==null){
                results.rows[i].producttime='00:00:00';
            }
            var splitTime= results.rows[i].producttime.split(':');
            hour = hour+parseInt(splitTime[0]);
            minute = minute+parseInt(splitTime[1]);
            hour = hour + minute/60;
            minute = minute%60;
            second = second+parseInt(splitTime[2]);
            minute = minute + second/60;
            second = second%60;};
        if(hour>1 && minute>0 && second>0){
            errors= errors.concat("You can't purchase this much items in this slot")        
        }else{
            const sresults = await db.query(`UPDATE cart SET slot=$1 where (cuser=$2 and seller=$3) returning *`, [req.body.slot, req.params.id, req.body.seller]);   
            res.status(200).json({
                status: "success",
                data:{
                    product: sresults.rows,
                },
            });
        };
        if(errors.length>0){
            res.send(errors);
        };
    }catch(err){
        console.log(err);
    };
});
//adding slot to cart by updating from slot page from cart page
app.put("/api/v1/user/:id/cart/:sid", async(req,res) =>{
    try{console.log("gee");
        const loc = await db.query(`select location from seller where id=${req.params.sid}`);
        console.log(loc,req.params.id,req.params.sid);
        const results = await db.query(`select c.slot,producttime,servicetime,s.location,p.name from cart c left join product p  on c.product=p.id left join seller s on c.seller=s.id where c.cuser=$1 and c.slot is not null and s.location=$2`, [req.params.id, loc.rows[0].location]);
        let unique_array = []
        console.log(results.rows);
        for(let i = 0;i < results.rows.length; i++){
            if(unique_array.indexOf(results.rows[i].slot) == -1){
                unique_array.push(results.rows[i].slot)
            }
        }
        let errors = "";
        var hour=0;
        var minute=0;
        var second=0;
        var lock=0;
        console.log("it's for",unique_array.length);
        for(var i=0;i<(unique_array.length);i++){
            console.log("i for loop 1");
            var splitTime= unique_array[i].split(':');
            hour = hour+parseInt(splitTime[0]);
            minute = minute+parseInt(splitTime[1]);
            hour = hour + minute/60;
            minute = minute%60;
            second = second+parseInt(splitTime[2]);
            minute = minute + second/60;
            second = second%60;
            lock=0;
            for(var j=0;j<(results.rows.length);j++){
                console.log("i for loop 2");
                if(results.rows[j].slot==unique_array[i]){
                    if(results.rows[j].producttime==null){
                        results.rows[j].producttime='00:00:00';
                    }
                    splitTime= results.rows[j].producttime.split(':');
                    hour = hour+parseInt(splitTime[0]);
                    minute = minute+parseInt(splitTime[1]);
                    hour = hour + minute/60;
                    minute = minute%60;
                    second = second+parseInt(splitTime[2]);
                    minute = minute + second/60;
                    second = second%60;
                    if(lock==0){
                        splitTime= results.rows[j].servicetime.split(':');
                        hour = hour+parseInt(splitTime[0]);
                        minute = minute+parseInt(splitTime[1]);
                        hour = hour + minute/60;
                        minute = minute%60;
                        second = second+parseInt(splitTime[2]);
                        minute = minute + second/60;
                        second = second%60;
                        lock=1;
                    };
                };
            };
            const prresults = await db.query(`select producttime,servicetime from cart c left join product p  on c.product=p.id left join seller s on c.seller=s.id where c.cuser=$1 and c.slot is null and c.seller=$2`, [req.params.id, req.body.seller]);
            for(var k=0;k<(prresults.rows.length);k++){
                if(prresults.rows[k].producttime==null){
                    prresults.rows[k].producttime='00:00:00';
                }
                console.log("i for loop 3");
                splitTime= prresults.rows[k].producttime.split(':');
                hour = hour+parseInt(splitTime[0]);
                minute = minute+parseInt(splitTime[1]);
                hour = hour + minute/60;
                minute = minute%60;
                second = second+parseInt(splitTime[2]);
                minute = minute + second/60;
                second = second%60;
            };
            if(hour>1 && minute>0 && second>0){
                errors= errors.concat("You can't purchase this much items in this slot")        
            }else{
                const sresults = await db.query(`UPDATE cart SET slot=$1 where (cuser=$2 and seller=$3) returning *`, [unique_array[i], req.params.id, req.params.sid]);   
                console.log("success");
                res.status(200).json({
                status: "success",
                data:{
                    product: sresults.rows,
                    },
                });
                break;
            };
        };
        if(errors.length>0){
            res.send(errors);
        };
    }catch(err){
        console.log(err);
    };
});
//getting myslots
app.get("/api/v1/user/:user/cart/:id", async(req,res) =>{
    try{const loc = await db.query(`select location from seller where id=${req.params.id}`);
    console.log("loc",loc.rows[0].location,req.params.user);
        const results = await db.query(`select c.cid,c.slot,p.name from cart c left join seller s on c.seller=s.id left join product p on c.product=p.id where c.cuser=$1 and s.location=$2 and c.slot is not null`, [req.params.user, loc.rows[0].location]);
        console.log("res",results.rows);
        res.status(200).json({
            status: "success",
            data:{
                slots: results.rows,
            }
        });  
    }catch(err){
        console.log(err);
    };
});
//delete a cart item
app.delete("/api/v1/user/:id/cart/:cid", async (req,res) =>{
    try{
        const results = await db.query(`DELETE FROM cart where cid= $1`,[req.params.cid]);
        res.status(204).json({
            status: "success",
        });
    }catch(err){
        console.log(err);
    }
});
//cart
app.get("/api/v1/user/:id/cart", async (req,res) =>{
    try{//and also make condition on paid=false
        const results = await db.query(`SELECT * FROM cart left join product on product=product.id WHERE cuser=$1 and paid='False'`,[req.params.id]);
        res.status(200).json({
            status: "success",
            data: {
                carts: results.rows,
            },
        });
    }catch(err){
        console.log(err);
    };
});
//orders
app.get("/api/v1/user/:id/order", async (req,res) =>{
    try{//and also make condition on paid=false
        const results = await db.query(`SELECT * FROM cart left join product on product=product.id WHERE cuser=$1 and paid='True'`,[req.params.id]);
        res.status(200).json({
            status: "success",
            data: {
                carts: results.rows,
            },
        });
    }catch(err){
        console.log(err);
    };
});
//seller orders
app.get("/api/v1/seller/:id/order", async (req,res) =>{
    try{//and also make condition on paid=false
        const results = await db.query(`SELECT * FROM cart c left join product p on c.product=p.id WHERE p.seller=$1 and c.paid='True'`,[req.params.id]);
        res.status(200).json({
            status: "success",
            data: {
                carts: results.rows,
            },
        });
    }catch(err){
        console.log(err);
    };
});
//add to cart
app.get("/api/v1/item/:id", async (req,res)=>{
    try{
        const results = await db.query(`SELECT * FROM product WHERE id=${req.params.id}`);
        res.status(200).json({
            status: "success",
            data: {
                carts: results.rows,
            },
        });
    }catch(err){
        console.log(err);
    };
});
app.post("/api/v1/user/:id/cart", async (req,res) => {
    try {
            const results = await db.query(
                `INSERT INTO cart (cuser, product, pcount, seller, paid) values($1, $2, $3, $4, $5) returning *`,
                [req.params.id, req.body.product, req.body.pcount, req.body.seller, req.body.paid]);
            res.status(201).json({
                status: "success",
                data: {
                    cart: results.rows[0],
                },
            });
        if(req.body.tcount!=null){
        if(req.body.tcount==0){
        var live=false;
    }else{
        var live=true;
    }
    console.log("changing live to sold out",req.body.pcount,live);
        const results = await db.query(`UPDATE product SET live=$1, tcount=$2 where id=$3 returning *`, [live,req.body.tcount, req.body.product]);
        res.status(200).json({
            status: "success",
            data:{
                product: results.rows[0],
            },
        });};
    }catch(err){
        console.log(err);
    }
});
app.post("/api/v1/razorpay/:total", async(req, res) => {
    const payment_capture = 1
    const amount = req.params.total;
    const currency = 'INR'
    const options = {
        amount: (amount * 100).toString(),
        currency,
        receipt: shortid.generate(),
        payment_capture
    }
    console.log(amount,typeof(amount));
    try {
        const response = await razorpay.orders.create(options)
        console.log(response)
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount
        })
    } catch (err) {
        console.log(err);
    };
});
// Delete Product

app.delete("/api/v1/product/:id", async (req,res) =>{
    try{const cresults = await db.query(`UPDATE product SET live=false where id=$1 returning *`, [req.params.id]);
        const results = await db.query(`DELETE FROM product where id= $1`,[req.params.id]);
        res.status(204).json({
            status: "success",
        });
    }catch(err){
        console.log(err);
    }
});
app.post('/api/v1/mail',(req,res) =>{
    console.log(req.body);
    const output= `
    <h1> CloudCart</h1>
    <h2>User Info:</h2>
    <ul>
        <li>User Name: ${req.body.name}</li>
        <li>User Email: ${req.body.mail}</li>
    </ul>
    <img style="width:300px; height: 300px;"  src="cid:logo" alt="Image Not available">
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
        user: 'cloudcart421@gmail.com', // generated ethereal user
        pass: dfhzh, // generated ethereal password
        },
        tls:{
            rejectUnauthorized: false
        }
    });

    // send mail with defined transport object
    let info = transporter.sendMail({
        from: '"CloudCart" <cloudcart421@gmail.com>', // sender address
        to: 'antopv19@gmail.com', // list of receivers
        subject: "MPAC Contact", // Subject line
        text: "Contact Message", // plain text body
        html: output,
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
});
const port = process.env.PORT || 3005;
app.listen(port, () =>{
    console.log(`server is up and listening port ${port}`);
});