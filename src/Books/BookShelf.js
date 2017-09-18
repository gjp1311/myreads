import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

/**
* @description Represents a Bookshelf. Contains Books
* @prop {string} title - The title for the bookshelf
* @prop {array} books - The array of books contained in this bookshelf
*/
class BookShelf extends React.Component {
    //TODO: Pass a booklist as prop to populate 
    static propTypes = {
        books: PropTypes.array.isRequired,
        changeBookStatus: PropTypes.func.isRequired,
        selectedValue: PropTypes.func.isRequired
    };

    render() {
        const { books, changeBookStatus,selectedValue } = this.props;

        return (

            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map(((b, i) => {
                        return (
                            <li key={i}>
                                <Book book={b} changeBookStatus={changeBookStatus} selectedValue={selectedValue} />
                            </li>
                        );
                    })
                    )}
                </ol>
            </div>
        );
    }
}

export default BookShelf;