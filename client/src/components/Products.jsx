import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import ShopFinder from '../apis/ShopFinder';
const Products = ({ products }) => {
    const [selectedValue, setSelectedValue] = useState(3);
    const user = Cookies.get("user");
    const {id} = useParams();
    const handleSubmit = async (e, pid) => {
        e.preventDefault()
        try {
            const cartadd = await ShopFinder.post(`/user/${user}/cart`,{
                product: pid,
                pcount: selectedValue,
                seller: id,
                paid: false,
            });
            if(cartadd!=undefined){
            alert("Product added to cart")}
        } catch(err) {
            console.log(err);
        }; 
    };
    return(
        <div className="row row-cols-3 mb-2">
            <div className="card-deck">
            {products.map((product) => {
                return(
                    <div key={product.id} className="card mb=3" style={{maxWidth:"60%"}}>
                        <div className="card-header">
                            <span>{product.name}</span>
                        </div>
                        <div className="card-body">
                            <p className="ard-text">{product.detail}</p>
                            <p className="card-text">{product.price*selectedValue}</p>
                            <div className="btn-group dropright">
                                <button type="button" className="btn btn-success" onClick={(e)=>handleSubmit(e, product.id)} data-toggle="modal" ><i className="fas fa-shopping-cart" id="cart-logo"  data-toggle="modal" data-target="#cart"></i></button>
                                <select className="btn btn-info" value={selectedValue} onChange={e =>setSelectedValue(e.target.value)}>
                                  <option disabled>Quantity</option>
                                  <option value="1">1 Qty</option>
                                  <option value="2">2 Qty</option>
                                  <option value="3">3 Qty</option>
                                  <option value="4">4 Qty</option>
                                  <option value="5">5 Qty</option>
                                  <option value="6">6 Qty</option>
                                </select>
                            </div>
                        </div>
                    </div>
                );
            })}</div>
        </div>
    );
};

export default Products;