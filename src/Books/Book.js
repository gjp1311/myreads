import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

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
        const rating = _.range(5);
        return (
            <div className="book">
                <div className="book-top">
                    <a className="book-cover"  href={book.previewLink && book.previewLink} target="_new"
                        style={{
                            width: 128, height: 193,
                            backgroundImage: `url(${book.imageLinks.thumbnail}`
                        }}>
                    </a>
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
                <div className="book-title">
                    <a href={book.previewLink && book.previewLink} target="_new" title="Preview">
                        {book.title}
                    </a>
                </div>
                <div className="book-authors" title="Authors">
                    {book.authors &&
                        book.authors.join(', ')}
                </div>
                <div className="book-rating" title="Rating">
                    {
                        rating.map((q, i) => {
                            if (book.averageRating >= i + 1)
                                return (<i key={i} className="fa fa-star"></i>);
                            else {
                                if (book.averageRating && (i + 1 - book.averageRating) < 1)
                                    return (<i key={i} className="fa fa-star-half-o" ></i>);
                                return (<i key={i} className="fa fa-star-o"></i>);
                            }
                        })
                    }
                </div>
            </div>
        );
    }

}

export default Book;