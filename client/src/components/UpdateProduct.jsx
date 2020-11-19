import React, {useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ShopFinder from "../apis/ShopFinder";
import Cookies from 'js-cookie';
const UpdateProduct = () => {
    const {id} = useParams();
    let history = useHistory();
    const [imgname, setimgName] = useState("");
    const [name, setName] = useState("");
    const [detail, setDetail] = useState("");
    const [price, setPrice] = useState("");
    const [producttime, setProducttime] = useState("");
    const [live, setLive] = useState("");
    useEffect(() =>{
        const fetchData = async() =>{
            const user = Cookies.get("user");
            const response =  await ShopFinder.get(`/shops/${user}/product/${id}`);
            setName(response.data.data.product[0].name);
            setimgName(response.data.data.product[0].imgname);
            setPrice(response.data.data.product[0].price);
            setDetail(response.data.data.product[0].detail);
            setProducttime(response.data.data.product[0].producttime);
            setLive(response.data.data.product[0].live);
        };
        fetchData();
    },[]);
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const UpdateRestaurant = await ShopFinder.put(`/product/update/${id}`,{
                name,
            });
        } catch(err) {
            console.log(err);
        };
        history.push("/shops/Dash");
    };
    const mainHeader = {width: "100%",
    maxWidth: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"};

    const forms = {
        width: "464px",
        height: "694px",
        padding: "62px 48px",
        border: "1px solid #c2c2c2",
        borderRadius: "15px",
        textAlign: "start",
        fontFamily: "'Noto Sans', sans-serif",
        fontSize: "14px",
        marginBottom: "17px",
        color: "#212121"
    };

    const btnOrange =  {
        backgroundColor: "#f54336",
        width: "100%",
        color: "#fff",
        borderRadius: "30px",
        marginTop: "10px",
        marginBottom: "10px",
        fontSize:"13px"
    };

    const h2 = {
        marginBottom: "17px ",
        color: "#212121"
    };
    const formGroup =  {
        marginBottom:"10px"
    };

    const formControl = {
        paddingTop: "30px",
        paddingLeft: "0",
        paddingBottom: "30px",
        outline: "none",
        border: "none",
        borderBottom: "1px solid #e0e2e6",
        borderRadius: "0px",
        marginTop: "10px", 
        '&::focus': {
             borderBottom: "1px solid #f54336",
             outline: "none",
             boxShadow: "none"
        }
    };
    return(
        <div>  
        <header id="main-header" style={mainHeader}>
        <img src={`/uploads/${imgname}`} alt="image missing" />
  <div className="form" style={forms}>
            <div className="form-group" style={formGroup}>
                <label htmlFor="name"><h2 style={h2}>Name</h2></label>
                <input value={name} onChange={e =>setName(e.target.value)} id="name" className="form-control" style={formControl} type="text"/>
            </div>
            <div className="form-group" style={formGroup}>
                <label htmlFor="Detail">Detail</label>
                <input value={detail} onChange={e =>setDetail(e.target.value)} id="detail" className="form-control" style={formControl} type="text"/>
            </div>
            <div className="form-group" style={formGroup}>
                <label htmlFor="producttime">Product Time (if it takes time to product be ready)</label>
                <input value={producttime} onChange={e =>setDetail(e.target.value)} id="detail" className="form-control" style={formControl} type="time"/>
            </div>
            <div className="form-group" style={formGroup}>
                <label htmlFor="price">Price</label>
                <input  value={price} onChange={e =>setPrice(e.target.value)} id="price" className="form-control" style={formControl} type="number"/>
            </div>
            <div className="form-group" style={formGroup}>
                <label htmlFor="Live">Live or Sold Out</label>
                <select className="btn btn-info" value={live} placeholder="Live" onChange={e =>setLive(e.target.value)} type="boolean">
            <option defaultChecked>{live}</option>
              <option value="TRUE">Available</option>
              <option value="FALSE">Sold Out</option>
                </select>
            </div>
            <button onClick={handleSubmit} className="btn btn-orange" style={btnOrange} >Submit</button>
        </div>
        </header>
        </div>
    );
};
export default UpdateProduct;