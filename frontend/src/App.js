import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';

function App() {
    return (
        <BrowserRouter>
            <div className="grid-container">
                <header className="row">
                    <div>
                        <a className="title" href="/">Amazon</a>
                    </div>
                    <div>
                        <a href="/cart">Cart</a>
                        <a href="/signin">Sign In</a>
                    </div>
                </header>
                <main>
                    <Routes>
                        <Route path="/cart" element={<CartScreen />}></Route>
                        <Route path="/cart/:id" element={<CartScreen />}></Route>
                        <Route path="/product/:id" element={<ProductScreen />}></Route>
                        <Route path="/" element={<HomeScreen />} exact></Route>
                    </Routes>
                </main>
                <footer className="row center">All right reserved</footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
