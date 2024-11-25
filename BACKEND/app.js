const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectdb = require('./init/index.js');
const connectcloudinary = require('./init/cloudinary.js');
const userRouter = require('./routers/userroute.js');
const ProductRouter = require('./routers/productroute.js');
const cartRouter = require('./routers/cartrouter.js');
const orderRouter = require('./routers/orderroute.js');
const app = express();
const port = 8080;


// Middleware
app.use(express.json());
app.use(cors());

connectdb();
connectcloudinary();


app.use('/api/user', userRouter);
app.use('/api/products', ProductRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);

app.get('/', (req, res) => {
    res.send('API is working');
});

app.get('/', (req, res) => {
    res.send('API is working');
});

app.get('/help', (req, res) => {
    res.send('API is working for help');
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});


