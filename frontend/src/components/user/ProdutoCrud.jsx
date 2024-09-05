import React, {Component} from 'react'
import Main from '../template/Main'
import axios from 'axios'

const headerProps ={
    icon:'users',
    title: 'Produtos',
    subtitle: 'Cadastro de Produtos: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = 'http://localhost:3001/produto'
const initialState ={
    produto:{
        name:"",
        custo:"",
        preco:"",
        alicota:"",
        setor:""},
        list:[]
}

export default class ProdutoCrud extends Component {
    state = {...initialState}

    clear(){
        this.setState({produto: initialState.produto})
    }

    save(){
        const produto = this.state.produto
        const method = produto.id ? 'put' : 'post'
        const url = produto.id ? `${baseUrl}/${produto.id}` : beseUrl
        axios[method](url, produto)
            .then(resp =>{
                const list = this.getUpdateList(resp.data)
                this.setState({produto : initialState.produto, list})
            })
    }

    getUpdateList(produto){
        const list = this.state.list.filter(p => p.id !== produto.id)
        list.unshift(produto)
        return list
    }
    render(){
        return (
            <Main {...headerProps}>
                Cadastro de Produtos
            </Main>
        )
    }
}