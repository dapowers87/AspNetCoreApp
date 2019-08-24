import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { MongoExample } from './components/MongoExample';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/RedisCounter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/MongoExample' component={MongoExample} />
      </Layout>
    );
  }
}
