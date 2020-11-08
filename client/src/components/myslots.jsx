import React, { useContext, useEffect } from 'react';
import ShopFinder from '../apis/ShopFinder';
import Cookies from 'js-cookie';
import { ShopContext } from '../context/ShopContext';
const Myslot = () => {
    const user = Cookies.get("user");
    const {slot, setSlot} = useContext(ShopContext)
    useEffect(()=>{
        const fetchData = async() =>{
            try{
                const response= await ShopFinder.get(`/user/${user}/cart`);
                setSlot(response.data.data.carts);
            }catch(err){
                console.log(err);
            };
        };
        fetchData();
    },[]);
    const slotcheck=(slot)=>{
        if(slot.slot==null){
            setSlot(slot.filter(slot => {
                return slot.id !== slot.cid;
            }));}else{return(
                <div>
                    <button type="button" class="btn btn-primary">
                {slot.slot}
            </button>
                </div>
            )};
    };
    return (<div>{slot  && slot.map(slot =>{ return(
        <div>{slotcheck(slot)}
            <button type="button" class="btn btn-primary">
                {slot}
            </button>
        </div>
    );
    })}</div>);
};
export default Myslot;