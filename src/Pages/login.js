import React, {useEffect, useState} from 'react'
import "../Styles/login.css";
import {Redirect} from 'react-router-dom';
import Cookie from "js-cookie";

 const Login = () => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [userInfo, setUserInfo] = useState({});
    const [errors, setErrors] = useState({});
    const [redirectTo, setRedirectTo] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    const handleChangeName = (e) => {
        setUserName(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };



     useEffect(() => {
        fetch('/api/hallo', {
            credentials: "include"
        }).then((handleRedirect))

         function handleRedirect(res) {
             if (res.status === 200) {
                     setRedirectTo("/profile");
                     console.log("hier");


             } else if (res.status === 401) {
                 console.log(res);
             } else {
                 console.log("not redirect");
             }
         }

    },[])



    const handleSubmit = (e) => {

        e.preventDefault();


        if(validate()) {

            console.log({userName, password});
            setUserInfo({name: userName, pwd: password});
            console.log(JSON.stringify({"username": userName, "pwd": password

            }))


            fetch('/api/login', {
                method: 'POST',
                // We convert the React state to JSON and send it as the POST body
                body: JSON.stringify({username: userName, pwd: password}),
                headers: {
                    'Content-Type': 'application/json',
                },
                redirect: "follow",
                credentials: "include"
            }).then((handleRedirect)
            )


            function handleRedirect(res){
                if( res.status === 200 ){
                    console.log("hier");
                    setRedirectTo("/profile");
                }else if (res.status === 401 ){
                    setRedirectTo("/");
                }
                else {
                    console.log("not redirect");
                }
            }

            e.preventDefault();
        }

        function validate() {
            let errors = {};
            let isValid = true;


            if (!userName) {
                isValid = false;
                setErrors({name: "Please enter your Username."});
            }

            if (!password) {
                isValid = false;
                setErrors({password: "Please enter your password."});
            }

            return isValid;
        }

    }
    if(redirectTo){
        //setRedirectTo(false);
        return (<Redirect to={redirectTo}/>);
    }

    return(
        <div className="Login">
        <div className="container" id="login">
            <div className="row text-center justify-content-center">
                <div className="col-10 col-md-4">
                    <img id="logo2" src="../resources/logo_transparent.png" alt="Avatar"
                         className="img-fluid imgcontainer"/>
                </div>
            </div>
            <div className="row text-center justify-content-center ">
                <div className="col-8 col-md-4">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Please sign in</h3>
                        </div>
                        <div className="panel-body">
                            <form acceptCharset="UTF-8" role="form" onSubmit={handleSubmit}>
                                <fieldset>
                                    <div className="form-group">
                                        <input className="form-control" placeholder="Username" name="username"
                                               type="text" value={userName} onChange={handleChangeName}/>
                                    </div>
                                    <div className="text-danger">{errors.name}</div>
                                    <div className="form-group">
                                        <input className="form-control" placeholder="Password" name="pwd"
                                               type="password" value={password} onChange={handleChangePassword}/>
                                    </div>
                                    <div className="text-danger">{errors.password}</div>
                                    <input className="btn btn-lg btn-success btn-block mt-4" type="submit" value="Login" />
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
)
}
export default Login;