import axios from "axios";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SERVER_LINK } from "../../app/constants";
import { RootState, store } from "../../app/store";
import DropdownButton from "./DropdownButton";
import { setCategory } from "../../slices/categorySlice"
import "./Nav.scss";

export default function Nav (props) {
    const dispatch = useDispatch();
    const category = useSelector((state:RootState) => state.category.value);

    const [tree, setTree] = useState({});
    const [options, setOptions] = useState<string[][]>([]);

    const update = useRef(false);

    useEffect(() => {
        // Component did mount
        axios.get(SERVER_LINK + "/categoryTree")
        .then((res) => {
            setTree({"All items": res.data})
            setOptions(getOptions({"All items": res.data}, category));
        })
        .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        setOptions(getOptions(tree, category));
    }, [category]);

    const getOptions = (tree: any, category: string[]): string[][] => {
        if (!Object.keys(tree).length || !category.length) return [];

        const res = [Object.keys(tree)];

        category.forEach((sub, i) => {
            if (Object.keys(tree[sub]).length > 0)
                res.push(Object.keys(tree[sub]));
            tree = tree[sub];
        });

        return res;
    };

    const onCategorySelect = (id: number, selected: number) => {
        const cat: string[] = category.slice(0, id).concat([options[id][selected]]);
        dispatch(setCategory(cat));
    };

    return <nav className="Nav">
        <span className="marginSides">
            {
                category.concat(["•"]).map((sub, i) => <>
                    <DropdownButton id={i} key={i} caption={sub} options={options[i] ? options[i].sort():[]} onSelect={onCategorySelect} /> &#62; </> )
            }
        </span>
    </nav>
}