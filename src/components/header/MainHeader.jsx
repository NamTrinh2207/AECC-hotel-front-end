import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import Search from "../Search";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faEnvelope} from "@fortawesome/free-solid-svg-icons";

function MainHeader(props) {
    const [categoryHome, setCategoryHome] = useState([])
    const data = localStorage.getItem("user");

    let roles = null;
    if (data != null) {
        roles = JSON.parse(localStorage.getItem("user")).roles[0].authority
    } else {
        roles = null;
    };
        useEffect(()=>{
            axios.get("http://localhost:8080/user/hometypes/")
                .then(res => {
                    setCategoryHome(res.data);
                    console.log("categoryHome",categoryHome)
                })
        },[])

    return (
        <div>
            <header className="main-header sticky-header" id="main-header-2">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav className="navbar navbar-expand-lg navbar-light rounded">
                                <a className="navbar-brand logo2" href="/">
                                    <img
                                        src={"https://firebasestorage.googleapis.com/v0/b/react-demo-d28f4.appspot.com/o/logo%2Flogo-white.png?alt=media&token=88cdba59-84da-40a8-8141-d3aa0cab9574"}
                                        height={'55px'} alt="logo"/>
                                </a>
                                <button className="navbar-toggler" type="button" id="drawer">
                                    <span className="fa fa-bars"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbar">

                                    <ul className="navbar-nav  justify-content-center">
                                        <li className="nav-item dropdown active">
                                            <Link className="nav-link dropdown-toggle" to={"/"}
                                                  id="change-font-size" data-toggle="dropdown"
                                                  aria-haspopup="true" aria-expanded="false">
                                                Trang chủ
                                            </Link>
                                        </li>
                                    </ul>
                                    {roles ? (
                                        <>
                                            {roles === "ROLE_ADMIN" ? (
                                                <>
                                                    <ul className="navbar-nav  justify-content-center">
                                                        <li className="nav-item dropdown">
                                                            <Link to={""} className="nav-link dropdown-toggle" href="#"
                                                                  id="change-font-size" data-toggle="dropdown"
                                                                  aria-haspopup="true" aria-expanded="false">
                                                                Danh sách tài khoản
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </>
                                            ) : (
                                                <>
                                                    {roles === "ROLE_USER" ? (
                                                        <>
                                                            <ul className="navbar-nav  justify-content-center">
                                                                <li className="nav-item dropdown">
                                                                    <Link to={"/user"}
                                                                          className="nav-link dropdown-toggle" href="#"
                                                                          id="change-font-size"
                                                                          data-toggle="dropdown" aria-haspopup="true"
                                                                          aria-expanded="false">
                                                                        Tài khoản
                                                                    </Link>
                                                                </li>
                                                                <li className="nav-item dropdown">
                                                                    <Link to={"/"} className="nav-link dropdown-toggle"
                                                                          href="#"
                                                                          id="change-font-size" role="button"
                                                                          data-toggle="dropdown"
                                                                          aria-haspopup="true" aria-expanded="false">
                                                                        Danh Mục
                                                                    </Link>
                                                                    <ul className="dropdown-menu"
                                                                        aria-labelledby="navbarDropdownMenuLink">
                                                                        {categoryHome.map((category,index)=>(
                                                                            <li><a className="dropdown-item" href={`/category/${category.id}`}>{category.name}</a></li>
                                                                        ))}

                                                                    </ul>
                                                                </li>
                                                                <li className="nav-item dropdown">
                                                                    <Link to={""} className="nav-link dropdown-toggle"
                                                                          href="#"
                                                                          id="change-font-size"
                                                                          data-toggle="dropdown" aria-haspopup="true"
                                                                          aria-expanded="false"> <FontAwesomeIcon icon={faBell} />
                                                                    </Link>
                                                                </li>

                                                            </ul>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ul className="navbar-nav  justify-content-center">
                                                                <li className="nav-item dropdown">
                                                                    <Link to={"/"} className="nav-link dropdown-toggle"
                                                                          href="#"
                                                                          id="change-font-size" role="button"
                                                                          data-toggle="dropdown"
                                                                          aria-haspopup="true" aria-expanded="false">
                                                                        Danh Mục
                                                                    </Link>
                                                                    <ul className="dropdown-menu"
                                                                        aria-labelledby="navbarDropdownMenuLink">
                                                                        {categoryHome.map((category,index)=>(
                                                                            <li><a className="dropdown-item" href={`/category/${category.id}`}>{category.name}</a></li>
                                                                        ))}

                                                                    </ul>
                                                                </li>
                                                                {/* cho dang sua*/}
                                                                <li className="nav-item dropdown">
                                                                    <Link to={"/user"}
                                                                          className="nav-link dropdown-toggle" href="#"
                                                                          id="change-font-size"
                                                                          data-toggle="dropdown" aria-haspopup="true"
                                                                          aria-expanded="false">
                                                                        Tài khoản
                                                                    </Link>
                                                                </li>
                                                                <li className="nav-item dropdown">
                                                                    <Link to={""} className="nav-link dropdown-toggle"
                                                                          href="#"
                                                                          id="change-font-size"
                                                                          data-toggle="dropdown" aria-haspopup="true"
                                                                          aria-expanded="false"> <FontAwesomeIcon icon={faBell} />
                                                                    </Link>
                                                                </li>
                                                                {/* ket thu sua*/}
                                                            </ul>
                                                        </>
                                                    )}

                                                </>
                                            )}

                                        </>
                                    ) : (
                                        <>

                                        </>
                                    )}
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default MainHeader;