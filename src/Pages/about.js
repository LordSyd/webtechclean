import React,{useState} from 'react';
import Navbar from '../Components/navbar';
import "../Styles/about.css"

export default function About() {

    return(
        <div className="container-fluid aboutPage">
            <div id="firstRow" className="row py-5 firstRow">
                <div className="col-md-7 my-auto text-center order-2 order-md-1 ">
                    <h2>Gabriel Hübner</h2>
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                        At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
                        gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                        amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
                        magna aliquyam erat, sed diam voluptua.</p>
                </div>
                <div className="col-5 col-md-3 mx-auto mb-4 order-1 order-md-2">
                    <img className="img-fluid rounded-circle"
                         src="../resources/gabriel_background.png" alt="Gabriel Hübner"/>

                </div>
            </div>
            <div id="secondRow" className="row py-5">
                <div className="col-md-7 my-auto text-center order-2 ">
                    <h2>Anas Kambal</h2>
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                        At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
                        gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                        amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
                        magna aliquyam erat, sed diam voluptua.</p>
                </div>
                <div className="col-5 col-md-3 mx-auto mb-4 my order-1 ">
                    <img className="img-fluid rounded-circle"
                         src="../resources/anas_background.png" alt="Anas Kambal" />

                </div>
            </div>
            <div id="thirdRow" className="row py-5 thirdRow">
                <div className="col-md-7 my-auto text-center order-2 order-md-1 ">
                    <h2>Gabriel Hübner</h2>
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                        At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
                        gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                        amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
                        magna aliquyam erat, sed diam voluptua.</p>
                </div>
                <div className="col-5 col-md-3 mx-auto mb-4 order-1 order-md-2">
                    <img className="img-fluid rounded-circle"
                         src="../resources/daniel_Background.png" alt="Daniel Kleissl"/>

                </div>
            </div>
            <div id="fourthRow" className="row py-5">
                <div className="col-md-7 my-auto text-center order-2 ">
                    <h2>Mohammad Sayyed</h2>
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                        At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
                        gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                        amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
                        magna aliquyam erat, sed diam voluptua.</p>
                </div>
                <div className="col-5 col-md-3 mx-auto mb-4 my order-1 ">
                    <img className="img-fluid rounded-circle"
                         src="../resources/moe_background.png" alt="Mohammad Sayyed"/>
                </div>
            </div>
        </div>
    )
}