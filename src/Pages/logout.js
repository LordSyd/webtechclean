import React, {useEffect, useState} from 'react';
import Navbar from '../Components/navbar';
import Cookies from "js-cookie";

export default function Logout() {
    const [cookie, setCookie] = useState(null);

    function deleteAllCookies() {
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        }
    }

    useEffect(() => {

        deleteAllCookies();

        document.cookie = "sessionCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        document.cookie = "sessionCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=";

        console.log("done!")
        console.log("cookie", Cookies.get("sessionCookie"));
    },[cookie]);

    useEffect(() => {
        setCookie(Cookies.get("sessionCookie"));
    });

    function handleClick() {



        console.log("done! x2")
        console.log("cookie", Cookies.get("sessionCookie"));
    }



    return (
        <div>
            <Navbar />
            <h1>See you later!</h1>
            <button className="btn" onClick={handleClick}> Delete Cookies</button>
        </div>
    )
}