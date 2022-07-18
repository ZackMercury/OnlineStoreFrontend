import React from "react";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Main from "./components/Main";

export default function App (props) {
    // Component logic here


    return  <BrowserRouter>
                <div className="App">
                    <Header title="AllIncluded Grocery Chain" icon="./images/icon.svg"/>
                    <Nav />
                    <Main>
                        <Routes>
                            <Route path="/">
                                
                            </Route>
                        </Routes>
                    </Main>
                    <Footer />
                </div>
            </BrowserRouter>
}