import React, { useEffect, useState} from "react";
import {Avatar, IconButton, Button} from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";

import {db, auth} from "../firebase.js";
import { useStateValue } from "../../stateProvider.js";

import "./sidebar.css";
import SidebarChat from "../sidebar-chat/sidebar-chat";


const Sidebar = ()=> {
    const [rooms, setRooms] = useState([]); 
    const [{user}] = useStateValue();

    useEffect(()=> {
        db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()}))
            )
        ))

        // return () =>
        //     unsubscribe();
    }, [rooms])

    return(
        <div className="sidebar">
            <div className="sidebar-header">
                <Button id="avatar"><Avatar src={user.photoURL} />
                <Button id="logout" type="button" onClick={()=> auth.signOut()}>Log Out</Button></Button>
                <div className="sidebar-header-right">
                    <IconButton>
                    <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                    <ChatIcon />
                    </IconButton>
                    <IconButton>
                    <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar-search">
                <div className="sidebar-searchContainer">
                    <SearchOutlined />
                    <input type="text" placeholder="search or start new chat" />
                </div>
            </div>
            <div className="sidebar-chats">
                <SidebarChat addNewChat />
                {rooms.map(({id, data})=> (
                    <SidebarChat key={id} id={id} name={data.name} />
                ))}
            </div>
        </div>
    );
}

export default Sidebar;