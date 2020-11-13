import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
const Checkout = () => {
    let history=useHistory();
    let {id,cipher} =useParams();
    var total = ((cipher)/456)-15000;
    console.log(total,id);
    useEffect(()=>{
        const script = document.createElement("script");

    });
    const handleSubmit=()=>{
        var ele = document.getElementsByName('paymentMethod');    
            for(var j = 0; j < ele.length; j++) { 
                if(ele[j].checked) 
                    var hresult = ele[j].value; 
            }
            if(hresult="pcard"){//}
            }else{
                return(<div><div className="row">
                <div className="col-md-6 mb-3">
                    <label for="cc-name">Name on card</label>
                    <input type="text" name="card" className="form-control" id="cc-name" placeholder="" required/>
                    <small className="text-muted">Full name as displayed on card</small>
                    <div className="invalid-feedback">
                    Name on card is required
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <label for="cc-number">Credit card number</label>
                    <input type="text" className="form-control" id="cc-number" placeholder="" required/>
                    <div className="invalid-feedback">
                    Credit card number is required
                    </div>
                </div>
            </div>
            <div className="row">
            <div className="col-md-3 mb-3">
                <label for="cc-expiration">Expiration</label>
                <input type="text" className="form-control" id="cc-expiration" placeholder="" required/>
                <div className="invalid-feedback">
                Expiration date required
                </div>
            </div>
            <div className="col-md-3 mb-3">
                <label for="cc-cvv">CVV</label>
                <input type="text" className="form-control" id="cc-cvv" placeholder="" required/>
                <div className="invalid-feedback">
                Security code required
                </div>
            </div>
            </div></div>);
            };
    };
    return (
        <div className="bg-light">
            <div className="container">
                <div className="py-5 text-center">
                    <img src="/images/logo_new.png" alt="cloudcart"/>
                    <h2>Checkout form</h2>
                </div>
                <div className="row">
                    <div className="col-md-4 order-md-2 mb-4">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-muted">Your cart</span>
                        </h4>
                        <ul className="list-group mb-3">
                            
                            <li className="list-group-item d-flex justify-content-between bg-light">
                                <div className="text-success">
                                    <h6 className="my-0">Promo code</h6>
                                    <small>EXAMPLECODE</small>
                                </div>
                                <span className="text-success">-$5</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                                <span>Total (USD)</span>
                            <strong>{total}</strong>
                            </li>
                        </ul>
                        <form className="card p-2">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Promo code"/>
                                <div className="input-group-append">
                                    <button type="submit" className="btn btn-secondary">Redeem</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-8 order-md-1">
                        <h4 className="mb-3">Billing address</h4>
                        <form className="needs-validation" novalidate>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="firstName">First name</label>
                                    <input type="text" className="form-control" id="firstName" placeholder="First name" required/>
                                    <div className="invalid-feedback">
                                    Valid first name is required.
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="lastName">Last name</label>
                                    <input type="text" className="form-control" id="lastName" placeholder="Last name" required/>
                                    <div className="invalid-feedback">
                                    Valid last name is required.
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="username">Username</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">@</span>
                                    </div>
                                    <input type="text" className="form-control" id="username" placeholder="Username" required/>
                                    <div className="invalid-feedback" style={{width: "100%"}}>
                                    Your username is required.
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email">Email <span className="text-muted">(Optional)</span></label>
                                <input type="email" className="form-control" id="email" placeholder="you@example.com"/>
                                <div className="invalid-feedback">
                                Please enter a valid email address for shipping updates.
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address">Address</label>
                                <input type="text" className="form-control" id="address" placeholder="1234 Main St" required/>
                                <div className="invalid-feedback">
                                Please enter your shipping address.
                                </div>
                            </div>
                            <div className="mb-3">
                                <label for="address2">Address 2 <span className="text-muted">(Optional)</span></label>
                                <input type="text" className="form-control" id="address2" placeholder="Apartment or suite"/>
                            </div>   
                            <div className="row">
                                <div className="col-md-5 mb-3">
                                    <label for="country">Country</label>
                                    <select className="custom-select d-block w-100" id="country" required>
                                        <option value="">Choose...</option>
                                        <option>United States</option>
                                    </select>
                                    <div className="invalid-feedback">
                                    Please select a valid country.
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label for="state">State</label>
                                    <select className="custom-select d-block w-100" id="state" required>
                                        <option value="">Choose...</option>
                                        <option>California</option>
                                    </select>
                                    <div className="invalid-feedback">
                                    Please provide a valid state.
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label for="zip">Zip</label>
                                    <input type="text" className="form-control" id="zip" placeholder="" required/>
                                    <div className="invalid-feedback">
                                    Zip code required.
                                    </div>
                                </div>
                            </div>
                            <hr className="mb-4"/>
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="same-address"/>
                                <label className="custom-control-label" for="same-address">Shipping address is the same as my billing address</label>
                            </div>
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="save-info"/>
                                <label className="custom-control-label" for="save-info">Save this information for next time</label>
                            </div>
                            <hr className="mb-4"/>           
                            <h4 className="mb-3">Payment</h4>
                            <div className="d-block my-3">
                                <div className="custom-control custom-radio">
                                    <input id="credit" name="paymentMethod" value="ccard" type="radio" className="custom-control-input" checked required/>
                                    <label className="custom-control-label" for="credit">Credit card</label>
                                </div>
                                <div className="custom-control custom-radio">
                                    <input id="debit" name="paymentMethod" value="dcard" type="radio" className="custom-control-input" required/>
                                    <label className="custom-control-label" for="debit">Debit card</label>
                                </div>
                                <div className="custom-control custom-radio">
                                    <input id="paypal" name="paymentMethod" value="pcard" type="radio" className="custom-control-input" required/>
                                    <label className="custom-control-label" for="paypal">PayPal</label>
                                </div>
                            </div>
                            {handleSubmit()}
                            <hr className="mb-4"/>
                            <button className="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>
                        </form>
                    </div>
                </div>     
                <footer className="my-5 pt-5 text-muted text-center text-small">
                    <p className="mb-1">&copy; 2017-2020 Company Name</p>
                    <ul className="list-inline">
                        <li className="list-inline-item"><a href="#">Privacy</a></li>
                        <li className="list-inline-item"><a href="#">Terms</a></li>
                        <li className="list-inline-item"><a href="#">Support</a></li>
                    </ul>
                </footer>
            </div>             
        </div>
    );
};
export default Checkout;