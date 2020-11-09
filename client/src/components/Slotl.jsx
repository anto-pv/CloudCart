import React from 'react';
import Cookies from 'js-cookie';
import { useHistory, useParams } from 'react-router-dom';
import ShopFinder from '../apis/ShopFinder';
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
        var time= (thr+i) +":"+tm+":00";
        if(thr<hr){
            return(<div className="alert alert-warning" role="alert">Sorry...This slots are unavailable now.....  
          </div>);
        }else{
            var time2= (thr+1+i) +":"+tm+":00";
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
            for(j = 0; j < ele.length; j++) { 
                if(ele[j].checked) 
                    var i = ele[j].value; 
            } 
        var arr = time.split(':');
        var thr = parseInt(arr[0]);
        var tslot= (thr+i) +":"+"00:00";
        try {
            const slotconfirm = await ShopFinder.put(`/user/${user}/cart`,{
                seller: id,
                slot: tslot
            });
            if (slotconfirm.data.data===undefined){
                    alert("You can't purchase this much items in this slot");
            }else{//here we need to split in that position and convert to in -1 and rejoin
                output=[];
                var length = Math.log(num) * Math.LOG10E + 1 | 0;
                for (var k = 0; k < slotno*length ; k +=1) {
                    if(k==i*length)
                        output.push(+sNumber.charAt(i));
                }
                const slotdec = await ShopFinder.put(`/shops/${id}`,{
                    slot: output.JOIN("")
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