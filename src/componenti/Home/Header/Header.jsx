import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import { Parallax } from 'react-parallax';

import styles from "./Headerstyle.module.css"
import QueryContext from "../../../context"

// import HeaderBGImg from "./header-bg.jpg"

function Header() {
    let history = useHistory()

    const { queryContext, setQueryContext } = useContext(QueryContext)


    function handleSearchSubmit() {
        if(queryContext) history.push(`/search/${queryContext}`)
        else alert("no query")
    }

    return (
        <header className={styles.header} id="header">
            <Parallax blur={5} bgImage={require('./header-bg.jpg')} bgImageAlt="Breaking Bad" strength={200}
            >
            <div className={styles.parallax_div} />
            </Parallax>

            {/* <img src={HeaderBGImg} id={styles.header_bg_img} /> */}
            <div className={styles.header_bg_darker}></div>
            <h1 id={styles.header_title} >Breaking Bad</h1>
            <span className={styles.header_search_container} id="header_search_container">
                <input type="text" placeholder="Cerca personaggi, episodi" 
                id={styles.search_query_entry_input}
                value={queryContext}
                onChange={(e => setQueryContext(e.target.value))}
             />
             <button
             onClick={handleSearchSubmit}>Cerca!</button>
            </span>
        </header>
    )
}

export default Header