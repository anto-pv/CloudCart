import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthApi from '../apis/AuthApi';
import ShopFinder from '../apis/ShopFinder';
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
                Auth.setAuth(true)
                console.log("started")
            };
        } catch(err) {
            console.log(err);
        };
        
    };
    const register =()=>{
        history.push("/user/register")
    };

    const mainHeader = {width: "100%",
    maxWidth: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"};

    const forms = {
        width: "444px",
        height: "494px",
        padding: "62px 48px",
        border: "1px solid #c2c2c2",
        borderRadius: "15px",
        textAlign: "start",
        fontFamily: "'Noto Sans', sans-serif",
        fontSize: "14px",
        marginBottom: "17px",
        color: "#212121"
    };

    const btnOrange =  {
        backgroundColor: "#f54336",
        width: "100%",
        color: "#fff",
        borderRadius: "30px",
        marginTop: "10px",
        marginBottom: "10px",
        fontSize:"13px"
    };

    const h2 = {
        marginBottom: "17px ",
        color: "#212121"
    };
    const formGroup =  {
        marginBottom:"10px"
    };

    const formControl = {
        paddingTop: "30px",
        paddingLeft: "0",
        paddingBottom: "30px",
        outline: "none",
        border: "none",
        borderBottom: "1px solid #e0e2e6",
        borderRadius: "0px",
        marginTop: "10px", 
        '&::focus': {
             borderBottom: "1px solid #f54336",
             outline: "none",
             boxShadow: "none"
        }
    };
    const center = {
      display: "block",
      paddingTop: "30px",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "30px"
      }
    return(
        <div>
        <img src = "/images/logo_new.png" href="/Home" width="220" height="80" alt = "logo" style={center}/>
            <header id="main-header" style={mainHeader}>
      <div className="form" style={forms}>
        <form action="#" className="was-validated">
          <div className="form-group" style={formGroup}>
            <h2 style={h2}>Login.</h2>
          </div>
          <div className="form-group" style={formGroup}>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setName(e.target.value)}
              id="username"
              className="form-control"
              style={formControl}
              required
            />
            <div className="valid-feedback">Valid.</div>
          </div>

          <div className="form-group" style={formGroup}>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              className="form-control"
              style={formControl}
              required
            />
            <div className="valid-feedback">Valid.</div>
          </div>
          <div className="form-group" style={formGroup}>
            <button className="btn btn-lg btn-orange" style={btnOrange} onClick = {handleSubmit}>
              LogIn
            </button>
          </div>
          <div className="form-group" style={formGroup}></div>
          <div className="form-group" style={formGroup}>
            <p className="">
              Don't have an account?<a href="/user/register" onClick = {register}> Register</a>
            </p>
            <p className="">
              Are you an Seller?<a href="/shops/login">Seller Login</a>
            </p>
          </div>
        </form>
      </div>
    </header>
  </div>
    )
};
export default Login;