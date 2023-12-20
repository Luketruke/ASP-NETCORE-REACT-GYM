import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import AddDojoPage from './pages/Dojos/AddDojoPage';
import ModifyDojoPage from './pages/Dojos/ModifyDojoPage';
import ListDojosPage from './pages/Dojos/ListDojosPage';
//import AddFighterPage from './pages/Fighters/AddFighterPage';
//import ModifyFighterPage from './pages/Fighters/ModifyFighterPage';
//import ListFighterPage from './pages/Fighters/ListFighterPage';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />


                {/*Dojos*/}
                <Route path='/dojos/add' component={AddDojoPage} />
                <Route path='/dojos/modify/:id' component={ModifyDojoPage} />
                <Route path='/dojos/list' component={ListDojosPage} />
                {/*Dojos*/}

                {/*Fighters*/}
                {/*<Route path='/fighters/add' component={AddDojoPage} />*/}
                {/*<Route path='/fighters/modify/:id' component={ModifyDojoPage} />*/}
                {/*<Route path='/fighters/list' component={ListDojoPage} />*/}
                {/*Fighters*/}

                <Route path='/counter' component={Counter} />
                <Route path='/fetch-data' component={FetchData} />
            </Layout>
        );
    }
}
