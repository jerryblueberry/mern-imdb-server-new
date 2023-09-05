const express = require("express");
const cors = require("cors");
const dbConnect = require('./db/dbConnect');
const productRoutes = require('./controller/product-controller')


const app = express();
app.use(express.json());

dbConnect();





app.use(cors());
app.use("/",productRoutes);


const PORT = 4000;

app.listen(PORT,() => console.log(`Listening on port ${PORT} `));
// app.use('/',require("./routes/productRoutes"));