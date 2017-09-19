import React from 'react';
import { Route } from 'react-router-dom';
import Search from './Search';
import Shelf from './Shelf';
import './App.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

class BooksApp extends React.Component {
  state = {
    reading: [],
    wantToRead: [],
    read: []
  }

   /**
    * @description Changes the shelf a book is on
    * @param {object} book - The book being changed
    * @param {string} status - The shelf
    */
  changeBookStatus = (book, status) => {
    let reading = this.state.reading.filter((b) => b.id !== book.id);
    let wantToRead = this.state.wantToRead.filter((b) => b.id !== book.id);
    let read = this.state.read.filter((b) => b.id !== book.id);
    book.status = status;

    if (status === 'currentlyReading')
      reading = reading.concat(book);
    if (status === 'wantToRead')
      wantToRead = wantToRead.concat(book);
    if (status === 'read')
      read = read.concat(book);

    this.setState({ reading: reading });
    this.setState({ wantToRead: wantToRead });
    this.setState({ read: read });
  }

   /**
    * @description Verifies the shelf a book is currently on
    * @param {object} book - The book being verified    
    */
  selectedValue = (book) => {
    const { reading, wantToRead, read } = this.state;    
    if (reading.find(q => q.id === book.id))
      return 'currentlyReading';
    if (wantToRead.find(q => q.id === book.id))
      return 'wantToRead';
    if (read.find(q => q.id === book.id))
      return 'read';    
    return 'none';
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Shelf {...this.state} changeBookStatus={this.changeBookStatus} />
        )} />

        <Route exact path='/search' render={() => (
          <Search {...this.state} changeBookStatus={this.changeBookStatus} selectedValue={this.selectedValue} />
        )} />
      </div>
    )
  }
}

export default BooksApp
