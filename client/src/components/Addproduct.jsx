import React,{ useState } from 'react';
import { useContext } from 'react';
import ShopFinder from '../apis/ShopFinder';
import { ShopContext } from '../context/ShopContext';
import Cookies from 'js-cookie';
const user = Cookies.get("user");
const AddProduct = () => {
    const {addProducts} = useContext(ShopContext);
    const [name, setName] = useState("");
    const [detail, setDetail] = useState("");
    const [price, setPrice] = useState("");
    const [producttime, setProducttime]=useState("");
    const [live,setLive]=useState("");
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await ShopFinder.post(`/shops/${user}/add`,{
                name,
                detail,
                price,
                producttime,
                live
            });
            addProducts(response.data.data.product);
        } catch(err) {
            console.log(err);
        };
    };
    return(
        <div className="mb-4">
           <form action="">
                <div className="form-row">
                    <div className="col">
                       <input value={name} onChange={e =>setName(e.target.value)} type="text" className="form-control" placeholder="name"/>
                    </div>
                    <div className="col">
                        <input value={detail} onChange={e =>setDetail(e.target.value)} className="form-control" type="text" placeholder="Detail"/>
                    </div>
                    <div className="col">
                        <input value={price} onChange={e =>setPrice(e.target.value)} className="form-control" type="text" placeholder="Detail"/>
                    </div>
                    <div className="col">
                        <input value={producttime} onChange={e =>setProducttime(e.target.value)} className="form-control" type="text" placeholder="Detail"/>
                    </div>
                    <div className="col">
                        <input value={live} onChange={e =>setLive(e.target.value)} className="form-control" type="text" placeholder="Detail"/>
                    </div>
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary">Add</button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;