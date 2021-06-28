import React, { useState, useEffect } from "react";
import '../Styles/Profile.css';
import Recipe from "../Components/standardRecipe";
import {Redirect} from "react-router-dom";
import NewsCard from "../Components/newsCard";

const API_URL = "http://www.recipepuppy.com/api/?i=";

function Profile() {

    const [foodData, setFoodData] = useState(null);
    const [newsData, setNewsData] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [userInput, setUserInput] = useState("");
    const [query, setQuery] = useState("");
    const [redirectTo, setRedirectTo] = useState(null);


    const handleAddRecipe = (e) => {
        fetch('/api/saveRecipe', {
            method: 'POST',
            // We convert the React state to JSON and send it as the POST body
            body: JSON.stringify(e),
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: "follow",
            credentials: "include"
        }).then((response)=>{
            if(response.status===200){
                console.log("recipe saved!!");
                console.log(JSON.stringify(e));
                alert("recipe saved!!");
            }
            else{
                console.log("fehler");
                console.log(JSON.stringify(e));
            }

        })
        };

    const changePW = (e) => {
        fetch('/api/hallo', {
            method: 'GET',
            // We convert the React state to JSON and send it as the POST body
            body: JSON.stringify(e),
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: "follow",
            credentials: "include"
        }).then((response)=>{
            if(response.status===200){
                setRedirectTo("/changePW")
            }
            else{
                console.log("fehler");
                console.log(JSON.stringify(e));
            }

        })
    };

    let logOut = (e) => {


        fetch('logout', {
            method: 'get',
            credentials: 'include', // <--- YOU NEED THIS LINE
            redirect: "follow"
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });

        setRedirectTo("/logout");

    }

    const deleteUser = (e) => {
        fetch('/api/deleteAcc', {
            method: 'DELETE',
            // We convert the React state to JSON and send it as the POST body
            body: JSON.stringify(e),
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: "follow",
            credentials: "include"
        }).then((response)=>{
            if(response.status===200){
                //console.log("recipe saved!!");
                setRedirectTo("/login");
            }
            else{
                console.log("fehler");
                console.log(JSON.stringify(e));
            }

        })
    };

    const handleSubmit = (e)  => {
        setQuery(userInput);
        setUserInput("");
        e.preventDefault();
    };

    const handleChange = (event) => setUserInput(event.target.value);

    function buildURL(query){
        console.log(query);
        console.log("TestURL:" + API_URL + query);
        return API_URL + query;

    }
    console.log("input: "+userInput);
    console.log("query: "+ query);

    useEffect(() => {
        //fetch(buildURL(userInput)) real api
        fetch("/api/rotd") //for testing, static json at Backend
            .then(res => res.json())
            .then(
                (result) => {
                    if(query){
                        setFoodData(result);
                        buildURL(query);
                    }

                },(error) => {

                    setError(error);
                })
    },[query])

    useEffect(() => {
        fetch('/api/hallo', {
            credentials: "include"
        }).then((handleRedirect))

        function handleRedirect(res) {
            if (res.status === 200) {
                console.log("hier");


            } else if (res.status === 401) {
                setRedirectTo("/login")
            } else {
                console.log("not redirect");
            }
        }

    },[])

    const handleThis = () =>{
        setRedirectTo("/savedRecipes");
    }

    const renderRecipe = () =>{
        return !foodData ? (<div className="container text-center rounded-pill bg-info"><h2>Please type something to search!</h2></div>)  : (foodData.results.map((item) => (
            <Recipe name="Save" thumbnail={item.thumbnail} res={item} onClick={()=>handleAddRecipe(item)} title={item.title} ingredients={item.ingredients}  href={item.href}/>
        )))
    }


    useEffect(() => {
        fetch("/api/news")
            .then(res => res.json())
            .then(
                (result) => {
                    setNewsData(result);
                    setIsLoaded(true);

                },(error) => {
                    setIsLoaded(true);
                    setError(error);
                })
    },[])

    if(redirectTo){
        //setRedirectTo(false);
        return (<Redirect to={redirectTo}/>);
    }

    if (!isLoaded){
        return <div>Loading...</div>
    }
    else {

        if(newsData.articles){
            //let truncArt = newsData.articles.slice(0,7);

            return (
                <div className="Profile">
                    <button className="btn btn-dark m-2" type="button" data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                        Dashboard >>
                    </button>
                    <div className="offcanvas offcanvas-start"  tabIndex="-1" id="offcanvasExample"
                         aria-labelledby="offcanvasExampleLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasExampleLabel">My FoodFactory</h5>
                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"
    aria-label="Close"/>
                        </div>

                        <div className="offcanvas-body text-center ">

                            <div className="col-6 mx-auto">
                                <img className="img-fluid rounded-circle" src="../resources/team-member.jpg"/>

                            </div>
                            <div className="dropdown mt-3">
                                <button className="btn btn-success col-12  dropdown-toggle" type="button" id="dropdownMenuButton"
                                        data-bs-toggle="dropdown">
                                    My Menu
                                </button>
                                <ul className="dropdown-menu text-center col-12 my-1" aria-labelledby="dropdownMenuButton">
                                    <li><a  onClick={handleThis} className="btn btn-success col-12 my-1" target="_blank" rel="noreferrer">Show saved Recipes</a></li>
                                    <li><a onClick={()=>changePW()} className="btn btn-success col-12 my-1" target="_blank" rel="noreferrer">Change my Password</a></li>
                                    <li><a onClick={()=>deleteUser()} className="btn btn-success col-12 my-1" target="_blank" rel="noreferrer">Delete my Account</a></li>
                                    <li><button onClick={logOut} className="btn btn-success col-12 my-1" >Logout</button></li>
                                </ul>

                            </div>
                        </div>
                    </div>
                    <div className="col-6 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="searchInput" className="form-label">Search for Recipes</label>
                                <input id="searchInput" type="text" className="form-control"  onChange={handleChange} value={userInput} />
                                    <div id="Help" className="form-text">
                                        Type ingredients separated by comma to search
                                    </div>
                            </div>
                            <button type="submit" className="btn btn-success text-right">Search</button>
                        </form>
                    </div>
                    <h1 className="text-center">Recipes</h1>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 m-2" id="foodCards">
                        {renderRecipe()}
                    </div>

                    <h1 className="text-center">News</h1>

                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 m-3">
                        {newsData.articles.map((article) => (
                            <NewsCard title={article.title} img={article.urlToImage} description={article.description} url={article.url} />
                        ))}
                    </div>
                </div>
            )
        }else{
            return(
                <div className="Profile">
                    <button className="btn btn-dark" type="button" data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                        Profile
                    </button>
                    <div className="offcanvas offcanvas-start"  tabIndex="-1" id="offcanvasExample"
                         aria-labelledby="offcanvasExampleLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasExampleLabel">My FoodFactory</h5>
                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"
    aria-label="Close"/>
                        </div>
                        <div className="offcanvas-body text-center ">

                            <div className="col-6 mx-auto">
                                <img className="img-fluid rounded-circle" src="../resources/anas_background.png" alt="teammember "/>
                            </div>
                            <div className="dropdown mt-3">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                                        data-bs-toggle="dropdown">
                                    Dropdown button
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">

                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 m-3">
                        <div className="col">
                            <div className="card" >
                                <div className="col" id="over">
                                    <img src={newsData.urlToImage} className="card-img-top img-fluid" alt={newsData.title} />
                                </div>

                                <div className="card-body">
                                    <h5 className="card-title">{newsData.title}</h5>
                                    <p className="card-text">{newsData.description}</p>
                                    <p className="card-text lead">Click Card to read more</p>
                                    <a href={newsData.url} className="stretched-link"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } //could be unnecessary the way news.json is set up
    }





}

export default Profile;