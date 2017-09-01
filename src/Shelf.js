import React from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './Books/BookShelf';

/**
* @description Represents a Bookshelf. Contains Books
*/
class Shelf extends React.Component {

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>

                        <BookShelf title="Currently Reading" />

                        <BookShelf title="Want to Read" />

                        <BookShelf title="Read" />

                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search' className="open-search">Add a book</Link>
                </div>



            </div>
        );
    }
}

export default Shelf;