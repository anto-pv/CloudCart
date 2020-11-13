import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthApi from '../apis/AuthApi';
import ShopFinder from '../apis/ShopFinder';
import logo from '../images/logo_new.png';
import Cookies from 'js-cookie';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
const Login = () => {
    const Auth = React.useContext(AuthApi);
    const {user, setUser} = useContext(ShopContext);
    let history = useHistory();
    const [username, setName] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const Login = await ShopFinder.put(`/user/login`,{
                username,
                password
            });
            if (Login.data.data===undefined){
                for (let letter of Login.data) {
                    if (letter==='i'){
                        toast.warn("Password is not correct");
                    };
                    if (letter==='u'){
                        toast.error("Invalid user name,Register if not..");
                    };
                };
            }else{
                setUser(Login.data.data.user);
                Cookies.set("user",user.id);
                Auth.setAuth(true);
                console.log("started")
            };
        } catch(err) {
            console.log(err);
        };
        
    };
    const register =()=>{
        history.push("/user/register")
    };
    return(
        <div className="text-center">
            <form>
                <img className="mb-4" src={logo} alt="logo" width="200" height="150"/>
                <h1 className="h3 mb-3 font-weight-normal">Login</h1>
                <div className = "form-group">
                    <label htmlFor="name">Name   :</label>
                    <input value={username} onChange={e =>setName(e.target.value)} id="username" className="form-control-sm" type="text" required/>
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
                    <a href="/shops/login" className="btn btn-outline-dark"> Are you seller?</a>
                </div>
            </form>
        </div>
    );
};
export default Login;