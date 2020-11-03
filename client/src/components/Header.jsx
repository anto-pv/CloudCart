import React from 'react';
import AuthApi from '../apis/AuthApi';
import logo from '../images/logo_new.png';
import Cookies from 'js-cookie';
const Header = () => {
    const Auth = React.useContext(AuthApi);
    const logout =()=>{
        Auth.setAuth(false);
        Cookies.remove();
    };
    return(        
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/"><img src={logo} alt="Cloudcart" height="150px" width="200px" className="logo"/>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" size="60"/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
                <button type="button" className="btn btn-outline-dark" id="reg">Register</button>
                <button type="button" className="btn btn-outline-dark" onClick={logout}>Logout</button>
            </div>
        </nav>
    );
};

export default Header;