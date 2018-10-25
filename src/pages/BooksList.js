import React from "react";
import BookShelf from "../components/BookShelf";
import { Link } from "react-router-dom";
import * as PropTypes from "prop-types";

function BooksList(props) {
  const { books, handleChange, handleDrop } = props;
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <BookShelf
          shelfTitle="Currently Reading"
          shelfBooks={books}
          handleChange={handleChange}
          handleDrop={handleDrop}
        />
        <BookShelf
          shelfTitle="Want To Read"
          shelfBooks={books}
          handleChange={handleChange}
          handleDrop={handleDrop}
        />
        <BookShelf
          shelfTitle="Read"
          shelfBooks={books}
          handleChange={handleChange}
          handleDrop={handleDrop}
        />
      </div>
      <OpenSearch />
    </div>
  );
}

const OpenSearch = () => {
  return (
    <div className="open-search">
      <Link to="/search">Add a book</Link>
    </div>
  );
};

export default BooksList;

BooksList.propTypes = {
  books: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleDrop: PropTypes.func.isRequired
}