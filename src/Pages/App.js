import '../Styles/App.css';
import React, { useState, useEffect } from "react";
import Recipe from '../Components/recipeDisplay';
import Cookies from "js-cookie";



function App() {

  const [data, setData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  console.log("cookie", Cookies.get("sessionCookie"));

  useEffect(() => {

      fetch("/api/rotd")
          .then(res => res.json())
          .then(
              (result) => {
                  setData(result.results[1]);
                  setIsLoaded(true);
              },(error) => {
                  setIsLoaded(true);
                  setError(error);
              })

  }, []);

  if (error){
      return <div>Error: {error.message}</div>;
  }
  else if (!isLoaded){
    return <div>Loading..</div>;
  }else{

      return (

          <div className="App">
              <div className="mainApp">
                <div className="jumbotron jumbotron-fluid text-center">
                  <div className="container py-2 mb-0">
                    <h1 className="display-3">Recipe of the Day</h1>
                    <p className="lead">Something new every day</p>
                  </div>
                </div>
                <Recipe thumbnail={data.thumbnail} title={data.title} ingredients={data.ingredients}  href={data.href}/>
            </div>
          </div>
  )}

}


export default App;
