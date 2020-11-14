import React from 'react';
import Header from '../components/Header';
import Shops from '../components/Shops';
const Home = () => {
    const categories__item = {
        height: "314px",
        display: "webkitBox",
        display: "msFlexbox",
        display: "flex",
        webkitBoxAlign: "center",
        msFlexAlign: "center",
        alignItems: "center",
        paddingLeft: "30px",
        marginBottom: "10px",
        marginRight: "10px",
        categories__large__item: {
            height: "638px",
            paddingLeft: "70px",
            categories__text:{
                maxWidth: "480px",
                p: {
                    marginBottom: "15px",
                    color: "#ffffff",
                    fontSize: "200%",
                    position: "bottom"
                },
                h1 : {
                    fontFamily: "Cookie cursive",
                    color: "#FFFFFF",
                    marginBottom: "5px",
                    fontSize: "500%"
                },
                h4 : {
                    color: "#111111",
                    fontWeight: "700",
                },
                a : {
                    fontSize: "24px",
                    color: "blue",
                    textTransform: "uppercase",
                    fontWeight: "600",
                    position: "relative",
                    padding: "3px 0 3px",
                    display: "inline-block",
                    after : {
                        position: "absolute",
                        left: "0",
                        bottom: "0",
                        height: "2px",
                        width: "100%",
                        background: "#ca1515",
                        content: "",
                    }
                }
            }}
    }
    return (
        <div>
            <Header />
            <section className="categories">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6 p-0">
                            <div style={categories__item,categories__item.categories__large__item,{
        backgroundImage: "url(/images/pexels-anna-shvets-3962294.jpg)",
        backgroundSize: "750px 640px",
        backgroundRepeat: "no-repeat",
        height: "680px",
        width: "800px"}}>
                            <div style={categories__item.categories__large__item.categories__text}>
                                <h1 style={categories__item.categories__large__item.categories__text.h1}>Shop's</h1>
                                <p style={categories__item.categories__large__item.categories__text.p}>Sitamet, consectetur adipiscing elit, sed do eiusmod tempor incidid-unt labore
                                edolore magna aliquapendisse ultrices gravida.</p>
                                <a style={categories__item.categories__large__item.categories__text.a} href="#Shops">Shop now</a>
                            </div>
                            </div>
                        </div>
                        <div className="col-lg-6 p-0">
                            <div style={categories__item,categories__item.categories__large__item,{
        backgroundImage: "url(/images/pexels-stefan-lorentz-668196.jpg)",
        backgroundSize: "800px 640px",
        backgroundRepeat: "no-repeat",
        height: "680px"}}>
                            <div style={categories__item.categories__large__item.categories__text}>
                                <h1 style={categories__item.categories__large__item.categories__text.h1}>Service's</h1>
                                <p style={categories__item.categories__large__item.categories__text.p}>Don't wait for Service's. CloudCart provide's you all services in your fingertip's in a second.</p>
                                <a style={categories__item.categories__large__item.categories__text.a} href="#">Shop now</a>
                            </div>
                            </div>
                        </div>
                </div>
                </div></section>
            <div id="Shops"><h1 alignItems="center" className="text-center display-1">Shops's</h1>
            <Shops/></div>
            <div id="carouselExampleControls" className="container carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                <img src="/images/mask.jpg" className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item">
                <img src="/images/pexels-anna-shvets-3962285.jpg" className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item">
                <img src="/images/pexels-rodnae-productions-5699332.jpg" className="d-block w-100" alt="..."/>
                </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
            </div><script src="/js/main.js"></script>
        </div>
    );
};
export default Home;