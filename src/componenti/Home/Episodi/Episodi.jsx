import React, { useEffect, useState } from "react"
import axios from "axios"
// import { Link } from "react-router-dom"

import styles from "./Episodistyles.module.css"

const personaggiURL = "https://www.breakingbadapi.com/api/episodes/"

function Episodi() {

    const [ episodiState, setEpisodiState ] = useState([])
    const [ stagione, setStagione ] = useState(1)

    useEffect(() => {
        prendiEpisodi()
    }, [stagione])

    async function prendiEpisodi() {
            let risposta = await axios(personaggiURL)
            let { data } = risposta
            
            let parsedData = data.filter(episodio => episodio.season == stagione)

            setEpisodiState(parsedData.map(episode => <span className={styles.episode_card}>
                <div className={styles.episode_card_upper_row}>
            
                    <div className={styles.episode_card_left_col} 
                    key={episode.episode_id + "left"} >
                        <h3> {episode.title} </h3>
                        <h4> {episode.series} </h4>
                        <h4> {episode.air_date} </h4>
                    </div>
            
                    <div className={styles.episode_card_right_col} 
                    key={episode.episode_id + "right"}>
                        <h3> EP - {episode.episode} </h3>
                        <h3> ST - {episode.season} </h3>
                    </div>
            
                </div>
                <div className={styles.episode_card_bottom_row} key={episode.episode_id + "bottom"}>
                    {
                        episode.characters.map(character => <a key={character}> {character} </a>)
                    }
                </div>
            </span>))
    }
    
    function cambioStagione(el_id) {
        let stgn = el_id.split("_")[1]
        let element = document.getElementById(el_id)
        setStagione(stgn)
        let elements = []
        for(let i = 1; i<=3; i++) {
            elements.push(document.getElementById(`episodi-stagione-btn_${i}`))
        }
        
        elements.map(each => {
            each.classList.remove(styles.episodio_stagione_btn_attivo)
        })

        if(element.className !== styles.episodio_stagione_btn_attivo) {
            element.className = styles.episodio_stagione_btn_attivo
        }
        
    }

    return (
        <section className={styles.episodi_section}>
            <span className={styles.episodi_header_container}>
                <h1 className={styles.episodi_title}>Episodi</h1>

                <span>
                    <button id="episodi-stagione-btn_1" className={styles.episodio_stagione_btn_attivo}
                    onClick={e => cambioStagione(e.target.id)} 
                    >STAGIONE 1</button>

                    <button id="episodi-stagione-btn_2"
                    onClick={e => cambioStagione(e.target.id)} 
                    >STAGIONE 2</button>

                    <button id="episodi-stagione-btn_3" 
                    onClick={e => cambioStagione(e.target.id)} 
                    >STAGIONE 3</button>
                </span>
                
            </span>
            {
                !episodiState ? <center>Caricamento in corso...</center> : 
                <>
                    <div className={styles.episode_container} id ="episodi_card_container">
                        { episodiState }
                    </div>
                </>
            }
        </section>
    )

}

export default React.memo(Episodi)