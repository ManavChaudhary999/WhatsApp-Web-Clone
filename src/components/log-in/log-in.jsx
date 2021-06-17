import React from "react";
import {googleProvider, auth} from "../firebase.js";

import {Button} from "@material-ui/core";
import "./log-in.css";
import { useStateValue } from "../../stateProvider.js";
import {actionTypes} from "../../reducer.js"

const LogIn = ()=> {
    const [{}, dispatch] = useStateValue();

    const signIn = ()=> {
        auth.signInWithPopup(googleProvider).then(result => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            });
            }).catch(err => alert(err.message))
    }

    return(<div className="login">
        <div className="login-container">
            <img src="https://logos-world.net/wp-content/uploads/2020/05/WhatsApp-Logo.png" alt="logo"/>
            <div className="login-text">
                <h1>Sign in to WhatsApp</h1>
            </div>
            <Button onClick={signIn}>
                Sign In With Google
            </Button>
        </div>
    </div>)
}

export default LogIn;