import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ShopFinder from '../apis/ShopFinder';
const Register = () => {
    let history = useHistory();
    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [location, setLocation] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const handleSubmit = async () => {
        try {
            const response = await ShopFinder.post("/user/register",{
                username,
                email,
                address,
                contact,
                location,
                password,
                password2
            });
            if (response.data.data===undefined){
                for (let letter of response.data) {
                    if (letter==='e'){
                        alert("Please, Enter all the fields");
                    };
                    if (letter==='i'){
                        alert("Password Should be atleast 6 characters");
                    };
                    if (letter==='o'){
                        alert("Password don't match");
                    };
                    if (letter==='u'){
                        alert("Email is alrady registered or username is taken");
                    };
                };
            }else{
                alert("You are Registered");
                history.push('/user/login');
            };
        } catch(err) {
            console.log(err);
        };
    };
    const login =()=>{
        history.push("/user/login")
    };
    return(
        <div>
            <div className = "form-group">
                <label htmlFor="name">Name</label>
                <input value={username} onChange={e =>setName(e.target.value)} id="username" className="form-control" type="text" required/>
            </div>
            <div className = "form-group">
                <label htmlFor="email">Email</label>
                <input value={email} onChange={e =>setEmail(e.target.value)} id="email" className="form-control" type="email" required/>
            </div>
            <div className = "form-group">
                <label htmlFor="address">Address</label>
                <input value={address} onChange={e =>setAddress(e.target.value)} id="address" className="form-control" type="address" required/>
            </div>
            <div className = "form-group">
                <label htmlFor="contact">Contact</label>
                <input value={contact} onChange={e =>setContact(e.target.value)} id="contact" className="form-control" type="contact" required/>
            </div>
            <div className = "form-group">
                <label htmlFor="location">Location</label>
                <input value={location} onChange={e =>setLocation(e.target.value)} id="location" className="form-control" type="location" required/>
            </div>
            <div className = "form-group">
                <label htmlFor="password">Password</label>
                <input  value={password} onChange={e =>setPassword(e.target.value)} id="password" className="form-control" type="password" required/>
            </div>
            <div className = "form-group">
                <label htmlFor="password2">Confirm Password</label>
                <input  value={password2} onChange={e =>setPassword2(e.target.value)} id="password2" className="form-control" type="password" required/>
            </div>
            <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
            <button onClick={login} className="btn btn-primary">Are you already registered? Login Here..</button>
        </div>
    );
};
export default Register;