import express from "express";

import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";


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



app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

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
