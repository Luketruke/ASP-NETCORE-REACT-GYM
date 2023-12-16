import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import Fighters from './pages/Fighters/Fighters';
import Dojos from './pages/Dojos/Dojos';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={Counter} />
                <Route path='/fighterscrud' component={Fighters} />
                <Route path='/dojoscrud' component={Dojos} />
                <Route path='/fetch-data' component={FetchData} />
            </Layout>
        );
    }
}
