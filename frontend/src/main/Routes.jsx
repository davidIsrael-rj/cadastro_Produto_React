import React from "react";
import { Switch, Route, Redirect } from 'react-router'

import Home from "../components/home/Home";
import ProdutoCrud from "../components/user/ProdutoCrud";
import SetoresCrud from "../components/user/SetoresCrud";
import UsuarioCrud from "../components/user/UsuarioCrud";

export default props =>

    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/produto' component={ProdutoCrud} />
        <Route path='/setores' component={SetoresCrud} />
        <Route path='/usuario' component={UsuarioCrud} />
        <Redirect from='*' to='/' />
    </Switch>