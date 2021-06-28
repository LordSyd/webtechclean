import React, { useState } from "react";
import { Redirect } from "react-router-dom";

export default function ChangePW(){
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [redirectTo, setRedirectTo] = useState(null);


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

            console.log({name, password, confirmPassword});
            setUserInfo({name: name, pwd: password});
            console.log(JSON.stringify({"username": name, "pwd": password}));

            fetch('/api/pwdChange', {
                method: 'PUT',
                // We convert the React state to JSON and send it as the POST body
                body: JSON.stringify({username: name, pwd: password}),
                headers: {
                    'Content-Type': 'application/json',
                },
                redirect: "follow"
            }).then((response) => {
                //console.log("unser code: " + response.status)
                if (response.status === 200){
                    setRedirectTo('/login');
                    //window.location.href = "http://localhost:3000/profile";
                }
                else{
                    console.log("not awesome")
                }
                //return response.json();
            });
            e.preventDefault();
        }
    }

    function validate(){

        let errors = {};
        let isValid = true;

        if (!name) {
            isValid = false;
            //errors["name"] = "Please enter your name.";
            setErrors({name: "Please enter current password"});
        }

        if (!password) {
            isValid = false;
            setErrors({password: "Please enter new password."});
            //errors["password"] = "Please enter your password.";
        }

        if (!confirmPassword) {
            isValid = false;
            setErrors({confirmPassword: "Please confirm your new password."});
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
        //setRedirectTo(false);
        return (<Redirect to={redirectTo}/>);
    }

    return(
        <div className="signin-wrapper">
            <div className="col-10 col-md-8 col-lg-4 justify-content-center mx-auto mt-4" >
                <h1>Change PW</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Current Password:</label>
                        <input
                            type="password"
                            name="oldpwd"
                            value={name}
                            onChange={handleNameChange}
                            className="form-control"
                            placeholder="Enter current password"
                            id="name"/>
                        <div className="text-danger">{errors.name}</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password"> new Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="form-control"
                            placeholder="Enter new password"
                            id="password"/>
                        <div className="text-danger">{errors.password}</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Confirm new Password:</label>
                        <input
                            type="password"
                            name="confirm_password"
                            value={confirmPassword}
                            onChange={handleConfirmChange}
                            className="form-control"
                            placeholder="Confirm new password"
                            id="confirm_password"/>
                        <div className="text-danger">{errors.confirmPassword}</div>
                    </div>
                    <input type="submit" value="Submit" className="btn btn-success mt-2"/>
                </form>
            </div>
        </div>
    )
}
