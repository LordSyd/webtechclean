import Router from 'react';
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import React, { useState } from 'react';
import Navbar from '../Components/navbar';
import Cookie from "js-cookie";

export default function Test(){
    const [redirect, setRedirect] = useState(false);


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


        setRedirect(true);


        //var c = Cookies.get("sessionCookie");

        //c = "sessionCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC";

        //document.cookie = "s=; expires=Thu, 01 Jan 1970 00:00:00 UTC";

    }

    if (redirect){
        return <Redirect to="/logout" />
    }else{
        return(
            <div>
                <h2>Test Session</h2>
                <a className="nav-link" href="http://localhost:8080/api/hallo">test session</a>
                <br/>
                <button className="btn btn-default" onClick={logOut}> logout</button>

            </div>
        )
    }

}