import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthApi from '../apis/AuthApi';
import ShopFinder from '../apis/ShopFinder';
import logo from '../images/logo_new.png';
import Cookies from 'js-cookie';
import { ShopContext } from '../context/ShopContext';
const SellerLogin = () => {
    const Auth = React.useContext(AuthApi);
    const {user, setUser} = useContext(ShopContext);
    let history = useHistory();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const Login = await ShopFinder.post(`/seller/login`,{
                name,
                password
            });
            if (Login.data.data===undefined){
                for (let letter of Login.data) {
                    if (letter==='i'){
                        alert("Password is not correct");
                    };
                    if (letter==='u'){
                        alert("Invalid Shop name,Register if not..");
                    };
                };
            }else{
                setUser(Login.data.data.user);
                Auth.setAuth(true);
                Cookies.set("user",user.id);
                history.push(`/shops/${user.id}/dash`);
            };
        } catch(err) {
            console.log(err);
        };
    };
    const register =()=>{
        history.push("/shops/register")
    };

    return (
        <div className="text-center">
            <form>
                <img className="mb-4" src={logo} alt="logo" width="200" height="150"/>
                <h1 className="h3 mb-3 font-weight-normal">Login</h1>
                <div className = "form-group">
                    <label htmlFor="name">Name   :</label>
                    <input value={name} onChange={e =>setName(e.target.value)} id="username" className="form-control-sm" type="text" required/>
                </div>
                <div className = "form-group">
                    <label htmlFor="password">Password:</label>
                    <input  value={password} onChange={e =>setPassword(e.target.value)} id="password" className="form-control-sm" type="password" required/>
                </div>
                <div>
                    <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
                </div>
                <div>
                    <button onClick={register} className="btn btn-outline-dark">Register Here</button>
                </div>
            </form>
        </div>
    );
};
export default SellerLogin;