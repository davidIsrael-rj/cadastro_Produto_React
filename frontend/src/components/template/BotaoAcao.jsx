import React from "react";

export default function BotaoAcao(props) {
    return (
            <button className={`btn btn-${props.cor} me-2 `}
                onClick={props.onClick}>
                <i className={`fa fa-${props.icon}`}></i>
            </button>
    )
}