import React, { useRef, useState } from "react";
import Joi from 'joi-browser';
import axios from "axios";
import { SERVER_LINK } from "../app/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";
import { setLoading } from "../slices/loadingSlice";

const signInSchema = Joi.object({
    Login: Joi.string().trim().min(2).max(30).required(),
    Password: Joi.string().min(5).required()
});

export default function LoginPage () {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const alertBox = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onHitSubmit = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const validationRes = signInSchema.validate({Login:login, Password:password});
        if (validationRes.error) 
        {
            const box = alertBox.current!;
            const message = validationRes.error.message;
            box.innerHTML = message.substring(message.indexOf("[") + 1, message.indexOf("]"));
            box.hidden = false;
            return;
        }

        axios.post(SERVER_LINK + "/signin", {
            login: validationRes.value.Login,
            password: validationRes.value.Password
        }).then ((response) => {
            switch (response.status) {
                case 200: 
                    // Login successful, redirecting to home
                    dispatch(setLoading(true));
                    axios.get(SERVER_LINK + "/user")
                    .then((res) => {
                        const userData = res.data;
                        dispatch(setUser(userData));
                        dispatch(setLoading(false));
                    })
                    .catch((err) => {
                        dispatch(setLoading(false));
                    })
                    navigate("/");
                    break;
            }
        }).catch((err) => {
            switch (err.response.status) {
                case 400:
                    alertBox.current!.innerHTML = "Login/Password pair is incorrect, please check spelling.";
                    alertBox.current!.hidden = false;
                    break;
                default:
                    alertBox.current!.innerHTML = err.response.statusText;
                    alertBox.current!.hidden = false;
            }
        })
    };

    return <div className="LoginPage">
        <form>
            <div ref={alertBox} className="alert alert-danger" role="alert" hidden>
                
            </div>
            <div className="form-group">
                <label htmlFor="loginInput">Login</label>
                <input type="text"  onChange={(e) => setLogin(e.currentTarget.value)} className="form-control" id="loginInput" aria-describedby="loginHelp" placeholder="Enter login"/>
                <small id="loginHelp" className="form-text text-muted">Case sensitive</small>
            </div>
            <div className="form-group">
                <label htmlFor="passwordInput">Password</label>
                <input type="password" onChange={(e) => setPassword(e.currentTarget.value)} className="form-control" id="passwordInput" placeholder="Password"/>
            </div>
            
            <button type="submit" className="btn btn-primary" onClick={(e) => onHitSubmit(e)}>Submit</button>
        </form>
    </div>
}