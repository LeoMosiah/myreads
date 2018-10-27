import React from "react";
import { Button, SelectMenu } from "evergreen-ui";
import * as PropTypes from "prop-types";

function Book(props) {
  const { book, handleChange } = props;
  const getImageLink = book =>
    book.imageLinks !== undefined ? book.imageLinks.thumbnail : "";
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${getImageLink(book)})`
          }}
        />
        <BookShelfChanger handleChange={handleChange} book={book} />
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors}</div>
    </div>
  );
}

function BookShelfChanger(props) {
  const { book, handleChange } = props;
  const getShelf = shelf => (shelf !== undefined ? shelf : "none");
  return (
    <div className="book-shelf-changer">
      <SelectMenu
        hasFilter={false}
        height={180}
        width={160}
        title="Move to ..."
        options={[
          { label: "Currently Reading", value: "currentlyReading" },
          { label: "Want to Read", value: "wantToRead" },
          { label: "Read", value: "read" },
          { label: "None", value: "none" }
        ]}
        selected={getShelf(book.shelf)}
        onSelect={item => handleChange(book, item.value)}
      >
        <Button style={{ opacity: 0 }} />
      </SelectMenu>
    </div>
  );
}

export default Book;

Book.propTypes = {
  book: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired
}