import React from 'react';
import PropTypes from 'prop-types';

class Book extends React.Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        changeBookStatus: PropTypes.func.isRequired,
        selectedValue: PropTypes.func.isRequired
    }

    handleChange = (event) => {
        const book = this.props.book;
        const status = event.target.value;
        this.props.changeBookStatus(book, status);
    }

    selectedValue = () => {
        const book = this.props.book;
        console.log('teste');
        return this.props.selectedValue(book);
    }

    render() {
        const { book } = this.props;
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                        style={{
                            width: 128, height: 193,
                            backgroundImage: `url(${book.imageLinks.thumbnail}`
                        }}>
                    </div>
                    <div className="book-shelf-changer">
                        <select onChange={this.handleChange} value={book.status}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">
                    {book.authors &&
                        book.authors.join(', ')}
                </div>
            </div>
        );
    }

}

export default Book;