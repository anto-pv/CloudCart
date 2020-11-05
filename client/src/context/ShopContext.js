import React, { useState,createContext } from "react";

export const ShopContext = createContext();
export const ShopContextPrrovider = props => {
    const [shops, setShops] = useState([]);
    const [products, setProducts] = useState(null);
    const [user, setUser] = useState(null);
    return(
        <ShopContext.Provider value={{shops, setShops, products, setProducts, user, setUser}}>
            {props.children}
        </ShopContext.Provider>
    );
};