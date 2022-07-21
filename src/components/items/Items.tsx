import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SERVER_LINK } from "../../app/constants";
import { RootState } from "../../app/store";
import Item from "./Item";
import './Items.scss';


export default function Items (props: { page?: number, perPage: number, limit?: number, items?: string[], pagination?: boolean, onChangePage?:(page: number) => void, adminFeatures?: boolean}) {
    const filter = useSelector((state: RootState) => state.filter.value);
    const category = useSelector((state: RootState) => state.category.value);

    const [items, setItems] = useState<any>([]);
    const [page, setPage] = useState( props.page ? Math.max(0, props.page - 1) : 0 );
    const [pages, setPages] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Component did mount
        reloadItems();
    }, []);

    useEffect(() => {
        if (props.onChangePage) 
            props.onChangePage(page);
        reloadItems();
    }, [page]);

    useEffect(() => {
        reloadItems();
    }, [filter])

    const reloadItems = () => {
        if (!props.items)
        {
            setLoading(true);
            axios.post(SERVER_LINK + "/getitems", {
                perPage: props.perPage,
                sort: filter.sort,
                sortBy: filter.sortBy,
                page: page,
                filter: {
                    category: category.slice(1).length ? category.slice(1): undefined,
                    searchQuery: filter.searchQuery,
                    priceMin: filter.priceMin,
                    priceMax: filter.priceMax
                }
            })
            .then(res => {
                setItems(res.data.items);
                setPages(res.data.pages);
                setLoading(false);
            })
        }
        else {
            setLoading(true);
            axios.post(SERVER_LINK + "/getitems", {
                items: props.items,
                page: 0,
                perPage: 100
            })
            .then(res => {
                setItems(res.data.items);
                setPages(res.data.pages);
                setLoading(false);
            })
        }
    }


    const nextPage = async () => {
        if (page < pages - 1)
        {
            setPage(page + 1);
        }
    }

    const prevPage = async () => {
        if (page > 0)
        {
            setPage(page - 1);
        }
    }

    return <>
        <div className="Items">
            { items.map(
                item => <Item imgSrc={SERVER_LINK + "/image/" + item._id} onDelete={(id) => reloadItems()} name={item.name} price={item.price} id={item._id} adminFeatures={props.adminFeatures} />
            )}
        </div>
        <br/>
        {
            props.pagination ? 
            <div>
                <button type="button" onClick={prevPage} className="btn btn-primary">Prev page</button> {page+1}/{pages} 
                <button type="button" onClick={nextPage} style={{marginLeft: "5px"}} className="btn btn-primary">Next page</button>
            </div> :
            ""
        }
        
        
    </>;
}