import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from './routes/Home';
import UpdateProduct from "./routes/UpdateProduct";
import ShopDetailPage from "./routes/ShopDetailPage";
import ProductPage from "./routes/ProductPage";
import { ShopContextPrrovider } from './context/ShopContext';
const App = () => {
    return(
        <ShopContextPrrovider>
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/" component ={Home}/>
                        <Route exact path="/shops/:id" component ={ShopDetailPage}/>
                        <Route exact path="/shops/:id/update" component ={UpdateProduct}/>
                        <Route exact path="/product/:id/" component ={ProductPage}/>
                    </Switch>
                </Router>
            </div>
        </ShopContextPrrovider>
    ); 
};


export default App;