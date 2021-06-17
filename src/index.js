import React from "react";
import ReactDom from "react-dom";
// import {BrowserRouter} from "react-router-dom";
import App from "./App.jsx";
import reducer, {initialState} from "./reducer.js";
import {StateProvider} from "./stateProvider.js";

ReactDom.render(
    <React.StrictMode>
        <StateProvider initialState={initialState} reducer={reducer}>
            <App />
        </StateProvider>
    </React.StrictMode>
, document.getElementById('root'));