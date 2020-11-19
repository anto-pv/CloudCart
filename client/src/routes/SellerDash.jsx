import React, { useState } from 'react';
import AddProduct from '../components/Addproduct';
import ProductList from '../components/productList';
import ShopFinder from '../apis/ShopFinder';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory, useParams } from 'react-router-dom';
import Header2 from '../components/Header2';
toast.configure()
const Dash = () => {
    let history = useHistory();
    let {id} = useParams();
    const [file, setFile] = useState("");
    const [filename, setFilename] = useState('Choose File:');
    const onChange =e =>{
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }
    const onSubmit =async () =>{
        const formData = new FormData();
        formData.append('file',file);
        try{
            const res = await ShopFinder.put(`/shops/${id}/upload`, formData,{
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success("Image successfully Uploaded");
            history.push("/shops/Dash");
        }catch(err){
            if(err.response.status === 500){
              toast.error('image is not uploaded correctly');
            }
        };
    };
    return (
        <div>
            <Header2 />
            <div className="container">
            <div>
           <form onSubmit={onSubmit}><div className='custom-file mb-4'>
        <input type='file' className='custom-file-input' id='customFile' onChange={onChange}/>
        <label className='custom-file-label' htmlFor='customFile'>{filename}</label>

    </div>
    <input type='submit' value='Upload' className='btn btn-primary btn-block mt-4'/></form>
    </div>
            <AddProduct />
            <ProductList/>
            </div>
            </div>
    );
};
export default Dash;