import React,{useEffect, useContext} from 'react';
import Header from '../components/Header';
import Products from '../components/Products';
import { useParams } from "react-router-dom";
import  ShopFinder from '../apis/ShopFinder'
import { ShopContext } from '../context/ShopContext';
const ShopDetailPage = () => {
    const {id} = useParams();
    const {products, setProducts} = useContext(ShopContext);
    useEffect(()=>{
        const fetchData = async() =>{
            try{
                const response= await ShopFinder.get(`/shops/${id}`);
                setProducts(response.data.data);
            }catch(err){
                console.log(err);
            };
        };
        fetchData();
    },[]);
    return(
        <div>
            <Header />
            <div className="container">
                {products && (
                <>
                <h1 className="text-center display-1">{products.shop.name}</h1>
                <Products products={products.products}/>
                </>
            )}</div>
        </div>
    );
};

export default ShopDetailPage;