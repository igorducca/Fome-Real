import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import Pedir from './pages/Pedir'
import Criar from './pages/Criar'
import Sucesso from './pages/Sucesso'

export default function routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/pedir" component={Pedir} />
                <Route path="/criar" exact component={Criar} />
                <Route path="/criar/sucesso" component={Sucesso} />
            </Switch>
        </BrowserRouter>
    )
}