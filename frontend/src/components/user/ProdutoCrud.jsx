import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'
import Campo from '../template/Campo'
import Botao from '../template/botao'
import BotaoAcao from '../template/BotaoAcao'

const headerProps = {
    icon: 'cart-plus',
    title: 'Produtos',
    subtitle: 'Cadastro de Produtos: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = 'http://localhost:3001/produto'
const initialState = {
    produto: {
        name: "",
        custo: "",
        preco: "",
        alicota: "",
        setor: ""
    },
    list: []
}

class ProdutoCrud extends Component {

    state = { ...initialState }


    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }


    clear() {
        this.setState({ produto: initialState.produto })
    }

    save() {
        const produto = this.state.produto
        const method = produto.id ? 'put' : 'post'
        const url = produto.id ? `${baseUrl}/${produto.id}` : baseUrl
        axios[method](url, produto)
            .then(resp => {
                const list = this.getUpdateList(resp.data)
                this.setState({ produto: initialState.produto, list })
            })
    }

    getUpdateList(produto, add = true) {
        const list = this.state.list.filter(p => p.id !== produto.id)
        if (add) list.unshift(produto)
        return list
    }

    updateField(event) {
        const produto = { ...this.state.produto }
        produto[event.target.name] = event.target.value
        this.setState({ produto })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">

                    <Campo
                        label="Nome"
                        valor={this.state.produto.name}
                        placeholder="Digite o nome"
                        nome="name"
                        valorMudou={e => this.updateField(e)}
                    />

                    <Campo
                        label="Custo"
                        valor={this.state.produto.custo}
                        placeholder="Digite o Custo"
                        nome="custo"
                        valorMudou={e => this.updateField(e)}
                    />



                </div>
                <hr />
                <div className="row">
                    <Campo
                        label="Preco"
                        valor={this.state.produto.preco}
                        placeholder="Digite o Preço"
                        nome="preco"
                        valorMudou={e => this.updateField(e)}
                    />
                    <Campo
                        label="Alicota"
                        valor={this.state.produto.alicota}
                        placeholder="Digite a Alicota"
                        nome="alicota"
                        valorMudou={e => this.updateField(e)}
                    />
                </div>
                <hr />
                <div className="row">
                    <Campo
                        label="Setor"
                        valor={this.state.produto.setor}
                        placeholder="Digite o Setor"
                        nome="setor"
                        valorMudou={e => this.updateField(e)}
                    />

                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <Botao
                            cor="primary"
                            nome="Salvar"
                            funcao={e => this.save(e)}
                        />
                        <Botao
                            cor="secondary"
                            nome="Cancelar"
                            funcao={e => this.clear(e)}
                        />
                    </div>
                </div>
            </div>
        )
    }

    load(produto) {
        this.setState({ produto })
    }

    remove(produto) {
        axios.delete(`${baseUrl}/${produto.id}`).then(resp => {
            const list = this.getUpdateList(produto, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Custo</th>
                        <th>Preço</th>
                        <th>Alicota</th>
                        <th>Setor</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>

            </table>
        )
    }

    renderRows() {
        return this.state.list.map(produto => {
            return (
                <tr key={produto.id}>
                    <td>{produto.id}</td>
                    <td>{produto.name}</td>
                    <td>{produto.custo}</td>
                    <td>{produto.preco}</td>
                    <td>{produto.alicota}</td>
                    <td>{produto.setor}</td>
                    <td>
                        <BotaoAcao
                            cor='warning'
                            onClick={() => this.load(produto)}
                            icon='pencil'
                        />
                        <BotaoAcao
                            cor='danger'
                            onClick={() => this.remove(produto)}
                            icon='trash'
                        />                        
                    </td>
                </tr>

            )
        })
    }
    render() {

        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}

export default ProdutoCrud