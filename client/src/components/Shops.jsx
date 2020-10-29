import React,{useEffect, useContext} from 'react';
import  ShopFinder from '../apis/ShopFinder'
import { ShopContext } from '../context/ShopContex';
import {useHistory} from "react-router-dom";
const Shops = (props) => {
    const {shops, setShops} = useContext(ShopContext);
    let history = useHistory();
    useEffect(()=>{
        const fetchData = async() =>{
            try{
                const response= await ShopFinder.get("/");
                setShops(response.data.data.shops);
            }catch(err){
                console.log(err);
            };
        };
        fetchData();
    }, []);
    const handleShopSelect = (id) => {
        history.push(`/shops/${id}`);
    };
    return(
        <div className="container">
            {shops && shops.map(shop =>{ 
                return(<div className="card" onClick={() => handleshopSelect(shop.id)} key={shop.id}>
                            <div className="card-header">{restaurant.name}</div>
                            <div className="card-body">{restaurant.detail}</div>
                            <button onClick={(e)=>handleUpdate(e, restaurant.id)} className="btn btn-warning">Update</button>
                            </td>
                            <td>
                            <button onClick={(e) => handleDelete(e, restaurant.id)} className="btn btn-danger">Delete</button>
                            </td>
        </div>
    );
};

export default Header;