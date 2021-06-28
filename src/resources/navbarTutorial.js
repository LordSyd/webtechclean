import React from 'react';


function Navbar2() {

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary" aria-label="Fifth navbar example">
            <div className="container-fluid ">
                <a className="navbar-brand" href="#">
                    <img id="logo" className="img-fluid" src="logo.png" alt="Foodfactory logo"/>
                </a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExample05">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Recipe of the Day</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">My Recipes</a>
                        </li>
                    </ul>
                    <form>
                        <input className="form-control" type="text" placeholder="Search" aria-label="Search"/>
                    </form>
                </div>
            </div>
        </nav>
    )
}