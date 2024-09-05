import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'

const headerProps = {
    icon: 'users',
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

export default class ProdutoCrud extends Component {
    state = { ...initialState }

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

    getUpdateList(produto) {
        const list = this.state.list.filter(p => p.id !== produto.id)
        list.unshift(produto)
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
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="name"
                                value={this.state.produto.name}
                                onChange={e => this.updateField(e)}
                                placeholder='Digite o nome' />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label >Custo</label>
                            <input type="text" className='form-control'
                                name='custo'
                                value={this.state.produto.custo}
                                onChange={e => this.updateField(e)}
                                placeholder='Digite o Custo' />
                        </div>
                    </div>

                </div>
                <hr />
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Preco</label>
                            <input type="text" className="form-control"
                                name="preco"
                                value={this.state.produto.preco}
                                onChange={e => this.updateField(e)}
                                placeholder='Digite o preço' />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label >Alicota</label>
                            <input type="text" className='form-control'
                                name='alicota'
                                value={this.state.produto.alicota}
                                onChange={e => this.updateField(e)}
                                placeholder='Digite a Alicota' />
                        </div>
                    </div>
                    
                </div>
                            <hr />
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Setor</label>
                            <input type="text" className="form-control"
                                name="setor"
                                value={this.state.produto.setor}
                                onChange={e => this.updateField(e)}
                                placeholder='Digite o Setor' />
                        </div>
                    </div>
                    
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn-btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
            </Main>
        )
    }
}