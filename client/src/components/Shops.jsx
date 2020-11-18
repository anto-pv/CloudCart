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
                const response= await ShopFinder.get("/shops/");
                setShops(response.data.data.shops);
            }catch(err){
                console.log(err);
            };
        };
        fetchData();
    },[]);
    const handleShopSelect = (id) => {
        history.push(`/shops/${id}`);
    };
    return(
        <div className="row row-cols-4 mb-2">
            <div className="card-deck">
                {shops  && shops.map(shop =>{ 
                    return(
                        <div  key={shop.id} className="card text-white bg-success mb-3" style={{maxWidth:"60%",height:"20rem"}} onClick={() => handleShopSelect(shop.id)} key={shop.id}>
                            <img src={`/uploads${shop.imgname}`} className="card-img-top" alt="no image"/>
                            <div class="card-body">
                                <div className="card-title">{shop.name}</div>
                                <div className="card-text">{shop.detail}</div>
                            </div> 
                        </div>
                    );
                })}
            </div>          
        </div>
    );
};

export default Shops;