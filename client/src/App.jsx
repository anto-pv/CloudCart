import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Home from './routes/Home';
import ShopDetailPage from "./routes/ShopDetailPage";
import { ShopContextPrrovider } from './context/ShopContext';
import Register from './routes/Register';
import Login from './routes/Login';
import Cookies from 'js-cookie';
//commericalpage-login/register/seller/register/sellerlogin-Home/SellerDash-ShopDetailPage-Cart-(searching for slot&& taking slot which will be temperoty if not checkout)Slot-Cart-Checkout
import AuthApi from "./apis/AuthApi";
import FrontPage from './routes/CommercialFront';
import Cart from './routes/Cart';
import SellerDash from './routes/SellerDash';
import Checkout from './routes/Checkout';
import SellerLogin from './routes/SellerLogin';
import SellerReg from './routes/SellerReg';
import Slot from './routes/Slot';

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
            <ProtectedRoute exact path="/Home" auth={Auth.auth} component ={Home}/>
            <Route exact path="/" component ={FrontPage}/>
            <Route exact path="/shops/register" component = {SellerReg}/>
            <Route exact path="/shops/login" component = {SellerLogin}/>
            <ProtectedRoute exact path="/shops/:id" auth={Auth.auth} component ={ShopDetailPage}/>
            <Route exact path="/shops/:id/dash" component ={SellerDash}/>
            <ProtectedLogin exact path="/user/register" auth={Auth.auth} component ={Register}/>
            <ProtectedRoute exact path="/user/:id/cart" auth={Auth.auth} component = {Cart}/>
            <ProtectedRoute exact path="/shops/:id/slot" auth={Auth.auth} component = {Slot}/>
            <ProtectedRoute exact path="/user/:id/cart/Checkout/:p" auth={Auth.auth} component = {Checkout}/>
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
        render ={()=>(!auth)? (
            <Component/>
        ):
            (
                <Redirect to="/Home"/>
            )
    }
        />
    )
}

export default App;