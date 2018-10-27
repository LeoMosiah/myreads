import React, {Component} from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../utils/BooksAPI";
import Book from "../components/Book";
import { DebounceInput } from "react-debounce-input";
import * as PropTypes from "prop-types";

const isEmptyString = string => string === "";
class SearchBooks extends Component {
  state = {
    searchBooks: []
  };
  async handleSearch(query) {
    if (!isEmptyString(query)) {
      try {
        this.setState({
          searchBooks: await BooksAPI.search(query)
        });
      } catch (e) {
        this.setState({
          searchBooks: e
        });
      }
    } else {
      this.setState({
        searchBooks: []
      });
    }
  }
  render() {
    const { searchBooks } = this.state;
    const { handleChange, booksOnShelf } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <DebounceInput
              minLength={3}
              type="text"
              placeholder="Search by title or author"
              onChange={event => this.handleSearch(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchBooks.error !== "empty query" &&
              searchBooks
                .filter(
                  searchBook =>
                    !booksOnShelf.find(
                      bookOnShelf => searchBook.id === bookOnShelf.id
                    )
                )
                .concat(
                  booksOnShelf.filter(bookOnShelf =>
                    searchBooks.find(
                      searchBook => bookOnShelf.id === searchBook.id
                    )
                  )
                )
                .map(book => (
                    <li key={book.id}>
                  <Book  book={book} handleChange={handleChange} />
                    </li>
                ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;

SearchBooks.propTypes = {
  booksOnShelf: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired
}