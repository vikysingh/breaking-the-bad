import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

import styles from "./Searchstyle.module.css"
import styles2 from "../Home/Personaggi/Personaggistyle.module.css"

const baseUrl = "https://breakingbadapi.com/api/"
const searchTypes = [
    { value: "characters?name=", label: "Personaggi" },
    { value: "quote?author=", label: "Citazioni" },
]

const defaultSearchType = searchTypes[0]

function Search() {
    let { query }= useParams()
    const [ queryResult, setQueryResult ] = useState()
    const [ searchTypeState, setSearchTypeState ] = useState(searchTypes[0].value)
    const [ loadingState, setLoadingState ] = useState(true)

    useEffect(() => {
        getData(searchTypeState)
    }, [searchTypeState])

    async function getData(valore) {
        //Non usarlo per gli episodi
        let risposta = await axios(baseUrl + valore + query)
        let { data } = risposta

        if(data.length !== 0) {

            if(valore === searchTypes[0].value) {
                setQueryResult(data.map(personaggio => 
                <span className={styles2.personaggiCard} key={personaggio.id}>
                    <img src={personaggio.img} key={personaggio.img} />
                    <h3 key={personaggio.id + "name"} > {personaggio.name} </h3>
                </span>))
                setLoadingState(false)
            }
            
            else {
                setQueryResult(data.map(citazione => <blockquote className={styles.citazione_card} 
                key={citazione.quote_id}>
                    <q key={citazione.quote} > {citazione.quote} </q>
                    <cite key={citazione.quote + "cite"} > - {citazione.author} </cite>
                </blockquote>))
                setLoadingState(false)
            }
        }
        else {
            setQueryResult(<center styles={{ fontFamily: "sans-serif" }} >Nessun risultato trovato :(</center>)
            setLoadingState(false)
        }
    }
    
    return (
        <div className={styles.search_page}>

            <h2>Risultati per "{query}"</h2>
            
            <span className={styles.search_page_secondary_container}>
                <h3>Stai cercando in </h3>
                <Dropdown options={searchTypes} onChange={e => setSearchTypeState(e.value)} 
                className={styles.search_dropdown} 
                value={defaultSearchType} placeholder="Select an option" />
            </span>

            {
                !queryResult ? 
                    <center>Caricamento in corso...</center>
                : 
                <div className={styles2.personaggi_card_container} id={styles.search_card_container}>
                    { queryResult  }
                </div>
            }

        </div>
    )
}

export default Search