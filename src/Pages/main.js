import React,{useState} from 'react';

import "../Styles/main.css";
import {Link, Redirect, withRouter} from "react-router-dom";




function Main() {
    const [redirectTo, setRedirectTo] = useState()

    function handleClick(e) {
        setRedirectTo(e.target.id);
    }

    if(redirectTo){
        return(
            <Redirect to={redirectTo} />
        )
    }

    return(
        <div className="Frontpage">
            <div id="firstPage" className="container-fluid min-vh-100 firstPage">
                <div id="firstRow" className="row justify-content-center">
                    <div className="col-6 col-sm-6 col-md-5   ">
                        <div className="row ">
                            <div className="col-12 col-md-8 mx-auto">
                                <img id="logoBig" className="img-fluid" src="../resources/logo_transparent.png"
                                     alt="FoodFactory logo Big"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="d-grid gap-3 col-8 col-md-8 mx-auto">
                                <button id="login" className="btn btn-success rounded-pill"
                                        onClick={handleClick} name="loginB">Login
                                </button>
                                <Link type="button" className="btn btn-success rounded-pill" name="signupB" to="/signup">Signup
                                </Link>
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col">
                                <div className="row text-center  my-5">
                                    <h2 id="wasted-food-txt"><strong>How much food would you guess is wasted per year in
                                        austria?</strong></h2>
                                </div>
                                <div className="row my-5 justify-content-center">
                                    <div className="col-5 col-lg-3 text-center">
                                        <a className="nav-link" href="#secondRow"><img className="img-fluid" id="arrow"
                                                                                       src="../resources/arrow.png" alt="arrow down"/></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div id="secondRow" className="container-fluid vh-75 py-5">
                <div className="row text-center pb-5">
                    <h1>It's 40kg per person!</h1>
                </div>
                <div className="row mx-5 pb-5">
                    <div className="col-md-6 col-lg-5">
                        <img className="img-fluid  rounded" src="../resources/rotten_food.jpg"/>
                    </div>
                    <div className="col-md-5 offset-md-1">
                        <h1>Our Mission Statement</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae neque in sem mollis congue
                            id in tellus. Praesent ac hendrerit erat, ac porttitor orci. Proin pellentesque purus at
                            dolor convallis commodo vitae sed metus. Donec at quam et turpis lacinia ultricies at ut
                            nisi. Nulla finibus urna quis sapien congue, in tempus massa cursus. Fusce nisi lorem,
                            tristique et semper eu, efficitur eu enim. Phasellus ac maximus erat, a rhoncus tortor.
                            Praesent convallis dictum viverra. </p>
                    </div>
                </div>
            </div>
            <div id="thirdRow" className="container-fluid vh-75 py-5">

                <div className="row mx-3">
                    <div className="col-md-5 ">
                        <img className="img-fluid rounded" src="../resources/rotten_food.jpg"/>
                    </div>
                    <div className="col-md-5 offset-md-1">
                        <h1>Our Mission Statement</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae neque in sem mollis congue
                            id in tellus. Praesent ac hendrerit erat, ac porttitor orci. Proin pellentesque purus at
                            dolor convallis commodo vitae sed metus. Donec at quam et turpis lacinia ultricies at ut
                            nisi. Nulla finibus urna quis sapien congue, in tempus massa cursus. Fusce nisi lorem,
                            tristique et semper eu, efficitur eu enim. Phasellus ac maximus erat, a rhoncus tortor.
                            Praesent convallis dictum viverra. </p>
                    </div>
                </div>
            </div>
            <div id="fourthRow" className="container-fluid vh-75 py-5">
                <div className="row text-center justify-content-center mx-auto">
                    <div className="col-md-6 offset-md-1 ">
                        <div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item overflow-auto"><h1>How FoodFactory can help you waste less</h1></li>
                                <li className="list-group-item">Get inspired by searching recipes</li>
                                <li className="list-group-item">Get idead based on the ingredients you have at home</li>
                                <li className="list-group-item ">Save ingredients and get reminded before they expire
                                </li>
                            </ul>
                        </div>
                        <div className="d-grid gap-3 col-8 col-md-8 mx-auto mt-5">
                            <Link type="button" className="btn btn-success rounded-pill"
                                    to="/signup" name="loginB">Signup
                            </Link>
                            <a type="button" className="btn btn-success rounded-pill" name="backToTopB" href="#firstPage">Back to
                                top
                            </a>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default withRouter(Main);