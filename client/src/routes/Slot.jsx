import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ShopFinder from '../apis/ShopFinder';
import Header from '../components/Header';
import Myslot from '../components/myslots';
import Slotl from '../components/Slotl';
import { ShopContext } from '../context/ShopContext';
const Slot = () => {
    const {id} = useParams();
    const {slot, setSlot} = useContext(ShopContext);
    useEffect(()=>{
        const fetchData = async() =>{
            try{
                const response= await ShopFinder.get(`/shops/${id}/slot`);
                setSlot(response.data.data);
            }catch(err){
                console.log(err);
            };
        };
        fetchData();
    },[]);
    return (
        <div>
            <Header />
            <Myslot />
            <h6>*You can go back to cart and purcase more after confirming slot by at least one product payment </h6>
            <div className="container">
	            <h4>Choose your time slot</h4>
                <br/>
                {slot && (
                <>
                <h1 className="text-center display-1">{slot.shop.name}</h1>
                <Slotl slot={slot.slots} time={slot.shop.opentime} slotno={slot.shop.totalthr} sslot={slot.shop.slots} num={slot.shop.numbslot}/>
                </>
            )}</div>
        
                
        </div>
    );
};
export default Slot;