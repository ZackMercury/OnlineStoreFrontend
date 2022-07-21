import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SERVER_LINK } from "../app/constants";
import { RootState } from "../app/store";
import { setCategory } from "../slices/categorySlice";
import { setUser } from "../slices/userSlice";

export default function ViewItemPage () {
    const {itemID} = useParams();
    const dispatch = useDispatch();
    const [itemData, setItemData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const userData = useSelector((state: RootState) => state.user.value);

    useEffect(() => {
        // Component did mount
        setLoading(true);
        axios.get(SERVER_LINK + "/item/" + itemID)
        .then((res) => {
            setItemData(res.data);
            setLoading(false);
            dispatch(setCategory(["All items"].concat(res.data.category)));
        })
    }, []);

    const addToFavorites = () => {
        axios.patch(SERVER_LINK + "/addfavorite", {
            itemID
        }).then((res) => {
            dispatch(setUser({
                ...userData,
                favorites: [...(userData.favorites as string[]), itemID as string]
            }));
        })
    }

    return <div className="ViewItemPage">
        {
            loading ? <>Loading...</> :
            <>
                <h2>{itemData.name}</h2>
                <img width="100%" src={SERVER_LINK + "/image/" + itemData._id}/>
                <i>${itemData.price}</i><br/>
                <b>Description: </b> { itemData.description }<br/>
                <b>Technical details: </b><br/> {
                    Object.keys(itemData.technicalDetails)
                    .map((key) => <>{key}: <i>{itemData.technicalDetails[key]}</i><br/></>)
                }
                {
                    (Object.keys(userData).length && userData.favorites!.indexOf(itemID as string) < 0 )? 
                    <button onClick={addToFavorites} type="button" className="btn btn-primary">Add to favorites</button> :
                    ""
                }
                
            </>
        }
    </div>
}