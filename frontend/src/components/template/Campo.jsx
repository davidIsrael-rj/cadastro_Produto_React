import React from "react";

export default function Campo(props) {
    return (
        <div className="col-12 col-md-6">
            <div className="form-group">
                <label>{props.label}</label>
                <input type="text" className="form-control"
                    name={props.nome}
                    value={props.valor}
                    onChange={props.valorMudou}
                    placeholder={props.placeholder} />
            </div>
        </div>
    )
}