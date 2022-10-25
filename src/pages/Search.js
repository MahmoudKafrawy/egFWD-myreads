import { useEffect, useState } from "react";
import { update } from "../BooksAPI";

import { search } from "../BooksAPI";
import Book from "../components/Book";
import { Link } from "react-router-dom";
const Search = ({ handleChange }) => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(async () => {
    if (query.length > 0) {
      const data = await search(query.toLowerCase());
      if (data.length > 2) {
        setBooks(data);
      }
    } else {
      setBooks([]);
    }
  }, [query]);

  // const handleChange = async (id, shelf) => {
  //   console.log(id, shelf);
  //   const updateBook = await update(id, shelf);
  // };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {books.map((book) => (
            <Book
              book={book}
              title={book.title}
              img={book.imageLinks ? book.imageLinks.thumbnail : null}
              shelf={book.shelf}
              handleChange={handleChange}
            />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Search;
