import React from "react";
import './Header.scss'

export default function Header (props: {title: string, icon: string}) {
    return <header className="Header">
        <img width="150" src={props.icon}/>
        {props.title}
    </header>;
}