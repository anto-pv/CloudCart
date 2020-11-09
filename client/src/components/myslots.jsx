import React, { useContext, useEffect } from 'react';
import ShopFinder from '../apis/ShopFinder';
import Cookies from 'js-cookie';
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
const Myslot = () => {
    const {id} = useParams();
    const user = Cookies.get("user");
    const {myslot, setMYSlot} = useContext(ShopContext);
    useEffect(()=>{
        const fetchData = async() =>{
            try{
                const response= await ShopFinder.get(`/user/${user}/cart/${id}`);
                setMYSlot(response.data.data.slots);
            }catch(err){
                console.log(err);
            };
        };
        fetchData();
    },[]);
    return (<div>
        <button type="button" className="btn btn-primary">
            {myslot  && myslot.map(slot =>{ return(
            <div key={slot.cid}>      
                {slot.slot}<span className="badge badge-light">{slot.name}</span>   
            </div>
            );
        })}</button>
    </div>);
};
export default Myslot;