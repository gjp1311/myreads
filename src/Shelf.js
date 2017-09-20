import React from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './Books/BookShelf';
import PropTypes from 'prop-types';

/**
* @description Represents a Bookshelf. Contains Books
*/
const Shelf = (props) => {
    const { reading, wantToRead, read, onChangeBookStatus } = props;
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <BookShelf books={reading} onChangeBookStatus={onChangeBookStatus} />
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Want to Read</h2>
                        <BookShelf books={wantToRead} onChangeBookStatus={onChangeBookStatus} />
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                        <BookShelf books={read} onChangeBookStatus={onChangeBookStatus} />
                    </div>
                </div>
            </div>
            <div className="open-search">
                <Link to='/search' className="open-search">Add a book</Link>
            </div>
        </div>
    );
}

Shelf.propTypes = {
    reading: PropTypes.array.isRequired,
    wantToRead: PropTypes.array.isRequired,
    read: PropTypes.array.isRequired,
    onChangeBookStatus: PropTypes.func.isRequired
};

export default Shelf;