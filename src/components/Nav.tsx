import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../app/store";
import "./Nav.scss";

export default function Nav (props) {
    const category = useSelector((state:RootState) => state.category.value);

    // TODO tree loading
    const [tree, setTree] = useState({});

    return <nav className="Nav">
        <span className="marginSides">
            {
                category.map((sub) => <><Link to="#">{sub}</Link> &#62; </> )
            }
        </span>
    </nav>
}