import React from "react";
import { Link } from "react-router-dom";

const Book = ({ book, handleChange }) => {
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${book.imageLinks?.thumbnail})`,
          }}
        >
          <div className="book-cover-hover">
            <Link to={`/book/${book.id}`}>Details</Link>
          </div>
        </div>
        <div className="book-shelf-changer">
          <select defaultValue={book.shelf} onChange={(e) => handleChange(book, e.target.value)}>
            <option value="none" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">Harper Lee</div>
    </div>
  );
};

export default React.memo(Book);
