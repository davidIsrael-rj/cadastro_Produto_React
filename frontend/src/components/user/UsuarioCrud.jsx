import React,{Component} from "react";
import Main from "../template/Main";
import axios from "axios";

const headerProps ={
    icon:"users",
    title: "Usuário",
    subtitle:"Cadastro de Usuários"
}

const baseUrl = 'http://localhost:3001/usuario'

const initialState = {
    usuario:{
        name:"",
        endereco:"",
        bairro:"",
        numero:""
    },
    list:[]
}


export default class UsuarioCrud extends Component {

    state ={...initialState}

    componentWillMount(){
        axios(baseUrl).then(resp => {
            this.setState({list: resp.data})
        })
    }

    renderTable(){
        return(
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

    renderRows(){
        return this.state.list.map(usuario =>{
            return(
                <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.name}</td>
                    <td>{usuario.endereco}</td>
                    <td>{usuario.bairro}</td>
                    <td>{usuario.numero}</td>
                    <td>
                        <button className="btn btn-warning">
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger mx-2">
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>

            )
        })
    }

    render(){
        return(
            <Main {...headerProps}>
                Usuário
                {this.renderTable()}
            </Main>
        )
    }
}