import React from 'react';
import * as API from './BooksAPI'
import { Link } from 'react-router-dom';

/**
* @description Represents the Search Form
*/
class Search extends React.Component {

    state = {
        lastRequest: {}
    };

    /**
    * @description Handle the search input and creates a request to get the books with the query passed
    * @param {object} event - the Change event triggered by the search input    
    */
    handleChange = (event) => {
        const query = event.target.value;
        //TODO: remove all console.log from this function
        const request = API.search(query, 20)
            .then((data) => {
                if (this.state.lastRequest === request) {
                    console.log(query);
                    console.log(data);
                } else {
                    console.log("Not the last request. So abort");
                }

            });
        this.setState({
            lastRequest: request
        });

    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={this.handleChange} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid"></ol>
                </div>
            </div>
        );
    }
}

export default Search;