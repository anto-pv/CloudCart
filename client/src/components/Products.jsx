import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import ShopFinder from '../apis/ShopFinder';
import { toast } from 'react-toastify';
toast.configure();
const Products = ({ products }) => {
    const [selectedValue, setSelectedValue] = useState(3);
    const user = Cookies.get("user");
    const {id} = useParams();
    const handleSubmit = async (e, pid) => {
        e.preventDefault()
        try {
            const item = await ShopFinder.get(`/item/${pid}`);
            var tcount =item.data.data.carts[0].tcount;
            if(tcount!=null){
                tcount=tcount-selectedValue;
                console.log("18line",tcount);
                if(tcount<0){
                    toast.warn("Sorry this much amount of product is not available now, try less")
                }else{
                    const cartadd = await ShopFinder.post(`/user/${user}/cart`,{
                        product: pid,
                        pcount: selectedValue,
                        seller: id,
                        paid: false,
                        tcount: tcount
                    });
                    if(cartadd!=undefined){
                    toast.success("Product added to cart")}
                }
            }else{
            const cartadd = await ShopFinder.post(`/user/${user}/cart`,{
                product: pid,
                pcount: selectedValue,
                seller: id,
                paid: false,
                tcount: tcount
            });
            if(cartadd!=undefined){
            toast.success("Product added to cart")}};
        } catch(err) {
            console.log(err);
        }; 
    };
    return(
        <div className="container" style={{maxWidth: "110%"}}>
            <div className="row row-cols-4 mb-2" style={{position:"absolute",marginLeft:"30px"}}>
            {products.map((product) => {
                return(
                    <div key={product.id} className="card text-white bg-info mb-3 text-center col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-2" style={{marginRight:"6px",marginLeft:"6px"}}>
                        <div className="card-header">
                            <span>{product.name}</span>
                        </div>
                        <img src={`/uploads/${product.imgname}`} style={{border: "1px solid #ddd" , borderRadius: "4px", padding:"5px", height: "200px"}} className="card-img-top" alt="image missing" />
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