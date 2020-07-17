import React, { createContext, useState } from "react"

const QueryContext = createContext("")

export function QueryContextProvider(props) {
    const [ queryContext, setQueryContext ] = useState("")
    return (
        <QueryContext.Provider value={{
            queryContext,
            setQueryContext
        }}>
            {props.children}
        </QueryContext.Provider>
    )
}

export default QueryContext
