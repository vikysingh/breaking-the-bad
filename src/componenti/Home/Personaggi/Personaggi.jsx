import React, { useEffect, useState } from "react"
import axios from "axios"

import styles from "./Personaggistyle.module.css"

const personaggiURL = "https://www.breakingbadapi.com/api/characters?limit="

function Personaggi() {

    const [ personaggiState, setPersonaggiState ] = useState([])

    useEffect(() => {
        prendiPersonaggi()
    })

    async function prendiPersonaggi() {
        let risposta = await axios(personaggiURL)
        let { data } = risposta

        setPersonaggiState(data.map(card => <span className={styles.personaggiCard} key={card.id}>
            <img src={card.img} key={card.img} />
            <h3> {card.name} </h3>
        </span>))
    }

    return (
        <section className={styles.personaggi_section} id="personaggi_section">
            <h1 className={styles.personaggi_title}>Personaggi</h1>
            {
                !personaggiState ? <center>Caricamento in corso...</center> : 
                <>
                <div className={styles.personaggi_card_container} id="personaggi_card_container">
                    { personaggiState }
                </div>
                </>
            }
        </section>
    )

}

export default Personaggi