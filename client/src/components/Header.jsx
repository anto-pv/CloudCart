import React from 'react';
import logo from '../images/logo_new.png';

const Header = () => {
    return(        
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="/"><img src={logo} alt="Cloudcart" height="150px" width="200px" class="logo"/>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li>
                    </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" size="60"/>
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
                <button type="button" class="btn btn-outline-dark" id="reg">Register</button>
                <button type="button" class="btn btn-outline-dark" onclick="Login()">Login</button>
            </div>
        </nav>
    );
};

export default Header;