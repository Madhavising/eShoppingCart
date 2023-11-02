import React, { useState } from 'react';
import './ProductPage.css';
import jsonData from './products.json';

const ProductPage = () => {
    const [cart, setCart] = useState([]);
    const [productQuantities, setProductQuantities] = useState({});

    const addToCart = (product) => {
        const quantity = productQuantities[product.name] || 1;
        const itemsToAdd = Array(quantity).fill(product);
        setCart([...cart, ...itemsToAdd]);
        console.log(`Product "${product.name}" added to the cart.`);
    };

    const removeFromCart = (product) => {
        const updatedCart = cart.filter((item) => item !== product);
        setCart(updatedCart);
        console.log(`Product "${product.name}" removed from the cart.`);
    };

    const incrementQuantity = (productName) => {
        const updatedQuantities = { ...productQuantities };
        updatedQuantities[productName] = (updatedQuantities[productName] || 1) + 1;
        setProductQuantities(updatedQuantities);
    };

    const decrementQuantity = (productName) => {
        const updatedQuantities = { ...productQuantities };
        if (updatedQuantities[productName] > 1) {
            updatedQuantities[productName] -= 1;
            setProductQuantities(updatedQuantities);
        }
    };

    const calculateTotalBill = () => {
        return cart.reduce((total, product) => total + product.price, 0);
    };

    return (
        <div>
            <div className="categories">
                {jsonData.data.map((category, index) => (
                    <div key={index}>
                        <h2>{category.name}</h2>
                        {category.productList.map((product, productIndex) => (
                            <div key={productIndex} className="product-box">
                                <p>Name: {product.name}</p>
                                <p>Price: ${product.price}</p>
                                <div className="quantity-controls">
                                    <label className="quantity-label" htmlFor={`quantity_${product.name}`}>Quantity:</label>
                                    <button className="quantity-button" onClick={() => decrementQuantity(product.name)}>-</button>
                                    <input
                                        type="number"
                                        id={`quantity_${product.name}`}
                                        value={productQuantities[product.name] || 1}
                                        readOnly
                                        className="quantity-input"
                                    />
                                    <button className="quantity-button" onClick={() => incrementQuantity(product.name)}>+</button>
                                </div>
                                <button
                                    className="cart-button"
                                    onClick={() => {
                                        addToCart(product);
                                        console.log(`Added "${product.name}" to the cart.`);
                                    }}
                                >
                                    Add to Cart
                                </button>
                                <button
                                    className="cart-button"
                                    onClick={() => {
                                        removeFromCart(product);
                                        console.log(`Removed "${product.name}" from the cart.`);
                                    }}
                                >
                                    Remove from Cart
                                </button>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="cart">
                <h2>Shopping Cart</h2>
                <ul>
                    {cart.map((item, index) => (
                        <li key={index}>{item.name} - ${item.price}</li>
                    ))}
                </ul>
                <p>Total Bill: ${calculateTotalBill()}</p>
            </div>
        </div>
    );
};

export default ProductPage;
