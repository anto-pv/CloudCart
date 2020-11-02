import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ShopFinder from '../apis/ShopFinder';
import logo from '../images/logo_new.png';
const Login = () => {
    let history = useHistory();
    const [username, setName] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const Login = await ShopFinder.post(`/user/login`,{
                username,
                password
            });
        } catch(err) {
            console.log(err);
        };
        history.push("/");
    };
    const register =()=>{
        history.push("/user/register")
    };
    return(
        <div className="text-center">
            <form>
                <img className="mb-4" src={logo} alt="logo" width="200" height="150"/>
                <h1 class="h3 mb-3 font-weight-normal">Login</h1>
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
                </div>
            </form>
        </div>
    );
};
export default Login;