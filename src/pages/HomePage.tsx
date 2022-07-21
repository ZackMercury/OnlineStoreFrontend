import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../app/store";
import Items from "../components/items/Items";

export default function HomePage () { 
    const user = useSelector((state: RootState) => state.user.value);

    return <div className="HomePage">
        <Items perPage={3}/>
        <Link to="/items"><button type="button" className="btn btn-primary">Browse catalogue</button></Link><br/>
        <br/><br/><br/>
        
        {
            Object.keys(user).length ?
            <> 
                Favorites: <br/>
                <Items perPage={100} items={user.favorites}/>
            </>
            :
            ""
        }
        
    </div>
}