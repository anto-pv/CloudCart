import React from 'react';
import Cookies from 'js-cookie';
import { useHistory, useParams } from 'react-router-dom';
import ShopFinder from '../apis/ShopFinder';
const Slotl = ({slot,time}) => {
    const {id} = useParams();
    let history = useHistory();
    var today = new Date();
    var i =0;
    var hr = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var def = hr + ":" + m + ":" + s;
    if(time<def){
        hr=hr+1;
        time = hr +":"+"00"+":"+"00";
    };
    const user = Cookies.get("user");
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const slotconfirm = await ShopFinder.put(`/user/${user}/cart`,{
                seller:id,
                slot: Array[i]
            });
        } catch(err) {
            console.log(err);
        };
        history.push(`/user/${user}/cart/Checkout`);
    };
    return (
        <div>
            <ul className="list-group" style={{backgroundColor: "#e8ffff"}}>
                {slot.map((Array) =>{
                    return(
                        <li className="list-group-item d-flex justify-content-between align-items-center" key={i}>
                            <label htmlFor="option">{i++,time=(hr)+":"+"00"+":"+"00"}-{time=(++hr)+":"+"00"+":"+"00"}</label>
                            <input type="radio" id="option" name="selector"/>
                            <div className="check"><div className="inside"></div></div>
                            <span className="badge badge-primary badge-pill">{Array} slot left</span>
                        </li>
                    );
                })}
            </ul>
            <button type="button" className="btn btn-success btn-lg btn-block" onClick={handleSubmit} id="proceed">Proceed</button>
        </div>
    );
};
export default Slotl;