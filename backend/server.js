import express from "express";
import data from "./data.js";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";


const app = express();



// mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/AmazonShop');

const URI = "mongodb://127.0.0.1:27017/AmazonShop"
const connectDB = async () => {
    try {
        const connection = await mongoose.connect(
            URI,
            {
                
                useNewUrlParser: true,
            }
        )
        console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch (error) {
        console.log(`MongoDB error when connecting: ${error}`);
    }
}
connectDB()

app.get('/api/products/:id', (req, res) => {
    
    const product =data.products.find(x => x._id === req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product not Found' });
    }
});

app.get('/api/products', (req, res) => {
    res.send(data.products);
});

app.use('/api/users', userRouter);

app.get('/', (req, res) => {
    res.send('Server is Ready');
});

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});
