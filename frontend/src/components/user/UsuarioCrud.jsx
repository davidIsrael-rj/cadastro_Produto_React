import React, { Component } from "react";
import Main from "../template/Main";
import axios from "axios";
import Campo from "../template/Campo";

const headerProps = {
    icon: "users",
    title: "Usuário",
    subtitle: "Cadastro de Usuários"
}

const baseUrl = 'http://localhost:3001/usuario'

const initialState = {
    usuario: {
        name: "",
        endereco: "",
        bairro: "",
        numero: ""
    },
    list: []
}


export default class UsuarioCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ usuario: initialState.usuario })
    }

    save() {
        const usuario = this.state.usuario
        const method = usuario.id ? 'put' : 'post'
        const url = usuario.id ? `${baseUrl}/${usuario.id}` : baseUrl
        axios[method](url, usuario)
            .then(resp => {
                const list = this.getUpdateList(resp.data)
                this.setState({ usuario: initialState.usuario, list })
            })
    }

    updateField(event) {
        const usuario = { ...this.state.usuario }
        usuario[event.target.name] = event.target.value
        this.setState({ usuario })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <Campo
                        label="Nome"
                        nome="name"
                        valor={this.state.usuario.name}
                        valorMudou={e => this.updateField(e)}
                        placeholder="Digite o Nome"
                    />
                    <Campo
                        label="Endereço"
                        nome="endereco"
                        valor={this.state.usuario.endereco}
                        valorMudou={e => this.updateField(e)}
                        placeholder="Digite o Endereço"
                    />
                    <Campo
                        label="Bairro"
                        nome="bairro"
                        valor={this.state.usuario.bairro}
                        valorMudou={e => this.updateField(e)}
                        placeholder="Digite o Bairro"
                    />
                    <Campo
                        label="Numero"
                        nome="numero"
                        valor={this.state.usuario.numero}
                        valorMudou={e => this.updateField(e)}
                        placeholder="Digite o Numero"
                    />
                    
                    <br />
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
                <hr />

            </div>
        )
    }
    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Endereço</th>
                        <th>Bairro</th>
                        <th>Numero</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    getUpdateList(usuario, add = true) {
        const list = this.state.list.filter(u => u.id !== usuario.id)
        if (add) list.unshift(usuario)
        return list
    }

    load(usuario) {
        this.setState({ usuario })
    }
    remove(usuario) {
        axios.delete(`${baseUrl}/${usuario.id}`).then(resp => {
            const list = this.getUpdateList(usuario, false)
            this.setState({ list })
        })
    }
    renderRows() {
        return this.state.list.map(usuario => {
            return (
                <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.name}</td>
                    <td>{usuario.endereco}</td>
                    <td>{usuario.bairro}</td>
                    <td>{usuario.numero}</td>
                    <td>
                        <button className="btn btn-warning"

                            onClick={() => this.load(usuario)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger mx-2"
                            onClick={() => this.remove(usuario)}>
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