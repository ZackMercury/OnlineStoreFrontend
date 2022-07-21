import React, { useEffect, useRef, useState } from "react";
import Joi from 'joi-browser';
import axios from "axios";
import { SERVER_LINK } from "../app/constants";
import { useNavigate } from "react-router-dom";

export const signUpSchema = Joi.object({
    email: Joi.string().trim().lowercase().email().required(),
    login: Joi.string().trim().min(2).max(30).required(),
    password: Joi.string().min(5).required(),
    phone: Joi.string().min(5).max(16).required(),
    firstname: Joi.string().trim().min(2).max(30).required(),
    lastname: Joi.string().trim().min(3).max(30).required(),
    address: Joi.string().trim().min(10).required()
});

export default function RegisterPage () { 
    const navigate = useNavigate();
    const alertBox = useRef<HTMLDivElement>(null);
    
    const [email, setEmail] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        document.title = "Register - AllIncluded";
    }, []);

    const onHitSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (password != passwordRepeat) {
            alertBox.current!.hidden = false;
            alertBox.current!.innerHTML = "Passwords mismatch.";
            return;
        }
        //Validate registration data
        const validationRes = signUpSchema.validate({
            email,
            login,
            password,
            firstname,
            lastname,
            phone,
            address
        });

        if (validationRes.error) 
        {
            const box = alertBox.current!;
            const message = validationRes.error.message;
            box.innerHTML = message.substring(message.indexOf("[") + 1, message.indexOf("]"));
            box.hidden = false;
            return;
        }
        
        const data = validationRes.value;

        axios.post(SERVER_LINK + "/signup", data)
        .then(res => {
            console.log(res);
            navigate("/login");
        }).catch(err => {
            alertBox.current!.innerHTML = err.response.data.toString();
            alertBox.current!.hidden = false;
        });
    }

    return <div className="RegisterPage">
        <form>
            <div className="form-group">
                <label htmlFor="firstnameInput">First name</label>
                <input type="text"  onChange={(e) => setFirstname(e.currentTarget.value)} className="form-control" id="firstnameInput" placeholder="Enter your first name" />
            </div>

            <div className="form-group">
                <label htmlFor="lastnameInput">Last name</label>
                <input type="text"  onChange={(e) => setLastname(e.currentTarget.value)} className="form-control" id="lastnameInput" placeholder="Enter your last name" />
            </div>

            <div className="form-group">
                <label htmlFor="loginInput">Login</label>
                <input type="text"  onChange={(e) => setLogin(e.currentTarget.value)} className="form-control" id="loginInput" aria-describedby="loginHelp" placeholder="Enter login"/>
                <small id="loginHelp" className="form-text text-muted">Case sensitive</small>
            </div>
            <div className="form-group">
                <label htmlFor="phoneInput">Phone number</label>
                <input type="tel"  onChange={(e) => setPhone(e.currentTarget.value)} className="form-control" id="phoneInput" placeholder="Enter your phone number" />
            </div>
            <div className="form-group">
                <label htmlFor="addressInput">Address</label>
                <input type="text"  onChange={(e) => setAddress(e.currentTarget.value)} className="form-control" id="addressInput" placeholder="Enter your address" />
            </div>
            <div className="form-group">
                <label htmlFor="emailInput">Email</label>
                <input type="email"  onChange={(e) => setEmail(e.currentTarget.value)} className="form-control" id="emailInput" placeholder="Enter your email" />
            </div>
            <div className="form-group">
                <label htmlFor="passwordInput1">Password</label>
                <input type="password" onChange={(e) => setPassword(e.currentTarget.value)} className="form-control" id="passwordInput" placeholder="Password"/>
            </div>
            <div className="form-group">
                <label htmlFor="passwordInput2">Password (repeat)</label>
                <input type="password" onChange={(e) => setPasswordRepeat(e.currentTarget.value)} className="form-control" id="passwordInput2" placeholder="Password (repeat)"/>
            </div>
            <div ref={alertBox} className="alert alert-danger" role="alert" hidden></div>
            *I agree to the terms and conditions <br/>
            <button type="submit" className="btn btn-primary" onClick={(e) => onHitSubmit(e)}>Submit</button>
        </form>
    </div>
}