import React, {useState, useEffect} from "react";
import firebase from "firebase";

import { Avatar, IconButton } from "@material-ui/core";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import AttachFile from "@material-ui/icons/AttachFile";
import MoreVert from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";

import {useParams} from "react-router-dom"; // to get the variable from url
import { db } from "../firebase";
import { useStateValue } from "../../stateProvider.js";

import "./chat.css";

const Chat = ()=> {
    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("");
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}] = useStateValue();

    useEffect(()=> {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ))
            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()
                ))
            ))
        }
    }, [roomId])

    useEffect(()=> {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);

    const sendMessage = (e)=> {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            text: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput('');
    }

    return(
        <div className="chat">
            <div className="chat-header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat-header-info">
                    <h3>{roomName}</h3>
                    <p>Last seen{" "}
                    {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}
                    </p>
                </div>
                <div className="chat-header-right">
                    <IconButton><SearchOutlined /></IconButton>
                    <IconButton><AttachFile /></IconButton>
                    <IconButton><MoreVert /></IconButton>
                </div>
            </div>
            <div className="chat-body">
                {messages.map(message => (
                    <p className={`chat-message ${message.name === user.displayName && "chat-reciever"}`}>
                    <span className="chat-name">{message.name}</span>
                    {message.text}
                    <span className="chat-timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span></p>
                ))}
                
            </div>
            <div className="chat-footer">
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={(e)=> setInput(e.target.value)} type="text" placeholder="Type a message" />
                    <button onClick={sendMessage}>Send a Message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    );
}

export default Chat;