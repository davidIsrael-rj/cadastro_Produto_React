import React from "react";

export default props =>

    <div className="col-12 col-md-6">
        <div className="form-group">
            <label>{props.label}</label>
            <input type="text" className="form-control"
                name={props.campo}
                value={props.value}
                onChange={props.funcao}
                placeholder={props.placeholder} />
        </div>
    </div>