import React,{useEffect, useContext} from 'react';
import {useHistory} from "react-router-dom";
import  ShopFinder from '../apis/ShopFinder'
import { ShopContext } from '../context/ShopContext';
import Cookies from 'js-cookie';
const ProductList = (props) => {
    const {selProducts, setselProducts} = useContext(ShopContext);
    let history = useHistory();
    useEffect(()=>{
        const fetchData = async() =>{
            try{const user = Cookies.get("user");
                console.log("iam",user,"in here");
                const response = await ShopFinder.get(`/sel/shops/${user}`);
                setselProducts(response.data.data.products);
            }catch(err){
                console.log(err);
            };
        };
        fetchData();
    }, []);
    const handleDelete = async (e, pid) =>{
        e.stopPropagation();
        try {
            const response = await ShopFinder.delete(`/product/${pid}`);
            console.log(response);
            setselProducts(selProducts.filter(selProduct => {
                return selProduct.id !== pid;
            }));
        }catch (err) {
            console.log(err);
        };
    };
    const handleProductSelect = (e,pid) => {
        e.stopPropagation();
        history.push(`/products/${pid}`);
    };
    const live =(val)=>{
        if(val==true){
            return(<div>Available</div>);
        }else{
            return(<div>Soldout</div>);
        }
    }
    return(
        <div className="container" style={{maxWidth: "120%",paddingRight:"550px",marginRight:"150px"}}>
        <div className="row row-cols-4 mb-2" style={{position:"absolute"}}>
                    {selProducts && selProducts.map(selProduct=>{
                        console.log(selProduct);
                        return(
                            <div key={selProduct.id} className="card text-white bg-info mb-3 text-center col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-3" style={{marginRight:"6px",marginLeft:"30px"}} onClick={(e) => handleProductSelect(e, selProduct.id)}>
                        <img src={`/uploads/${selProduct.imgname}`} className="card-img-top" alt="image missing" />
                        <div className="card-body">
                            <div className="card-title">{selProduct.name}</div>
                        <button className="btn btn-info">{live(selProduct.live)}</button>
                        <div className="card-text">{selProduct.detail}<p>{selProduct.price} RS</p></div>
                        </div> 
                            <button onClick={(e) => handleDelete(e, selProduct.id)} className="btn btn-danger">Delete</button>
                            </div>
                        );
                    })}
                </div>
        </div>
    );
};
export default ProductList;