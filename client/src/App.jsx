import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Home from './routes/Home';
import UpdateProduct from "./routes/UpdateProduct";
import ShopDetailPage from "./routes/ShopDetailPage";
import ProductPage from "./routes/ProductPage";
import { ShopContextPrrovider } from './context/ShopContext';
import Register from './routes/Register';
import Login from './routes/Login';
import Cookies from 'js-cookie';
//login
import AuthApi from "./apis/AuthApi";

const App = () => {
    const [auth,setAuth] = React.useState(false);
    const readCookie = () => {
        const user = Cookies.get("user");
        if (user){
            setAuth(true);
        }
    }
    React.useEffect(() =>{
        readCookie();
    }, [])
    return(
        <ShopContextPrrovider>
            <div>
                <AuthApi.Provider value={{auth,setAuth}}>
                <Router>
                    <Routes/>
                </Router>
                </AuthApi.Provider>
            </div>
        </ShopContextPrrovider>
    ); 
};
const Routes = () =>{
    const Auth = React.useContext(AuthApi)
    return(
        <Switch>
            <ProtectedLogin exact path="/user/login" auth={Auth.auth} component ={Login}/>
            <ProtectedRoute exact path="/" auth={Auth.auth} component ={Home}/>
            <Route exact path="/shops/:id" auth={Auth.auth} component ={ShopDetailPage}/>
            <Route exact path="/shops/:id/update" auth={Auth.auth} component ={UpdateProduct}/>
            <Route exact path="/product/:id/" auth={Auth.auth} component ={ProductPage}/>
            <Route exact path="/user/register" component ={Register}/>
        </Switch>
    );
};

const ProtectedRoute = ({auth,component:Component,...rest}) =>{
    return(
        <Route
        {...rest}
        render ={()=>auth? (
            <Component/>
        ):
            (
                <Redirect to="/user/login"/>
            )
    }
        />
    )
}
const ProtectedLogin = ({auth,component:Component,...rest}) =>{
    return(
        <Route
        {...rest}
        render ={()=>!auth? (
            <Component/>
        ):
            (
                <Redirect to="/"/>
            )
    }
        />
    )
}

export default App;