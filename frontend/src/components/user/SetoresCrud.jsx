import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'
import Campo from '../template/Campo'
import Botao from '../template/botao'
import BotaoAcao from '../template/BotaoAcao'

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
                    <Campo
                        label="Nome"
                        nome="name"
                        valor={this.state.setores.name}
                        valorMudou={e => this.updateField(e)}
                        placeholder="Digite o nome do Setor"
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
                        <BotaoAcao
                            cor='warning'
                            onClick={() => this.load(setor)}
                            icon='pencil'
                        />
                        <BotaoAcao
                            cor='danger'
                            onClick={() => this.remove(setor)}
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