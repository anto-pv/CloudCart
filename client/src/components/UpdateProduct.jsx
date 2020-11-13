import React, {useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";

const UpdateProduct = () => {
    const {id} = useParams();
    let history = useHistory();
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("Price Range");
    useEffect(() =>{
        const fetchData = async() =>{
            const response =  await RestaurantFinder.get(`/${id}`);
            setName(response.data.data.restaurant.name);
            setLocation(response.data.data.restaurant.location);
            setPriceRange(response.data.data.restaurant.price_range);
        };
        fetchData();
    },[]);
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const UpdateRestaurant = await RestaurantFinder.put(`/${id}`,{
                name,
                location,
                price_range: priceRange
            });
        } catch(err) {
            console.log(err);
        };
        history.push("/");
    };
    return(
        <div>
            <div className = "form-group">
                <label htmlFor="name">Name</label>
                <input value={name} onChange={e =>setName(e.target.value)} id="name" className="form-control" type="text"/>
            </div>
            <div className = "form-group">
                <label htmlFor="location">Location</label>
                <input value={location} onChange={e =>setLocation(e.target.value)} id="location" className="form-control" type="text"/>
            </div>
            <div className = "form-group">
                <label htmlFor="price_range">Price range</label>
                <input  value={priceRange} onChange={e =>setPriceRange(e.target.value)} id="price_range" className="form-control" type="number"/>
            </div>
            <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
        </div>
    );
};
export default UpdateProduct;