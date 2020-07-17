import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Home from "./componenti/Home/Home"
import { QueryContextProvider } from "./context"

import "./Supremestyle.css"
import Search from "./componenti/Search/Search"

function App() {
    return (
        <BrowserRouter>
        <QueryContextProvider>
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/search/:query">
                    <Search />
                </Route>
            </Switch>
        </QueryContextProvider>
        </BrowserRouter>
    )
}

export default App