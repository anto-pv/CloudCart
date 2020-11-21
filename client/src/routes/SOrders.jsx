import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ShopFinder from '../apis/ShopFinder';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header2 from '../components/Header2';
toast.configure()
const SOrder = () => {
    const shopcart = {
        paddingTop: "70px",
        paddingBottom: "90px",
    };
    
    const shop__cart__table = {
        marginBottom: "30px",
    
        table : {
            width: "100%",
        },
    
        thead : {
            borderBottom: "1px solid #f2f2f2",
    
            th : {
                fontSize: "18px",
                color: "$heading-color",
                fontWeight: "600",
                textTransform: "uppercase",
                paddingBottom: "20px",
            },
        },
    
        tbody : {
    
            tr : {
                borderBottom: "1px solid #f2f2f2",
    
                td : {
                    padding: "30px 0",
                },
    
                cart__product__item : {
                    overflow: "hidden",
                    width: "585px",
    
                    img : {
                        float: "left",
                        marginRight: "25px",
                    },
    
                    cart__product__item__title : {
                        overflow: "hidden",
                        paddingTop: "23px",
    
                        h6 : {
                            color: "$heading-color",
                            fontWeight: "600",
                        },
    
                        rating : {
    
                            i : {
                                fontSize: "10px",
                                color: "#e3c01c",
                                marginRight: "-4px",
                            },
                        },
                    },
                },
    
                cart__price : {
                    fontSize: "16px",
                    color: "$primary-color",
                    fontWeight: "600",
                    width: "190px",
                },
                cart__close : {
                    textAlign: "right",
    
                    span : {
                        height: "45px",
                        width: "45px",
                        background: "#f2f2f2",
                        borderRadius: "50%",
                        fontSize: "18px",
                        color: "$heading-color",
                        lineHeight: "44px",
                        textAlign: "center",
                        display: "inline-block",
                        fontWeight: "600",
                        cursor: "pointer",
                    },
                },
            },
        },
    };
    
    const cart__btn = {
        marginBottom: "50px",
    
        update__btn : {
            textAlign: "right",
        },
    
        a : {
            fontSize: "14px",
            color: "$heading-color",
            fontWeight: "600",
            textTransform: "uppercase",
            display: "inline-block",
            padding: "14px 30px 12px",
            background: "#f5f5f5",
    
            span : {
                color: "$primary-color",
                fontSize: "14px",
                marginRight: "5px",
            },
        },
    };
    
    const discount__content = {
    
        h6 : {
            color: "$heading-color",
            fontWeight: "600",
            textTransform: "uppercase",
            display: "inline-block",
            marginRight: "30px",
        },
    
        form : {
            position: "relative",
            width: "370px",
            display: "inline-block",
    
            input : {
                height: "52px",
                width: "100%",
                border: "1px solid #444444",
                borderRadius: "50px",
                paddingLeft: "30px",
                paddingRight: "115px",
                fontSize: "14px",
                color: "#444444",
    
                placeholder : {
                    color: "#444444",
                },
            },
    
            button : {
                position: "absolute",
                right: "4px",
                top: "4px",
            },
        },
    };
    
    const cart__total__procced = {
        background: "#f5f5f5",
        padding: "40px",
    
        h6 : {
            color: "$heading-color",
            fontWeight: "600",
            textTransform: "uppercase",
            marginBottom: "10px",
        },
    
        ul : {
            marginBottom: "25px",
    
            li : {
                listStyle: "none",
                fontSize: "16px",
                color: "$heading-color",
                fontWeight: "600",
                overflow: "hidden",
                lineHeight: "40px",
    
            span : {
                    color: "$primary-color",
                    float: "right",
                },
            },
        },
    
        primaryBtn : {
            display: "block",
            borderRadius: "50px",
            textAlign: "center",
            padding: "12px 0 10px",
        },
    }
    var totalp=0;
    const total=(price)=>{
        if(price==-1){
            return(totalp);
        }else{
            totalp=totalp+price;
        };
    };
    const {cart, setCart} = useContext(ShopContext);
    let history = useHistory();
    const {id} =useParams();
    useEffect(()=>{
        const fetchData = async() =>{
            try{ 
                const response= await ShopFinder.get(`/seller/${id}/order`);
                setCart(response.data.data.carts);
            }catch(err){
                console.log(err);
            };
        };
        fetchData();
    },[]);
    return (
        <div>
            <Header2 />
            <section style={shopcart}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div style={shop__cart__table}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Slot</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {cart && cart.map(cart =>{ 
                                        return(
                                            <tr key={cart.cid}>
                                            <td style={shop__cart__table.tbody.tr.cart__product__item}>
                                                <img src="" alt=""/>
                                                <div style={shop__cart__table.tbody.tr.cart__product__item.cart__product__item__title}>
                                                    <h4>{cart.name}</h4>
                                        <h6>{cart.sellername}</h6>
                                                </div>
                                            </td>
                                        <td style={shop__cart__table.tbody.tr.cart__price}>{cart.price}</td>
                                            <td style={shop__cart__table.tbody.tr.cart__price}>{cart.pcount}
                                            </td>
                                        <td style={shop__cart__table.tbody.tr.cart__price}><span className="badge badge-succes">{cart.slot}</span>
                                        </td>
                                        <td style={shop__cart__table.tbody.tr.cart__price}>{cart.pcount*cart.price}{total(cart.pcount*cart.price)}</td>
                                        <td style={shop__cart__table.tbody.tr.cart__close}><span className="fas fa-times-circle"></span></td>
                                        </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div style={cart__btn}>
                                <a href="/shops/Dash">Continue Shopping</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default SOrder;