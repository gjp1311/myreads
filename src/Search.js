import React from 'react';
import * as API from './BooksAPI'
import { Link } from 'react-router-dom';
import BookShelf from './Books/BookShelf';
import PropTypes from 'prop-types';
import { Debounce } from 'react-throttle';

/**
* @description Represents the Search Form
*/
class Search extends React.Component {

    static propTypes = {
        reading: PropTypes.array.isRequired,
        wantToRead: PropTypes.array.isRequired,
        read: PropTypes.array.isRequired,
        onChangeBookStatus: PropTypes.func.isRequired,
        selectedValue: PropTypes.func.isRequired
    };

    state = {
        lastRequest: {},
        books: [],
        loadingClass: 'done',
        loadingBackground: ''
    };

    /**
    * @description Handles the search input and creates a request to get the books with the query passed
    * @param {object} event - the Change event triggered by the search input    
    */
    handleChange = (event) => {
        const query = event.target.value;
        this.setState({
            books: []
        });
        const d = document.getElementsByTagName("BODY")[0];
        if (query !== '') {
            this.setState({
                loadingClass: 'currently-loading'
            });
            this.setState({
                loadingBackground: 'background-loading'
            });
            d.className = "background-loading";
        } else {
            this.setState({
                loadingClass: ''
            });
            this.setState({
                loadingBackground: ''
            });
        }

        if (query.length > 0) {
            const request = API.search(query, 20)
                .then((data) => {
                    if (this.state.lastRequest === request) {
                        const books = Array.isArray(data) ? data : [];
                        books.map(b => {
                            return b.status = this.props.selectedValue(b);
                        });                        
                        this.setState({
                            books: books
                        });
                        this.setState({
                            loadingClass: ''
                        });
                        this.setState({
                            loadingBackground: ''
                        });
                        d.className = "";
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
        const { onChangeBookStatus, selectedValue } = this.props;
        const { books } = this.state;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <Debounce time="400" handler="onChange">
                            <input type="text" placeholder="Search by title or author" onChange={this.handleChange} />
                        </Debounce>
                    </div>
                </div>
                <div className={`search-books-results ${this.state.loadingBackground}`}>
                    <BookShelf books={books} onChangeBookStatus={onChangeBookStatus} selectedValue={selectedValue} />
                    <br /><br /><br /><br />
                    <div id="overlay" className={this.state.loadingClass}></div>
                </div>
            </div>
        );
    }
}

export default Search;