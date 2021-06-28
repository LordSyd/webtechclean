import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import Profile from "./profile";
import Test from "./test";
import Logout from "./logout";
import Signup from "./signup";
import Main from "./main";
import Navbar from "../Components/navbar";
import Login from "./login";
import ChangePW from "./changePW";
import SavedRecipes from "./savedRecipes";
import About from "./about";

function router() {
    return (
        <div className="App">

            <Router>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={() => <Main />} />
                    <Route path="/rotd" exact component={() => <App />} />
                    <Route path="/profile" exact component={() => <Profile />} />
                    <Route path="/test" exact component={() => <Test />} />
                    <Route path="/logout" exact component={() => <Logout />} />
                    <Route path="/signup" exact component={() => <Signup />} />
                    <Route path="/login" exact component={() => <Login />} />
                    <Route path="/changePW" exact component={() => <ChangePW />} />
                    <Route path="/savedRecipes" exact component={() => <SavedRecipes />} />
                    <Route path="/about" exact component={() => <About />} />

                </Switch>
            </Router>
        </div>
    );
}

export default router;