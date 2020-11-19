import React, { useState,createContext } from "react";

export const ShopContext = createContext();
export const ShopContextPrrovider = props => {
    const [shops, setShops] = useState([]);
    const [products, setProducts] = useState(null);
    const [selProducts, setselProducts] = useState(null);
    const [slot, setSlot] = useState(null);
    const [myslot, setMYSlot] = useState(null);
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    const addProducts = (selProduct) => {
        setselProducts([...selProducts, selProduct]);
    };
    return(
        <ShopContext.Provider value={{shops, setShops,addProducts, products, setProducts, user, setUser, slot, setSlot, cart, setCart,myslot ,setMYSlot, selProducts, setselProducts}}>
            {props.children}
        </ShopContext.Provider>
    );
};