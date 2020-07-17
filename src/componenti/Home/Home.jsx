import React from "react"
import Header from "./Header/Header"
import Personaggi from "./Personaggi/Personaggi"
import Episodi from "./Episodi/Episodi"

function Home() {
    return (
        <>
            <Header />
            <Episodi />
            <Personaggi />
        </>
    )
}

export default Home