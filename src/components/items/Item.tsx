import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_LINK } from "../../app/constants";
import './Item.scss';

export default function Item (props: { id: string, imgSrc: string, name: string, price: string, adminFeatures?: boolean, onDelete?:(id: string) => void }) {
    const navigate = useNavigate();

    const onItemClick = (e:React.MouseEvent<HTMLDivElement>) => {
        navigate("/viewitem/" + props.id);
    }

    const onEditBtnClick = (e:React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        navigate("/edititem/" + props.id);
    }

    const onDeleteBtnClick = (e:React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (!window.confirm("Are you sure you want to delete the item?")) return;

        axios.delete(SERVER_LINK + "/removeitem/" + props.id).then(() => {
            if (props.onDelete) props.onDelete(props.id);
        })
    }

    return <div className="Item" onClick={(e) => onItemClick(e)}>
        <div style={{ backgroundImage: `url(${props.imgSrc})`}} className="picture">
            {
                props.adminFeatures ?
                <>
                    <div onClick={onEditBtnClick} className="editItemBtn"></div>
                    <div onClick={onDeleteBtnClick} className="deleteItemBtn"></div>
                </>:""
            }
        </div>
        <span className="smallPadded">${props.price}</span><br/><span className="smallPadded">{ props.name }</span>
    </div>;
}