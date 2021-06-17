import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import "./App.css";
import Sidebar from "./components/sidebar/sidebar.jsx";
import Chat from "./components/chat/chat.jsx";
import LogIn from "./components/log-in/log-in";
import { useStateValue } from "./stateProvider";

const App = ()=> {
    const [{user}] = useStateValue();

    return(
        <div className='app'>
            <div className="app-body">
                {!user ? <LogIn />
                :
                <Router>
                    <Sidebar />
                    <Switch>
                        {/* <Route path="/">
                            <Chat />    
                        </Route> */}
                        <Route path="/rooms/:roomId" component={Chat} />
                    </Switch>
                </Router>
                }
            </div>
        </div>
    );
}

export default App;