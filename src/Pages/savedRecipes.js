import React, { useState, useEffect } from "react";
import '../Styles/Profile.css';
import Recipe from "../Components/standardRecipe";



function SavedRecipes() {

    const [foodData, setFoodData] = useState(null);
    const [newsData, setNewsData] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [userInput, setUserInput] = useState("");
    const [query, setQuery] = useState("");
    const [redirectTo, setRedirectTo] = useState(null);
    const [state , setState] = useState(null);

    const handleDeleteRecipe = (e) => {
        fetch('/api/deleteSavedRecipes', {
            method: 'DELETE',
            // We convert the React state to JSON and send it as the POST body
            body: JSON.stringify(e),
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: "follow",
            credentials: "include"
        }).then((response)=>{
            if(response.status==200){
                console.log("recipe deleted!!");
                alert("recipe deleted!!");
                setState(true);
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

    useEffect(() => {
        //fetch(buildURL(userInput)) real api
        fetch("/api/showSavedRecipes") //for testing, static json at Backend
            .then(res => res.json())
            .then(
                (result) => {
                    setFoodData(result);
                    setIsLoaded(true);
                    console.log("test1");
                    console.log(result);
                    //buildURL(query);
                    setState(false);
                },(error) => {
                    console.log("failed - ur nicht nice")
                    setError(error);
                })
    },[state])

    useEffect(() => {
        fetch('/api/hallo', {
            credentials: "include"
        }).then((handleRedirect))

        function handleRedirect(res) {
            if (res.status === 200) {
                console.log("test2");


            } else if (res.status === 401) {
                setRedirectTo("/login")
            } else {
                console.log("not redirect");
            }
        }

    },[])



    const renderRecipe = () =>{
        return !foodData ? (<div>Loading</div>)  : (foodData.results.map((item) => (
            <Recipe name="Delete" thumbnail={item.thumbnail} res={item} onClick={()=>handleDeleteRecipe(item)} title={item.title} ingredients={item.ingredients}  href={item.href}/>
        )))
    }


    if (!isLoaded){
        return <div>Loading...</div>
    }
    else {
            return (
                <div className="Profile">
                    <h1 className="text-center">Saved Recipes</h1>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 m-2" id="foodCards">
                        {renderRecipe()}
                    </div>
                </div>
            )
        }
}

export default SavedRecipes;