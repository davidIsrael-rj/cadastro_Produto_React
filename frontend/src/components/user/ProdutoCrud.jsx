import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'
import Campo from '../template/Campo'

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
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label >Nome</label>
                            <input type="text" className='form-control'
                                name='name'
                                value={this.state.produto.name}
                                onChange={e => this.updateField(e)}
                                placeholder='Digite o Nome' />
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
                        <button className="btn btn-primary m-2"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn btn-secondary m-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
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
                        <button className="btn btn-warning"
                            onClick={() => this.load(produto)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(produto)}>
                            <i className="fa fa-trash"></i>
                        </button>
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