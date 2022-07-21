import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../app/store";
import Items from "../components/items/Items";
import { setFilter } from "../slices/filterSlice";

export default function ItemsPage () { 
    const { pageParam } = useParams();
    const dispatch = useDispatch();

    // Global state
    const category = useSelector((state: RootState) => state.category.value);

    // State
    const [searchQueryField, setSearchQueryField] = useState("");
    const [minPriceField, setMinPriceField] = useState(0);
    const [maxPriceField, setMaxPriceField] = useState(0);
    const [sortByField, setSortByField] = useState("");
    const [sortField, setSortField] = useState("");
    
    useEffect(() => {
        document.title = "AllIncluded - Items";
    }, []);

    const onChangePage = (page) => {
        window.history.replaceState(null, "Items - page " + (page + 1), "/items/" + (page + 1))
    };

    const onHitFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(setFilter({
            sort: sortField ? sortField : undefined,
            sortBy: sortByField ? sortByField : undefined,
            searchQuery: searchQueryField ? searchQueryField : undefined,
            priceMin: minPriceField ? minPriceField : undefined,
            priceMax: maxPriceField ? maxPriceField : undefined
        }));
    }

    return <div className="ItemsPage">
        <div className="Filter">
            <input type="text"  onChange={(e) => setSearchQueryField(e.currentTarget.value)} className="form-control" id="searchQuery" placeholder="Search"/>
            
            <label htmlFor="minPriceInput">Min price</label>
            <input type="number"  onChange={(e) => setMinPriceField(parseFloat(e.currentTarget.value))} className="form-control" id="minPriceInput" placeholder="Min price"/>
            
            <label htmlFor="maxPriceInput">Max price</label>
            <input type="number"  onChange={(e) => setMaxPriceField(parseFloat(e.currentTarget.value))} className="form-control" id="maxPriceInput"  placeholder="Max price"/>
            
            <div className="verticallyPadded">
                <select defaultValue="" className="form-select" onChange={(e) => setSortByField(e.currentTarget.value)}>
                    <option value="">Sort by</option>
                    <option value="id">ID</option>
                    <option value="name">name</option>
                    <option value="price">price</option>
                </select>
            </div>
            
            <div className="verticallyPadded">
                <select defaultValue="" className="form-select" onChange={(e) => setSortField(e.currentTarget.value)}>
                    <option value="">Sort</option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            <button type="button" className="btn btn-primary" onClick={(e) => onHitFilter(e)}>Filter</button>
            <br/>
        </div>
        { 
            pageParam ?
            <Items perPage={3} onChangePage={onChangePage} page={parseInt(pageParam)} pagination={true}/> :
            <Items perPage={3} onChangePage={onChangePage} pagination={true}/>
        }
    </div>
}