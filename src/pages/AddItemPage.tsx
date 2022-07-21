import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../app/store";
import Joi from 'joi-browser';
import axios from "axios";
import { SERVER_LINK } from "../app/constants";

export const newItemSchema = Joi.object({
    name: Joi.string().trim().min(2).required(),
    price: Joi.number().min(0.01).required(),
    description: Joi.string().trim().min(25).max(5000).required(),
    category: Joi.array().items(Joi.string()),
    technicalDetails: Joi.object().pattern(Joi.string(), Joi.string())
});

export default function AddItemPage () { 
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const alertBox = useRef<HTMLDivElement>(null);
    const imageInput = useRef<HTMLInputElement>(null);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [technicalDetails, setTechnicalDetails] = useState("");

    useEffect(() => {
        document.title = "Add a new item";
    }, []);

    const onHitSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const validationRes = newItemSchema.validate({
            name, 
            price,
            description,
            category: category.split(">").map(sub => sub.trim()),
            technicalDetails: technicalDetails.split("\n")
                                .map(line => line.split(":").map(str => str.trim()))
                                .reduce((a, b) => { a[b[0]] = b[1]; return a }, {})
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
        data.category = JSON.stringify(data.category);
        data.technicalDetails = JSON.stringify(data.technicalDetails);
        const formData = new FormData();
        formData.append("picture" , imageInput.current!.files![0]);
        for (const key in data) 
            formData.append(key, data[key]);
        axios.post(SERVER_LINK + "/additem", formData);
    }

    return <div className="AddItemPage"> 
        { isAdmin ? 
            <form>
                <div className="form-group">
                    <label htmlFor="itemNameInput">Name</label>
                    <input type="text"  onChange={(e) => setName(e.currentTarget.value)} className="form-control" id="itemNameInput" placeholder="Enter item name" />
                </div>

                <div className="form-group">
                    <label htmlFor="itemPriceInput">Price</label>
                    <input type="number"  onChange={(e) => setPrice(parseFloat(e.currentTarget.value))} className="form-control" id="itemPriceInput" placeholder="Enter item price" />
                </div>

                <div className="form-group">
                    <label htmlFor="itemPictureInput">Picture</label>
                    <input ref={imageInput} type="file" className="form-control" id="itemPictureInput" accept=".jpg,.png" name="picture"/>
                </div>

                <div className="form-group">
                    <label htmlFor="itemCategoryInput">Category (separate by "&#62;")</label>
                    <input type="text"  onChange={(e) => setCategory(e.currentTarget.value)} className="form-control" id="itemCategoryInput" placeholder="Household items > Bathroom (example)" />
                </div>

                <div className="form-group">
                    <label htmlFor="descriptionArea">Item description</label>
                    <textarea style={{height: "300px"}} onChange={(e) => setDescription(e.currentTarget.value)} className="form-control" id="descriptionArea" placeholder="Enter item description" />
                </div>

                <div className="form-group">
                    <label htmlFor="technicalDetailsArea">Item technical details (Split by line breaks). Syntax is Parameter: Value</label>
                    <textarea style={{height: "300px"}} onChange={(e) => setTechnicalDetails(e.currentTarget.value)} className="form-control" id="technicalDetailsArea" placeholder="Color: Blue&#10;Height: 100cm&#10;..." />
                </div>
                
                <div ref={alertBox} className="alert alert-danger" role="alert" hidden></div>
                
                <button type="submit" className="btn btn-primary" onClick={(e) => onHitSubmit(e)}>Submit</button>
            </form>
            :
            <> 
                You don't have permissions to access this feature. Please <Link to="/login">login</Link> as an admin.
            </>
        }
        
    </div>
}