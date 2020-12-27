# CloudCart
The purpose of this project is to help people to buy and book services according to their needs , base aon a time slot sitting at home thereby reducing the exposure to outside environment especially during this pandemic.
<br>
![CloudCart](https://github.com/anto-pv/CloudCart-Preview/blob/main/public/images/logo_new.png)
<br>
Front-end preview of CloudCart<br><br>
You can watch the preview in :heart_eyes: [Here](https://anto-pv.github.io/CloudCart-Preview/):<br>

## Reproduction:
<ol>
<li>
git clone https://github.com/anto-pv/CloudCart.git
</li>
<li>Create new database in postgres and add the 'insert queries' in sql files in the database folder</li>
<li>Open server folder, add new file .env and open .env and add these:
<br>

```

PORT= #port number for server
PGUSER= #postgres database name default 'postgres'
PGHOST=localhost
PGPASSWORD= #database password
PGDATABASE= #your database name for this project
PGPORT=#postgres installation port default '5432'
Razorpaysec=#Razorpay key for payment if have
```
</li><li>add this .env file to .gitignore</li><li>split terminal

- In terminal 1:
`cd server`
- In terminal 2:
`cd client`
- In terminal 1:
`npm install`
- In terminal 2:
`npm install`
- In terminal 1:
`npm start`
- In terminal 2:
`npm start`</li></ol>

## Stack used:

![pern](https://sitepoint.us/img/coupons/pern-stack-build-a-yelp-clone-postgresexpressreactnode.png)


## Database 
:elephant::elephant::elephant::elephant::elephant:
