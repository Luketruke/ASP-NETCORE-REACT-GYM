import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import Fighters from './pages/Fighters/Fighters';
import NewDojoPage from './pages/Dojos/NewDojoPage';
import ModifyDojoPage from './pages/Dojos/ModifyDojoPage';
import ListDojoPage from './pages/Dojos/ListDojoPage';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />


                {/*Dojos*/}
                <Route path='/dojos/new' component={NewDojoPage} />
                <Route path='/dojos/modify/:id' component={ModifyDojoPage} />
                <Route path='/dojos/list' component={ListDojoPage} />
                {/*Dojos*/}


                <Route path='/counter' component={Counter} />
                <Route path='/fighterscrud' component={Fighters} />
                <Route path='/fetch-data' component={FetchData} />
            </Layout>
        );
    }
}
