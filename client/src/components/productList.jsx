import React,{useEffect, useContext} from 'react';
import {useHistory} from "react-router-dom";
import  ShopFinder from '../apis/ShopFinder'
import { ShopContext } from '../context/ShopContext';
import Cookies from 'js-cookie';
const user = Cookies.get("user");
const ProductList = (props) => {
    const {selproducts, setselProducts} = useContext(ShopContext);
    let history = useHistory();
    useEffect(()=>{
        const fetchData = async() =>{
            try{console.log("iam",user,"in here")
                const response = await ShopFinder.get(`/shops/${user}`);
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
            setselProducts(selproducts.filter(selproduct => {
                return selproduct.id !== pid;
            }));
        }catch (err) {
            console.log(err);
        };
    };
    /*const handleUpdate = async(e, pid) =>{
        e.stopPropagation();
        try {
            const response = await ShopFinder.put(`/product/${pid}`,{
                //price:,
                //producttime:,
                //live
            });
        }catch (err) {
            console.log(err);
        };
    };*/
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
                    {selproducts && selproducts.map(selproduct=>{
                        return(<tr key={selproduct.id}>
                            <td>{selproduct.name}</td>
                            <td>{selproduct.sellername}</td>
                            <td>{selproduct.price}</td>
                            <td>reviews</td>
                            <td>
                            <button className="btn btn-warning">Update</button>
                            </td>
                            <td>
                            <button onClick={(e) => handleDelete(e, selproduct.id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
export default ProductList;