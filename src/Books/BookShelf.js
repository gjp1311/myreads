import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

/**
* @description Represents a Bookshelf. Contains Books
*/
class BookShelf extends React.Component {    
    static propTypes = {
        books: PropTypes.array.isRequired,
        changeBookStatus: PropTypes.func.isRequired        
    };

    render() {
        const { books, changeBookStatus } = this.props;
        return (
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map(((b, i) => {
                        return (
                            <li key={i}>
                                <Book book={b} changeBookStatus={changeBookStatus} />
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