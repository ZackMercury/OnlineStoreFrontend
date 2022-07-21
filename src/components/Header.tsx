import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import { setCategory } from "../slices/categorySlice";
import { setFilter } from "../slices/filterSlice";
import './Header.scss'

export default function Header (props: {title: string, icon: string}) {
    const dispatch = useDispatch();
    const userData = useSelector((state: RootState) => state.user.value);
    const navigate = useNavigate();
    const { login } = userData;
    
    const onIconClick = () => {
        dispatch(setCategory(["All items"]));
        dispatch(setFilter({}));
        navigate("/");
    };


    return <header className="Header">
        <div className="headerData">
            <img style={{cursor: "pointer"}} onClick={onIconClick} width="100" id="icon" src={props.icon}/>
            <div className="headerTitle">{props.title}</div>
        </div>
        <div className="loginInfo">
            { 
                Object.keys(userData).length ? 
                <>
                    Logged in as {login} <br/><Link to="/logout">Log out</Link> <br/>
                    { 
                        userData.isAdmin ? 
                        <Link color="red" to="/admin">Admin</Link>
                        :
                        ""
                    }
                </> 
                : 
                <>
                    <Link to="/login">Login</Link> / <Link to="/register">Register</Link>
                </> 
            }</div>

    </header>;
}