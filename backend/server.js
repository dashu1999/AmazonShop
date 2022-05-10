import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from 'path';
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/uploadRouter.js";


dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/AmazonShop');

// const URI = "mongodb://127.0.0.1:27017/AmazonShop"

// const connectDB = async () => {
//     try {
//         const connection = await mongoose.connect(
//             process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/AmazonShop",
//             {

//                 useNewUrlParser: true,
//             }
//         )
//         console.log(`MongoDB connected: ${connection.connection.host}`);
//     } catch (error) {
//         console.log(`MongoDB error when connecting: ${error}`);
//     }
// }
// connectDB()


app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
app.use('/api/config/google', (req, res) => {
    res.send(process.env.GOOGLE_API_KEY || '');
});
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);
// app.get('/', (req, res) => {
//     res.send('Server is Ready');
// });

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});
