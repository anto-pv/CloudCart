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
    return(<div className="container" style={{maxWidth: "110%"}}>
            <div className="row row-cols-4 mb-2" style={{position:"absolute",marginLeft:"30px"}}>
                {shops  && shops.map(shop =>{ 
                    return(
                        <div className="card text-white bg-success mb-3 text-center col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-2" style={{marginRight:"6px",marginLeft:"30px"}} onClick={() => handleShopSelect(shop.id)} key={shop.id}>
                            <img src={`/uploads/${shop.imgname}`} style={{border: "1px solid #ddd" , borderRadius: "4px", padding:"5px", height: "200px"}} className="card-img-top" alt="image missing" />
                            <div className="card-body">
                                <div className="card-title">{shop.name}</div>
                                <div className="card-text">{shop.location}</div>
                            </div> 
                        </div>
                    );
                })}
            </div>
            </div>          
    );
};

export default Shops;