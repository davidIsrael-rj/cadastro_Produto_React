import Header from './Header'
import './Main.css'
import React from 'react'

export default props =>
    <React.Fragment>
        <Header/>
        <main className="content">
            Conteúdo
        </main>
    </React.Fragment>