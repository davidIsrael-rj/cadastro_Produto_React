import React from "react";

export default function Botao(props) {
    return (
        <div>
            <button className={`btn btn-${props.cor} m-2`}
                onClick={props.funcao}>
                {props.nome}
            </button>
        </div>
    )
}