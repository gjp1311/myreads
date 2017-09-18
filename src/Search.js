import React from 'react';
import * as API from './BooksAPI'
import { Link } from 'react-router-dom';
import BookShelf from './Books/BookShelf';
import PropTypes from 'prop-types';

/**
* @description Represents the Search Form
*/
class Search extends React.Component {

    static propTypes = {
        reading: PropTypes.array.isRequired,
        wantToRead: PropTypes.array.isRequired,
        read: PropTypes.array.isRequired,
        changeBookStatus: PropTypes.func.isRequired,
        selectedValue: PropTypes.func.isRequired
    };

    state = {
        lastRequest: {},
        books: []
    };

    /**
    * @description Handle the search input and creates a request to get the books with the query passed
    * @param {object} event - the Change event triggered by the search input    
    */
    handleChange = (event) => {
        const query = event.target.value;
        if (query.length > 0) {
            const request = API.search(query, 20)
                .then((data) => {
                    if (this.state.lastRequest === request) {
                        const books = Array.isArray(data) ? data : [];
                        books.map(b => {
                            b.status = this.props.selectedValue(b);
                        });
                        this.setState({
                            books: books
                        });                        
                    }
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({
                        books: []
                    });
                });
            this.setState({
                lastRequest: request
            });
        }
        else {
            this.setState({
                lastRequest: null
            });
            this.setState({
                books: []
            });
        }
    }


    render() {
        const { changeBookStatus, selectedValue } = this.props;
        const { books } = this.state;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={this.handleChange} />
                    </div>
                </div>
                <div className="search-books-results">
                    <BookShelf books={books} changeBookStatus={changeBookStatus} selectedValue={selectedValue} />
                </div>
            </div>
        );
    }
}

export default Search;