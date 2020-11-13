import React from 'react';
import AddProduct from '../components/Addproduct';
import Header from '../components/Header';
import ProductList from '../components/productList';
const Dash = () => {
    return (
        <div className="container">
            <AddProduct />
            <ProductList/>
        </div>
    );
};
export default Dash;