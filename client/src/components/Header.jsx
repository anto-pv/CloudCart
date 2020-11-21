import React, { useState } from 'react';
import AuthApi from '../apis/AuthApi';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
const Header = () => {
    let history = useHistory();
    const Auth = React.useContext(AuthApi);
    const [searchValue, setSearchValue] = useState();
    const logout =()=>{
        Auth.setAuth(false);
        Cookies.remove("user");
    };
    const cart =()=>{
        const id = Cookies.get("user");
        history.push(`/user/${id}/cart`);
    };
    const order =()=>{
      const id = Cookies.get("user");
      history.push(`/user/${id}/order`);
  };
    const idnav = {
        background: "#222",
        overflow: "hidden",
        textAlign: "center",
        padding: "5px",
        margin: "0",
        boxShadow: "0px 5px 25px #333"
      };
      
      const nav = {
        background: "#222"
      };
      
      const li = {
        listStyleType: "none"
      };
      
      const a = {
        float: "right",
        margin: "10px 30px 10px 0px",
        padding: "5px",
        display: "inline",
        textDecoration: "none",
        color: "white",
        borderRadius: "4px"
      };
      
      /* buttons */
      
      const contact = {
        border: "1px solid #df2933",
        color: "#df2933",
        padding: "7px 15px",
        width: "90px",
        transition: "0.4s",
        marginTop: "15px"
      };
      
      const faq = {
        border: "1px solid #fcad35",
        color: "#fcad35",
        padding: "0px 10px",
        width: "100px",
        marginTop: "15px",
        transition: "0.4s"
      };
      
      const orderbutton = {
        border: "1px solid #3366ff",
        color: "#3366ff",
        padding: "7px 10px",
        width: "80px",
        marginTop: "15px",
        transition: "0.4s",
        marginRight: "10px"
      };
      const cartbutton = {
        border: "1px solid #fcad35",
        color: "#fcad35",
        padding: "7px 10px",
        width: "80px",
        marginTop: "15px",
        transition: "0.4s",
        marginRight: "10px"
      };
      const logoutbutton = {
        border: "1px solid #df2933",
        color: "#df2933",
        padding: "7px 15px",
        width: "90px",
        transition: "0.4s",
        marginTop: "15px"
      };
      
      const form = {
        marginLeft: "-200px",
        marginTop: "5px"
      };
      
      const input = {
        marginLeft: "-100px",
        marginTop: "15px"
      };
      
      const button = {
        marginTop: "15px",
        marginRight: "10px"
      };
      
      const img = {
        marginTop: "-35px",
        paddingright: "10px",
        float: "left"
      };
      
      const searchbutton = {
        marginTop: "15px",
        marginRight: "30px",
        marginLeft: "-70px"
      };
      
      const search = {
        marginLeft: "-600px"
      };  
    const searchs =()=>{
        if(searchValue==undefined){
          toast.warn("You should type anything to be searched")
        }else{
        history.push(`/shops/search/${searchValue}`);};
    };    
    return(        
        <nav className="navbar navbar-expand-lg navbar-dark teal mb-4" style={nav}>
            <a className="navbar-brand" href="/Home"><img src="/images/logo_new.png" alt="Cloudcart" height="50px" width="200px" style={{marginTop:"5px"}} className="logo"/>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item dropdown">
                    </li>
                </ul>
                <form className="form">
                    <input id="search" value={searchValue} onChange={e =>setSearchValue(e.target.value)} className="form-control search" type="text" placeholder="Search" aria-label="Search" size="110" style={input}/>
                    </form>
                    <button
                        className="btn btn-outline-success"
                        type="button"
                        style={searchbutton}
                        onClick={searchs}>   
                        Search
                    </button>
                    <button
                    type="button"
                    className="btn btn-outline-dark"
                    style={orderbutton}
                >
                    <i 
                        className="fas fa-shopping-bag"
                        id="order-logo"
                        data-toggle="modal"
                        data-target="#oreder"
                        onClick={order}>
                    </i>
              </button>
                    <button
                        type="button"
                        className="btn btn-outline-dark"
                        style={cartbutton}
                    >
                        <i 
                            className="fas fa-shopping-cart"
                            id="cart-logo"
                            data-toggle="modal"
                            data-target="#cart"
                            onClick={cart}>
                        </i>
                </button>
                <button type="button" className="btn btn-outline-dark" style={logoutbutton} onClick={logout}>Logout</button>
            </div>
        </nav>
    );
};

export default Header;