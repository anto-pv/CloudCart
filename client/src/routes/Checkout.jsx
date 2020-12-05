import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ShopFinder from '../apis/ShopFinder';
const Checkout = () => {
    const [name, setName] = useState('');
    let history=useHistory();
    let {id,cipher} =useParams();
    var total = ((cipher)/456)-15000;
    useEffect(()=>{
        const script = document.createElement("script");

    });
    function loadScript(src) {
        return new Promise((resolve) =>{
            const script = document.createElement('script');
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () =>{
                resolve(false)
            }
            document.body.appendChild(script);
        })
    }
    const __DEV__ = document.domain === 'localhost'
    async function displayRazorpay(total){
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
        if (!res){
          toast.warn('Razorpay SDK failed to load. Are you online?');
          return  
        }
        const data = await ShopFinder.post(`/razorpay/${total}`);
        console.log(typeof(data.data.amount));
        const options = {
            key: __DEV__ ? 'rzp_test_qTrwfutHBo5P6Q':'Production key', 
            amount: data.data.amount.toString(),
            currency: data.data.currency,
            name: "Cloud Cart",
            description: "Test Transaction",
            image: "/images/logo_new.png",
            order_id: data.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: function (response){
                toast.error(response.razorpay_payment_id);
                toast.error(response.razorpay_order_id);
                toast.error(response.razorpay_signature)
            },
            prefill: {
                name: name
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#3399cc"
            }
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on('payment.failed', function (response){
            toast.error(response.error.code);
            toast.error(response.error.description);
            toast.error(response.error.source);
            toast.error(response.error.step);
            toast.error(response.error.reason);
            toast.error(response.error.metadata.order_id);
            toast.error(response.error.metadata.payment_id);
    });
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
            
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                                <span>Total</span>
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
                        <form className="needs-validation" noValidate>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="firstName">First name</label>
                                    <input type="text" value={name} onChange={e=>setName(e.target.value)} className="form-control" id="firstName" placeholder="First name" required/>
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
                            <hr className="mb-4"/>
                            <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={displayRazorpay(total)}>Continue to checkout</button>
                        </form>
                    </div>
                </div>     
                <footer className="my-5 pt-5 text-muted text-center text-small">
                    <p className="mb-1">&copy; 2020-2021 CloudCart</p>
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