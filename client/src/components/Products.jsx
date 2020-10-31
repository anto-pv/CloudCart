import React from 'react';

const Products = ({ products }) => {
    return(
        <div className="row row-cols-3 mb-2">
            <div className="card-deck">
            {products.map((product) => {
                return(
                    <div key={product.id} className="card mb=2" style={{maxWidth:"50%"}}>
                        <div className="card-header">
                            <span>{product.name}</span>
                        </div>
                        <div className="card-body">
                            <p className="ard-text">{product.detail}</p>
                            <p className="card-text">{product.price}</p>
                            <button type="button" class="btn btn-primary" data-toggle="modal" ><i class="fas fa-shopping-cart" id="cart-logo"  data-toggle="modal" data-target="#cart"></i> (<span class="total-count"></span>)</button>
                        </div>
                    </div>
                );
            })}</div>
        </div>
    );
};

export default Products;