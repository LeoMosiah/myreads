import React from "react";
import DraggableBook from "./DraggableBook";
import _ from "lodash";
import { DropTarget } from "react-dnd";
import * as PropTypes from "prop-types";

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    book: monitor.getItem()
  };
}
const bookShelfTarget = {
  drop(props) {
    return { title: props.shelfTitle };
  }
};
function BookShelf(props) {
  const {
    shelfTitle,
    shelfBooks,
    handleChange,
    handleDrop,
    connectDropTarget
  } = props;
  return connectDropTarget(
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {shelfBooks
            .filter(book => book.shelf === _.camelCase(shelfTitle))
            .map(book => (
                <li key={book.id}>
              <DraggableBook
                book={book}
                handleChange={handleChange}
                handleDrop={handleDrop}
              />
                </li>
            ))}
        </ol>
      </div>
    </div>
  );
}

export default DropTarget("book", bookShelfTarget, collect)(BookShelf);

BookShelf.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleDrop: PropTypes.func.isRequired,
  shelfBooks: PropTypes.array.isRequired,
  shelfTitle: PropTypes.string.isRequired
}