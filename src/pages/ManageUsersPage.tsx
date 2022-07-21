import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SERVER_LINK } from "../app/constants";
import { RootState } from "../app/store";

export default function ManageUsersPage () { 
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);
    const [users, setUsers] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Component did mount
        if (!isAdmin) {
            setLoading(false);
            return;
        }

        loadUsers();
    }, []);

    const loadUsers = () => {
        setLoading(true);

        axios.get(SERVER_LINK + "/getusers")
        .then(res => {
            setUsers(res.data);
            setLoading(false);
        })
    }

    const giveAdmin = (userID) => {
        setLoading(true);
        axios.patch(SERVER_LINK + "/giveadmin", { userID })
        .then (res => {
            loadUsers();
            setLoading(false);
        })
    }   

    const takeAdmin = (userID) => {
        setLoading(true);
        axios.patch(SERVER_LINK + "/takeadmin", { userID })
        .then (res => {
            loadUsers();
            setLoading(false);
        })
    }

    return <div className="ManageUsersPage">
        {
            loading ? <>Loading users...</> : !isAdmin ? <>You have no rights to access this feature. Please, <Link to="/login">login</Link> as an admin.</> :
            <>
                {
                    users.map((user, i) => <div className="user" id={user._id}>
                        {user.login} : {user.email} : {user.firstname} : {user.lastname} | {
                            !user.isAdmin ? 
                            <button type="button" onClick={(e) => giveAdmin(e.currentTarget.parentElement!.id) }>Give admin</button> :
                            <button type="button" onClick={(e) => takeAdmin(e.currentTarget.parentElement!.id) }>Take admin</button>
                        }
                        
                    </div>)
                }
            </>
        }
    </div>
}