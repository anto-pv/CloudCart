import React from 'react';
import Cookies from 'js-cookie';
import { useHistory, useParams } from 'react-router-dom';
import ShopFinder from '../apis/ShopFinder';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
const Slotl = ({slot,time,slotno,sslot,num}) => {
    const {id} = useParams();
    let history = useHistory();
    var today = new Date();
    var i =0;
    var hr = today.getHours();
    const user = Cookies.get("user");
    const checktime = (time,i,Array) =>{
        var arr = time.split(':');
        var thr = parseInt(arr[0]);
        var tm = parseInt(arr[1]);
        thr=thr+i;
        time= (thr) +":"+tm+":00";
        if(thr<=hr || parseInt(Array)==0){
            return(<div className="alert alert-warning" role="alert">Sorry...This slots are unavailable now.....  
          </div>);
        }else{
            var time2= (thr+1) +":"+tm+":00";
            return(
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={i}>
                        <label htmlFor="option">{time}-{time2}</label>
                        <input type="radio" id="option" name="selector" value={i}/>
                        <div className="check"><div className="inside"></div></div>
                        <span className="badge badge-primary badge-pill">{Array} slot left</span>
                    </li>
            );
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        var ele = document.getElementsByName('selector');    
            for(var j = 0; j < ele.length; j++) { 
                if(ele[j].checked) 
                    var i = ele[j].value; 
            } 
        var arr = time.split(':');
        var thr = parseInt(arr[0]);
        thr=thr+parseInt(i);
        var tslot= thr+":"+"00:00";
        console.log(i,thr,tslot);
        if(i==undefined){
            toast.warn("Select an slot first");
        };
        try {
            const slotconfirm = await ShopFinder.put(`/user/${user}/cart`,{
                seller: id,
                slot: tslot
            });
            if (slotconfirm.data.data===undefined){
                    alert("You can't purchase this much items in this slot");
            }else{//here we need to split in that position and convert to in -1 and rejoin
                var length = Math.log(num) * Math.LOG10E + 1 | 0;
                for (var k = 0; k < slotno*length ; k +=1) {
                    if(k==i*length)
                        {console.log(i,sslot);
                        sslot = sslot.substring(0,k)+(parseInt(sslot.substring(k,k+2))-1).toString()+sslot.substring(k+2);
                        console.log(i,sslot);};
                }
                const slotdec = await ShopFinder.put(`/shops/${id}`,{
                    slot: sslot
                });
                history.push(`/user/${user}/cart`);
            };
        } catch(err) {
            console.log(err);
        };
    };
    return (
        <div>
            <ul className="list-group" style={{backgroundColor: "#e8ffff"}}>
                {slot.map((Array) =>{
                    return(<div>
                        {checktime(time,i++,Array)}
                        </div>
                    );
                })}
            </ul>
            <button type="button" className="btn btn-success btn-lg btn-block" onClick={(e)=>handleSubmit(e)} id="proceed">Proceed</button>
        </div>
    );
};
export default Slotl;