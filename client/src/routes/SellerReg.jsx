import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ShopFinder from '../apis/ShopFinder';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
const Register = () => {
    let history = useHistory();
    const [name, setName] = useState("");
    const [gst,setGst] = useState("");
    const [detail, setDetail] = useState("");
    const [opentime, setOpentime] = useState("");
    const [location, setLocation] = useState("");
    const [closingtime, setClosingtime] = useState("");
    const [servicetime, setServicetime] = useState("");
    const [numbslot, setNumbslot] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const handleSubmit = async e => {
      try{
        e.preventDefault();
        if(opentime==''){
          setOpentime("09:00:00");
        }
        if(closingtime==''){
          setClosingtime("20:00:00");
        }
        const response = await ShopFinder.post("/shops/register",{
                name,
                gst,
                detail,
                location,
                opentime,
                closingtime,
                servicetime,
                numbslot,
                password,
                password2,
            });
            if (response.data.data===undefined){
                for (let letter of response.data) {
                    if (letter==='e'){
                        toast.error("Please, Enter all the fields");
                    };
                    if (letter==='t'){
                      toast.error("Customer can't be waited more than one hour");
                  };
                    if (letter==='i'){
                      toast.warn("Password Should be atleast 6 characters");
                    };
                    if (letter==='o'){
                      toast.error("Password don't match");
                    };
                    if (letter==='u'){
                      toast.error("Shop or Gst is alrady registered or username is taken");
                    };
                    if (letter==='b'){
                      toast.error("Closing time is smaller than opentime");
                  };
                };
            }else{
              toast.success("You are Registered");
              history.push("/shops/login");
            };
        } catch(err) {
            console.log(err);
        };
    };
    const login =()=>{
        history.push("/shops/login");
    };

    const mainHeader = {
        width: "100%",
        maxWidth: "100%",
        height: "150vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      };
      
      const forms = {
        width: "564px",
        height: "1100px",
        padding: "62px 48px",
        border: "1px solid #c2c2c2",
        borderRadius: "15px",
        textAlign: "start",
        fontFamily: "'Noto Sans', sans-serif",
        fontSize: "14px",
        marginBottom: "17px",
        color: "#212121"
      };
      const center2 = {
        display: "block",
        paddingTop: "20px",
        marginLeft: "auto",
        marginRight: "auto",
        paddingBottom: '20px'
      }
      const center = {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto"
      }
      const btnOrange = {
        backgroundColor: "#f54336",
        width: "100%",
        color: "#fff",
        borderRadius: "30px",
        marginTop: "10px",
        marginBottom: "10px",
        fontSize: "13px"
      };
      
      const h2 = {
        display: "block",
        paddingBottom: "45px",
        marginBottom: "17px",
        color: "#212121"
      };
      const formGroup = {
        marginBottom: "10px"
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
        "&::focus": {
          borderBottom: "1px solid #f54336",
          outline: "none",
          boxShadow: "none"
        }
      };
      
    return(
    <div>
        <img src="/images/logo_new.png" width="220" height="110" alt="logo" style={center2}/>
        <header id="main-header" style={mainHeader}>
          <div className="form" style={forms}>
            <form action="#" className="was-validated">
              <div className="form-group" style={formGroup}>
                <h2 style={h2}>Register</h2>
              </div>
              <div className="form-group" style={formGroup}>
                <input
                  value={name}
                  placeholder="Shop Name"
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  className="form-control"
                  style={formControl}
                  type="text"
                  required
                />
              </div>
              <div className="form-group" style={formGroup}>
                <input
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                  id="detail"
                  placeholder="Shop Detail"
                  className="form-control"
                  style={formControl}
                  type="text"
                />
              </div>
              <div className="form-group" style={formGroup}>
                <input
                  value={location}
                  placeholder="Location"
                  onChange={(e) => setLocation(e.target.value)}
                  id="location"
                  className="form-control"
                  style={formControl}
                  type="text"
                  required
                />
              </div>
              <div className="form-group" style={formGroup}>
                  <label type="label"><h6>Opening Time : </h6></label>
                  <select className="btn btn-success" value={opentime} style={center} onChange={e =>setOpentime(e.target.value)}>
                    <option value="09:00:00" defaultChecked>9:00 AM</option>
                    <option value="10:00:00">10:00 AM</option>
                    <option value="11:00:00">11:00 AM</option>
                    <option value="12:00:00">12:00 PM</option>
                    <option value="13:00:00">1:00 PM</option>
                    <option value="14:00:00">2:00 PM</option>
                    <option value="15:00:00">3:00 PM</option>
                    <option value="16:00:00">4:00 PM</option>
                    <option value="17:00:00">5:00 PM</option>
                  </select>
              </div>
              <div className="form-group" style={formGroup}>
                <label type="label"><h6>Closing Time : </h6></label>
                  <select className="btn btn-warning" value={closingtime} style={center} onChange={e =>setClosingtime(e.target.value)}>
                    <option value="20:00:00" defaultChecked>8:00 PM</option>
                    <option value="19:00:00">7:00 PM</option>
                    <option value="18:00:00">6:00 PM</option>
                    <option value="17:00:00">5:00 PM</option>
                    <option value="16:00:00">4:00 PM</option>
                    <option value="15:00:00">3:00 PM</option>
                    <option value="14:00:00">2:00 PM</option>
                    <option value="13:00:00">1:00 PM</option>
                    <option value="12:00:00">12:00 AM</option>
                  </select>
              </div>
              <div className="form-group" style={formGroup}>
                <input
                  type="text"
                  placeholder="Your Gst (For Verification)"
                  value={gst}
                  onChange={(e) => setGst(e.target.value)}
                  id="gst"
                  className="form-control"
                  style={formControl}
                  required
                />
              </div>
              <div className="form-group" style={formGroup}>
                <label htmlfor="servicetime"><h6>Service time:(Avg time for a customer(like packing): </h6></label>
                <input type="time" id="servicetime" value={servicetime} onChange={(e) => setServicetime(e.target.value)} className="form-control" style={formControl} required/>
              </div>
              <div className="form-group" style={formGroup}>
                <input
                  type="text"
                  placeholder="No of customer allowed in 1 hr"
                  value={numbslot}
                  onChange={(e) => setNumbslot(e.target.value)}
                  id="slot"
                  className="form-control"
                  style={formControl}
                  required
                />
              </div>
    
              <div className="form-group" style={formGroup}>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  className="form-control"
                  style={formControl}
                  required
                />
              </div>
    
              <div className="form-group" style={formGroup}>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  id="password2"
                  className="form-control"
                  style={formControl}
                  required
                />
              </div>
              <div className="form-group" style={formGroup}>
                <button
                  className="btn btn-lg btn-orange"
                  style={btnOrange}
                  onClick={handleSubmit}
                >
                  Register
                </button>
              </div>
              <div className="form-group" style={formGroup}></div>
              <div className="form-group" style={formGroup}>
                <p className="">
                  Already have an account?
                  <a href="login" onClick={login}>
                    {" "}
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        </header>
      </div>
    );
};
export default Register;