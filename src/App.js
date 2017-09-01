import React from 'react';
// import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom';
import Search from './Search';
import Shelf from './Shelf';
import './App.css';

class BooksApp extends React.Component {
  state = {
    showSearchPage: false
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Shelf />
        )} />

        <Route exact path='/search' render={() => (
          <Search />
        )} />
      </div>
    )
  }
}

export default BooksApp
