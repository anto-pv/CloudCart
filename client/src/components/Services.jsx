import React,{useEffect, useContext} from 'react';
import  ShopFinder from '../apis/ShopFinder'
import { ShopContext } from '../context/ShopContext';
import {useHistory} from "react-router-dom";
const Shops = (props) => {
    const {shops, setShops} = useContext(ShopContext);
    let history = useHistory();
    useEffect(()=>{
        const fetchData = async() =>{
            try{
                const response= await ShopFinder.get("/");
                setShops(response.data.data);
            }catch(err){
                console.log(err);
            };
        };
        fetchData();
    }, []);
    const handleShopSelect = (id) => {
        history.push(`/products/${id}`);
    };
    return(
        <div className="container">
            <div className="card-deck">
                {shops  && shops.map(shop =>{ 
                    return(<div  className="card border-dark mb-4" style={{width:"18rem"}} onClick={() => handleShopSelect(shop.id)} key={shop.id}>
                            <div className="card-header">{shop.name}</div>
                            <div className="card-body">{shop.detail}</div> 
                        </div>
                    );
                })}
            </div>          
        </div>
    );
};

export default Shops;