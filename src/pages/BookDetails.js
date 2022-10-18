import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { get } from "../BooksAPI";
import Book from "../components/Book";

const BookDetails = () => {
  const param = useParams();
  const [bookDetails, setBookDetails] = useState([]);

  useEffect(async () => {
    const getBookDetails = await get(param.id);
    setBookDetails(getBookDetails);
    console.log(getBookDetails);
  }, []);

  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <div className="back-button">{`<`}</div>
          <div className="book-title">
            <h1>{bookDetails.title}</h1>
          </div>
        </div>
        <div className="list-books-content">
          <div className="book-details">{bookDetails.title ? <Book book={bookDetails} /> : null}</div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
