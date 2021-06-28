import React, { useState, useEffect } from "react";
import Navbar from '../Components/navbar';
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";

export default function SignUp(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [redirectTo, setRedirectTo] = useState("");


    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    };

    const handleNameChange = (e) => {
        setName(e.target.value)
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    };

    const handleConfirmChange = (e) => {
        setConfirmPassword(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();



        if(validate()){

            console.log({name, password, confirmPassword, email});
            //setUserInfo({name: name, pwd: password, email:email})
            setUserInfo({name: name, pwd: password, email:email});
            console.log(JSON.stringify({"username": name, "pwd": password}));



            fetch('/api/signup', {
                method: 'POST',
                // We convert the React state to JSON and send it as the POST body
                body: JSON.stringify({username: name, pwd: password, email:email}),
                headers: {
                    'Content-Type': 'application/json',
                },
                redirect: "follow"
            }).then((response) => {
                if (response.status == 200){

                    //window.location.replace("http://localhost:3000");
                    setRedirectTo("/");
                }
                return response.json();
            });



            //

            //
            e.preventDefault();

            /*let input = {};

            input["name"] = "";

            input["email"] = "";

            input["password"] = "";

            input["confirm_password"] = "";

            this.setState({input:input});
            alert('Demo Form is submited');*/
        }
    }

    function validate(){

        let errors = {};
        let isValid = true;

        if (!name) {
            isValid = false;
            //errors["name"] = "Please enter your name.";
            setErrors({name: "Please enter your name."});
        }

        if (!email) {
            isValid = false;
            setErrors({email: "Please enter your email Address."});
            //errors["email"] = "Please enter your email Address.";
        }

        if (typeof email !== "undefined") {

            const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

            if (!pattern.test(email)) {
                isValid = false;
                setErrors({email: "Please enter valid email Address."});
                //errors["email"] = "Please enter valid email address.";
            }
        }

        if (!password) {
            isValid = false;
            setErrors({password: "Please enter your password."});
            //errors["password"] = "Please enter your password.";
        }

        if (!confirmPassword) {
            isValid = false;
            setErrors({confirmPassword: "Please confirm your password."});
            //errors["confirm_password"] = "Please enter your confirm password.";
        }

        if (typeof password !== "undefined" && typeof confirmPassword !== "undefined") {

            if (password != confirmPassword) {
                isValid = false;
                setErrors({password: "Passwords don't match."});
                //errors["password"] = "Passwords don't match.";
            }
        }

        return isValid;
    }

    if(redirectTo){
        console.log("redirect")
        //setRedirectTo(false);
        return (<Redirect to={redirectTo}/>);
    }else{

    return(
        <div className="signin-wrapper">
            <div className="col-10 col-md-8 col-lg-4 justify-content-center mx-auto mt-4" >
                <h1>Please Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Username:</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={handleNameChange}
                            className="form-control"
                            placeholder="Enter name"
                            id="name"/>
                        <div className="text-danger">{errors.name}</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address:</label>
                        <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                            className="form-control"
                            placeholder="Enter email"
                            id="email"/>
                        <div className="text-danger">{errors.email}</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="form-control"
                            placeholder="Enter password"
                            id="password"/>
                        <div className="text-danger">{errors.password}</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Confirm Password:</label>
                        <input
                            type="password"
                            name="confirm_password"
                            value={confirmPassword}
                            onChange={handleConfirmChange}
                            className="form-control"
                            placeholder="Confirm password"
                            id="confirm_password"/>
                        <div className="text-danger">{errors.confirmPassword}</div>
                    </div>
                    <input type="submit" value="Submit" className="btn btn-success mt-2"/>
                </form>
            </div>
        </div>
    )
    }
}
