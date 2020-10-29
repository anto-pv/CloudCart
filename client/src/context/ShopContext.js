import React, { useState,createContext } from "react";

export const ShopContext = createContext();
export const ShopContextPrrovider = props => {
    const [shops, setShops] = useState([]);
    return(
        <ShopContext.Provider value={{shops, setShops}}>
            {props.children}
        </ShopContext.Provider>
    );
};