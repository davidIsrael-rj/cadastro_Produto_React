import React,{Component} from "react";
import Main from "../template/Main";

const headerProps ={
    icon:"users",
    title: "Usuário",
    subtitle:"Cadastro de Usuários"
}

export default class UsuarioCrud extends Component {
    render(){
        return(
            <Main {...headerProps}>
                Usuário
            </Main>
        )
    }
}