import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'

const headerProps = {
    icon: 'shopping-bag',
    title: 'Setores',
    subtitle: 'Cadastro de Produtos: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = 'http://localhost:3001/setores'

const initialState = {
    setores: {
        name: ""
    },
    list: []
}

export default class ProdutoCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ setores: initialState.setores })
    }

    save() {
        const setores = this.state.setores
        const method = setores.id ? 'put' : 'post'
        const url = setores.id ? `${baseUrl}/${setores.id}` : baseUrl
        axios[method](url, setores)
            .then(resp => {
                const list = this.getUpdateList(resp.data)
                this.setState({ setores: initialState.setores, list })
            })
    }

    getUpdateList(setores, add = true) {
        const list = this.state.list.filter(s => s.id !== setores.id)
        if (add) list.unshift(setores)
        return list
    }

    updateField(event) {
        const setores = { ...this.state.setores }
        setores[event.target.name] = event.target.value
        this.setState({ setores })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className='form-control'
                                name='name'
                                value={this.state.setores.name}
                                onChange={e => this.updateField(e)}
                                placeholder='Digite o Nome do Setor' />
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

    load(setores) {
        this.setState({ setores })
    }

    remove(setores) {
        axios.delete(`${baseUrl}/${setores.id}`).then(resp => {
            const list = this.getUpdateList(setores, false)
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
        return this.state.list.map(setor => {
            return (
                <tr key={setor.id}>
                    <td>{setor.id}</td>
                    <td>{setor.name}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(setor)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(setor)}>
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