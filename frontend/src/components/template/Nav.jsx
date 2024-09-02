import './Nav.css'
import React from 'react'

export default props =>
    <aside className="menu-area">
        <nav className='menu'>
            <a href="#/">
                <i className='fa fa-home'></i> Início
            </a>
            <a href="#/produto">
                <i className='fa fa-cart-plus'></i> Produto
            </a>
            <a href="#/setores">
                <i className='fa fa-shopping-bag'></i> Setores
            </a>
        </nav>
    </aside>