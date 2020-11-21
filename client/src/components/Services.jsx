import React,{useEffect, useContext, useState} from 'react';
import  ShopFinder from '../apis/ShopFinder';
import {useHistory, useParams} from "react-router-dom";
import Cookies from 'js-cookie';
import Header from "./Header";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
const Service = (props) => {
    const {id} =useParams();
    const [shops, setShops] = useState('');
    const [products, setProducts] = useState('');
    const [selectedValue, setSelectedValue] = useState(3);
    const user = Cookies.get("user");
    let history = useHistory();
    useEffect(()=>{
        const fetchData = async() =>{
            try{
                const response= await ShopFinder.get(`/shops/search/${id}`);
                setShops(response.data.data.shops);
                setProducts(response.data.data.services);
                console.log(response.data.data);
            }catch(err){
                console.log(err);
            };
        };
        fetchData();
    }, []);
    const handleShopSelect = (id) => {
        history.push(`/shops/${id}`);
    };
    const handleSubmit = async (e, pid,seller) => {
        e.preventDefault()
        try {
            const cartadd = await ShopFinder.post(`/user/${user}/cart`,{
                product: pid,
                pcount: selectedValue,
                seller: seller,
                paid: false,
            });
            if(cartadd!=undefined){
            toast.success("Product added to cart")}
        } catch(err) {
            console.log(err);
        }; 
    };
    return(<div><Header />
        <div className="container"  style={{maxWidth: "110%"}}>
            <h1 style={{position:"relative",paddingTop: "30px",paddingBottom: "30px"}}><center>Search Results on "{id}"</center></h1>
            <div className="row row-cols-4 mb-2" style={{position:"absolute",marginLeft:"10px"}}>
                {shops  && shops.map(shop =>{ 
                    return(
                        <div className="card text-white bg-success mb-3 text-center col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-2" style={{marginRight:"6px",marginLeft:"30px"}} onClick={() => handleShopSelect(shop.id)} key={shop.id}>
                            <img src={`/uploads/${shop.imgname}`} className="card-img-top" alt="image missing" />
                            <div className="card-body">
                                <div className="card-title">{shop.name}</div>
                                <div className="card-text">{shop.detail}</div>
                            </div> 
                        </div>
                    );
                })}
            </div>
            <div className="row row-cols-4 mb-2" style={{position:"absolute",marginLeft:"10px"}}>
            {products && products.map(product => {
                return(
                    <div key={product.id} className="card text-white bg-info mb-3 text-center col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-2" style={{marginRight:"6px",marginLeft:"6px"}}>
                        <div className="card-header">
                            <span>{product.name}</span>
                        </div>
                        <img src={`/uploads/${product.imgname}`} className="card-img-top" alt="image missing" />
                        <div className="card-body">
                            <p className="ard-text">{product.detail}</p>
                            <p className="card-text">{product.price*selectedValue}</p>
                            <div className="btn-group dropright">
                                <button type="button" className="btn btn-success" onClick={(e)=>handleSubmit(e, product.id,product.seller)} data-toggle="modal" ><i className="fas fa-shopping-cart" id="cart-logo"  data-toggle="modal" data-target="#cart"></i></button>
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
        </div></div>
    );
};

export default Service;