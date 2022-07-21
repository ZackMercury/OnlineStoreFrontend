import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SERVER_LINK } from "../app/constants";
import { setUser } from "../slices/userSlice";


export default function LogOutPage () {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("LOG OUT")
        // Component did mount
        axios.get(SERVER_LINK + "/logout")
        .then((res) => {
            dispatch(setUser({}));
            navigate("/"); // Redirect to home
        })
    }, []);

    return <></>
}