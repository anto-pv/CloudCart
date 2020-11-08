/*import React,{useEffect, useContext} from 'react';
import  ShopFinder from '../apis/ShopFinder';
import { ShopContext } from '../context/ShopContext';
import {useHistory} from "react-router-dom";
const CartList = (props) => {
    const {products, setProducts} = useContext(ShopContext);
    let history = useHistory();
    useEffect(()=>{
        const fetchData = async() =>{
            try{
                const response= await ShopFinder.get(`/user/${id}/cart`);
                setProducts(response.data.data.restaurants);
            }catch(err){
                console.log(err);
            };
        };
        fetchData();
    }, []);
    const handleDelete = async (e, id) =>{
        e.stopPropagation();
        try {
            const response = await ShopFinder.delete(`/user/${id}/cart`);
            setProducts(restaurants.filter(restaurant => {
                return restaurant.id !== id;
            }));
        }catch (err) {
            console.log(err);
        };
    };
    const handleProductSelect = (id) => {
        history.push(`/product/${id}`);
    };
    return(
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Restaurant</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price_Range</th>
                        <th scope="col">Ratings</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map(product=>{
                        return(<tr onClick={() => handleProductSelect(product.id)} key={product.id}>
                            <td>{product.name}</td>
                            <td>{"$".repeat(restaurant.price_range)}</td>
                            <td>reviews</td>
                            <td>
                            <button onClick={(e) => handleDelete(e, restaurant.id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default CartList;*/