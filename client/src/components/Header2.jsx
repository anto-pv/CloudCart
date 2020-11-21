import React, { useContext } from 'react';
import AuthApi from '../apis/AuthApi';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
const Header2 = () => {
  let history =useHistory();
    const Auth = React.useContext(AuthApi);
    const logout =()=>{
        Auth.setAuth(false);
        Cookies.remove("user");
        history.push("/shops/login");
    };
    
      const nav = {
        background: "#222"
      };
      const logoutbutton = {
        border: "1px solid #df2933",
        color: "#df2933",
        padding: "7px 15px",
        width: "90px",
        transition: "0.4s",
        marginTop: "15px",
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
      const order =()=>{
        const id = Cookies.get("user");
        history.push(`/shops/${id}/order`);
    }; 
    return(        
        <nav className="navbar navbar-expand-lg navbar-dark teal mb-4" style={nav}>
            <a className="navbar-brand" href="/shops/Dash"><img src="/images/logo_new.png" alt="Cloudcart" height="50px" width="200px" style={{marginTop:"5px"}} className="logo"/>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarSupportedContent" style={{position: "absolute",marginLeft: "1300px"}}>
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
                <button type="button" className="btn btn-outline-dark pull-right" style={logoutbutton} onClick={logout}>Logout</button>
            </div>
        </nav>
    );
};

export default Header2;