import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ShopFinder from '../apis/ShopFinder';
const FrontPage = () => {
    let history = useHistory();
    const login =()=>{
        history.push("/user/login");
    };
    const register =()=>{
        history.push("/user/register");
    };
    const seller =()=>{
        history.push("/shops/login");
    };
    const h1 = {
        fontFamily: "'Vollkorn', serif",
        fontSize: "45px",
        marginTop: "-12px",
        marginBottom: "25px",
        marginLeft: "250px"
      };
      
      const h3 = {
        fontFamily: "'Vollkorn', serif"
      };
      
      const h4 = {
        fontFamily: "'Vollkorn', serif"
      };
      
      const p = {
        fontFamily: "' Rubik', sans-serif",
        fontFamily: "'Vollkorn', serif",
        color: "#9a9292"
      };
      
      const span = {
        fontFamily: "' Rubik', sans-serif",
        fontFamily: "'Vollkorn', serif",
        fontSize: "49px"
      };
      
      const img = {
        width: "100%"
      };
      
      const banner = {
        background: "no-repeat center center",
        backgroundSize: "cover",
        paddingTop: "160px",
        paddingBottom: "0px",
        position: "relative",
        zIndex: "1"
      };
      
      const banner_content = {
        color: "#000000",
        fontSize: "45px",
        marginTop: "-12px",
        marginBottom: "25px",
        '::after' :{
          content: "",
          background: "#f3f0f0de",
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: "-1",
          height: "100%",
          width: "100%"
        } 
      };
      
      
      const box_content = {
        color: "#000000",
        fontSize: "49px",
        fontWeight: "lighter",
        fontSize: "22px",
        margin: "21px"
      };
      
      const cmn_btn = {
        color: "#fff",
        background: "#1d2d50",
        border: "none",
        padding: "9px 15px",
        borderRadius: "20px",
        marginBottom: "100px",
        marginRight: "10px"
      };
      
      const gingerbread_house_asterclass = {
        background: "#f5f5f5"
      };
      
      const contact = {
        background: "#f5f5f5"
      };
      
      const contact_heading = {
        fontSize: "28px"
      };
      
      /* footer_area css */
      
      const footer_area = {
        background: "#f5f5f5"
      };
      
      const site_template = {
        background: "#F9F9F9"
      };
      
      const site_template_img = {
        height: "225px",
        width: "220px"
      };
      
      const formControl = {
        color: "#000 !important",
        border: "none",
        borderBottom: "1px solid #524f4f",
        background: "none",
        marginBottom: "20px",
        borderRadius: "0"
      };
      
      const contact_form = {
        width: "60%",
        margin: "auto"
      };
      const [name, setName] = useState("");
      const [email, setEamil] = useState("");
      const [message, setMessage] = useState("");
      const handleSubmit = async (e) => {
        console.log("sdfa");
        e.preventDefault()
        try {
            const mail = await ShopFinder.post(`/mail`,{
                name,
                email,
                message
            });
        } catch(err) {
            console.log(err);
        };
    };
    return (<div>
        <div className="banner text-center" style={banner}>
          <img src="/images/logo_new.png" height="150px" width="1000px" alt="logo" style = {{marginLeft :"20px"}}/>
          <br />
          <br />
          <br />
          <div className="container">
            <div className="row">
              <div className="banner_content" style={{paddingRight: "100px"}}>
                <p></p>
                <h1 style={h1}>Book what you need & Get it when you like.</h1>
                <div style={{marginLeft:"200px"}}>
                <button className="cmn_btn" style={cmn_btn} onClick={register} id="myBtn">
                 User  Register
                </button>{" "}
                <button className="cmn_btn" style={cmn_btn} onClick={login} id="#login">
                  User Login
                </button>
                <button className="cmn_btn" style={cmn_btn} onClick={seller} id="#seller">
                  Seller Login
                </button></div>
              </div>
            </div>
          </div>
        </div>
    
        <div
          className="gingerbread_house_asterclassName p-5 text-center"
          id="About"
          style={gingerbread_house_asterclass}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <img src="/images/corona.png" alt="corona" style = {{height :"270px"}} />
              </div>
              <div className="col-lg-6 align-self-center">
                <h4>About Us</h4>
                <br />
                <p>
                  This website is created by a group of students to tackle the
                  difficulties faced by people while shopping during this COVID-19
                  pandemic.We came to know that the number of people allowed inside
                  any shop at a time is reduced due to COVID-19. So,the amount of
                  time people have to wait outside has been increased.This is
                  difficult.Right? So what if you can book all the products you want
                  from any shop and be able to choose the time during which you want
                  to collect the products. Sounds good right? Well,that's what this
                  website allows you to do. I have a passion to learn the best
                  practices when designing UX/UI for the web.
                </p>
              </div>
            </div>
          </div>
        </div>
    
        <div className="site_template_heading p-5" style={site_template}>
          <h3>AVAILABLE AREAS</h3>
        </div>
        <div
          className="d-flex flex-row flex-wrap m-auto"
          style={{ padding: "0px 73px", background: "#F9F9F9" }}
        >
          <div
            className="p-1 "
            style={{ width: "220px", margin: "10px!important" }}
          >
            <p>THRISSUR</p>
          </div>
    
          <div className="p-1" style={{ width: "220px", margin: "10px!important" }}>
            <p>ERNAKULAM</p>
          </div>
    
          <div className="p-1" style={{ width: "220px", margin: "10px!important" }}>
            <p>KOZHIKODE</p>
          </div>
    
          <div
            className="p-1 "
            style={{ width: "220px", margin: "10px!important" }}
          >
            <p>KOTTAYAM</p>
          </div>
    
          <div className="p-1" style={{ width: "220px", margin: "10px!important" }}>
            <p>KOLLAM</p>
          </div>
        </div>
    
        <div className="contact text-center p-5" style={{ background: "#F9F9F9" }}>
          <div className="container">
            <div className="row">
              <div className="contact_heading pb-4">
                <h4>Contact Us</h4>
              </div>
              <div className="contact_form" style={contact_form}>
              <p> ClouCart1244@gmail.com{"            "}</p><p>antopv833@gmail.com{"        "}</p><p>yadhuk@gmail.com{"   "} </p><p>vivehmohan@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};
export default FrontPage;