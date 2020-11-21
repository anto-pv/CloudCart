import React,{ useState } from 'react';
import { useContext } from 'react';
import ShopFinder from '../apis/ShopFinder';
import { ShopContext } from '../context/ShopContext';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
const AddProduct = () => {
    const {addProducts} = useContext(ShopContext);
    const [name, setName] = useState("");
    const [detail, setDetail] = useState("");
    const [price, setPrice] = useState("");
    const [producttime, setProducttime]=useState("");
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(name,detail,price,producttime);
        try {const user = Cookies.get("user");
            const response = await ShopFinder.post(`/shops/${user}/add`,{
                name,
                detail,
                price,
                producttime
            });
            toast.success("Product is added");
            addProducts(response.data.data.product);
        } catch(err) {
            console.log(err);
        };
    };
    return(
        <div className="mb-4" style={{paddingTop: "50px"}}>
           <form action="">
                <div className="form-row">
                    <div className="col">
                    <label htmlFor="Name" style={{paddingBottom: "17px"}}><h6>Name     :</h6></label>
                       <input value={name} onChange={e =>setName(e.target.value)} type="text" className="form-control" placeholder="name"  required/>
                    </div>
                    <div className="col">
                    <label htmlFor="Detail"><h6>Detail(if Number:1 / Quantity Default =1 kg/1 lr) </h6></label>
                        <input value={detail} onChange={e =>setDetail(e.target.value)} className="form-control" type="text" placeholder="Detail"/>
                    </div>
                    <div className="col">
                    <label htmlFor="Price" style={{paddingBottom: "17px"}}><h6>Price of 1 No/Quantity</h6></label>
                        <input value={price} onChange={e =>setPrice(e.target.value)} className="form-control" type="text" placeholder="Price"  required/>
                    </div>
                    <div className="col">
                        <label htmlFor="producttime"><h6>Is this product/service takes time(if yes:Give avg) </h6></label>
                        <input type="time" id="producttime" value={producttime} onChange={e =>setProducttime(e.target.value)} className="form-control"/>
                    </div>
                    <div className="col" style={{paddingBottom: "17px"}}>
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary">Add</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;