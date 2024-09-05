import './Nav.css'
import React from 'react'
import {Link} from 'react-router-dom'

export default props =>
    <aside className="menu-area">
        <nav className='menu'>
            <Link to="/">
                <i className='fa fa-home'></i> Início
            </Link>
            <Link to="/produto">
                <i className='fa fa-cart-plus'></i> Produto
            </Link>
            <Link to="/setores">
                <i className='fa fa-shopping-bag'></i> Setores
            </Link>
        </nav>
    </aside>