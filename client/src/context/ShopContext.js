import React, { useState,createContext } from "react";

export const ShopContext = createContext();
export const ShopContextPrrovider = props => {
    const [shops, setShops] = useState([]);
    const [products, setProducts] = useState(null);
    return(
        <ShopContext.Provider value={{shops, setShops, products, setProducts}}>
            {props.children}
        </ShopContext.Provider>
    );
};