import React, {Component} from 'react'
import Main from '../template/Main'

const headerProps ={
    icon:'users',
    title: 'Setores',
    subtitle: 'Cadastro de Produtos: Incluir, Listar, Alterar e Excluir!'
}

export default class ProdutoCrud extends Component {
    render(){
        return (
            <Main {...headerProps}>
                Cadastro de Setores
            </Main>
        )
    }
}