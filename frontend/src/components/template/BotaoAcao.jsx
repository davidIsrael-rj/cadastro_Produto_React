import React from "react";

export default function BotaoAcao(props) {
    return (
            <button className={`btn btn-${props.cor}`}
                onClick={props.onClick}>
                <i className={`fa fa-${props.icon}`}></i>
            </button>
    )
}