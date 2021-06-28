import React from 'react';
import { Link, withRouter } from "react-router-dom";
import "../Styles/navbar.css";

 function navbar(){
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary" aria-label="Fifth navbar example">
            <div className="container-fluid ">
                <Link className="navbar-brand" to="/">
                    <img id="logo" className="img m-0 p-0" src="../resources/logo_transparent.png" alt="Foodfactory logo"/>
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExample05">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                           <Link className="nav-link " to="/rotd">Recipe of the Day</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">My FoodFactory</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link " to="/about" >About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link " to="/test">Test Session</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link " to="/signup">Test Signup</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default withRouter(navbar);