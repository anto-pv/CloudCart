import React, { useContext } from 'react';
import AuthApi from '../apis/AuthApi';
import Cookies from 'js-cookie';
const Header2 = () => {
    const Auth = React.useContext(AuthApi);
    const logout =()=>{
        Auth.setAuth(false);
        Cookies.remove("user");
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
    return(        
        <nav className="navbar navbar-expand-lg navbar-dark teal mb-4" style={nav}>
            <a className="navbar-brand" href="/Home"><img src="/images/logo_new.png" alt="Cloudcart" height="50px" width="200px" className="logo"/>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarSupportedContent">
                <button type="button" className="btn btn-outline-dark pull-right" style={logoutbutton} onClick={logout}>Logout</button>
            </div>
        </nav>
    );
};

export default Header2;