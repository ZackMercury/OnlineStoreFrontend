import React, { useEffect } from "react";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/navigation/Nav";
import Footer from "./components/Footer";
import Main from "./components/Main";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ItemsPage from "./pages/ItemsPage";
import ViewItemPage from "./pages/ViewItemPage";
import ManageUsersPage from "./pages/ManageUsersPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AddItemPage from "./pages/AddItemPage";
import LogOutPage from "./pages/LogOutPage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./app/store";
import { setLoading } from "./slices/loadingSlice";
import axios from "axios";
import { SERVER_LINK } from "./app/constants";
import { setUser } from "./slices/userSlice";
import EditItemPage from "./pages/EditItemPage";

export default function App (props) {
    const dispatch = useDispatch();
    const isLoading = useSelector((state: RootState) => state.loading.value);

    useEffect(() => {
        // On app load
        // Load user data
        axios.get(SERVER_LINK + "/user")
        .then((res) => {
            const userData = res.data;
            dispatch(setUser(userData));
            dispatch(setLoading(false));
        })
        .catch((err) => {
            dispatch(setLoading(false));
        })
    }, [])

    return <>
        <BrowserRouter>
            <div className="App">
                <Header title="AllIncluded Grocery Chain" icon="/images/icon.svg"/>
                <Nav />
                <Main>
                    <div className="padded">
                        {
                            isLoading ? 
                            <>
                                Loading...
                            </> 
                            :
                            <Routes>
                                <Route path="/" element={<HomePage/>} />
                                <Route path="/login" element={<LoginPage/>} />
                                <Route path="/register" element={<RegisterPage/>} />
                                <Route path="/items" element={<ItemsPage/>} />
                                <Route path="/items/:pageParam" element={<ItemsPage/>} />
                                <Route path="/viewitem/:itemID" element={<ViewItemPage/>} />
                                <Route path="/edititem/:itemID" element={<EditItemPage/>} />
                                <Route path="/manageusers" element={<ManageUsersPage/>} />
                                <Route path="/admin" element={<AdminDashboardPage/>} />
                                <Route path="/additem" element={<AddItemPage/>} />
                                <Route path="/logout" element={<LogOutPage/>} />
                            </Routes>
                        }
                    </div>
                </Main>
                <Footer />
            </div>
        </BrowserRouter>
    </>
    
    
}