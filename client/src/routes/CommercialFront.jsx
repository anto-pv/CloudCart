import React from 'react';
import { useHistory } from 'react-router-dom';
const FrontPage = () => {
    let history = useHistory();
    const login =()=>{
        history.push("/user/login");
    };
    return (<div style={{
        backgroundImage: "url(images/cart1.jpg)",
        backgroundSize: "1700px 800px",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#eff48e",
      }}>
            <div className="container-fluid" >
                <div className="part1">
                    <div class="heading">
                        <h1>Welcome to</h1>
                        <h1><img src="/images/logo_new.png" class="img" width="300px"/></h1>
                    </div>
                    <h5>A Booking Website for all your needs.</h5>
                </div>
                <div class="button">
                    <button type="button" class="btn btn-outline-dark"  id="myBtn"><i class="fas fa-user-plus"></i> Register</button>
                    <button type="button" class="btn btn-outline-dark" onClick={login} id="#login">Login</button>
                </div>
                <div id="myModal" class="modal">
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <p class="qn">How do you want to register?</p>
                        <button class ="btn btn-outline-dark" onclick="Registration()">As Seller</button>
                        <br/>
                        <button class ="btn btn-outline-dark" onclick="creg()">As Customer</button>
                    </div>
                </div>
                <div class="col-md-7">
                    <h2 class="featurette-heading">About Us </h2>
                    <p class="lead">Hello Customer!Welcome to Cloudcart.
                    This website is created by a group of students to tackle the difficulties faced by people while shopping during this COVID-19 pandemic.We came to know that the number of people allowed inside any shop at a time is reduced due to COVID-19.So,the amount of time people have to wait outside has been increased.This is difficult.Right?So what if you can book all the products you want from any shop and be able to choose the time during which you want to collect the products.Sounds good right? Well,that's what this website allows you to do.<strong>One thing to note is at present this facility is only avilable in Kerala.</strong></p>
                </div>
                <div class="col-md-5 order-md-1">
                    <img src="/images/corona.png" alt="corona" height="300" width="550" />
                </div>
                <br/>
                <div class="class2">
                    <div class="col-md-6" id="head2">
                        <h2 class="featurette-heading">What you can do with this website?</h2>
                        <p class="lead">
                        <ul class="lead">
                            <li class="lead">You can book/order any item you want from your preferred shop in your locality.</li>
                            <li class="lead">Choose the time slot to collect your items(Only limited number of customers can book a particular slot).</li>
                            <li class="lead">Pay for your products.</li>
                            <li class="lead">Well! That's all you have to do.Go and collect your ordered products at your selected time slot.</li>
                        </ul>
                        </p>
                    </div>
                    <div class="col-md-6">
                        <img src="/images/iphone.png" alt="corona" height="400" width="350" class="iphone"/>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            <footer>
                <p class="contact">Contact Us <i class="fab fa-facebook-f fa-2x"></i><i class="fab fa-telegram fa-2x"></i></p>
            </footer>
        </div>
    );
};
export default FrontPage;