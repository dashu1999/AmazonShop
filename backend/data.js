import bcrypt from "bcryptjs/dist/bcrypt.js";


const data = {
    users: [
        {
            name: "Dashu",
            email: "dashu@gmail.com",
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
        },
        {
            name: "John",
            email: "user@gmail.com",
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
        },
    ],
    products: [
        {
            name: 'T-Shirt',
            category: 'Shirt',
            image: '/images/product1.jpeg',
            price: 120,
            countInStock: 5,
            brand: 'Dashu',
            rating: 4.5,
            numReviews: 30,
            description: 'high qulity',
        },
        {
            name: 'Pants',
            category: 'Men',
            image: '/images/product2.jpeg',
            price: 50,
            countInStock: 10,
            brand: 'Dashu',
            rating: 2.5,
            numReviews: 6,
            description: 'high qulity',
        },
        {
            name: 'Shirt',
            category: 'Shirt',
            image: '/images/product3.jpg',
            price: 250,
            countInStock: 0,
            brand: 'Dashu',
            rating: 3.5,
            numReviews: 12,
            description: 'high normal qulity',
        },
        {
            name: 'T-Shirt',
            category: 'Shirt',
            image: '/images/product4.jpg',
            price: 520,
            countInStock: 15,
            brand: 'Moj',
            rating: 5,
            numReviews: 20,
            description: 'nor high qulity',
        },
        {
            name: 'Chaddi',
            category: 'Men',
            image: '/images/product5.jpeg',
            price: 150,
            countInStock: 0,
            brand: 'Dashu',
            rating: 5,
            numReviews: 15,
            description: 'best qulity',
        },
    ],
};

export default data;