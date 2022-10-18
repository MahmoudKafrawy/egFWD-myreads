import React, { useEffect, useState } from "react";
import Book from "../components/Book";
import { Link } from "react-router-dom";
import { getAll, update } from "../BooksAPI";

const Home = () => {
  const [books, setBooks] = useState([]);
  useEffect(async () => {
    const data = await getAll();
    console.log(data);
    setBooks(data);
  }, []);

  const handleChange = async (id, shelf) => {
    console.log(id, shelf);
    const updateBook = await update(id, shelf);
    const data = await getAll();
    setBooks(data);
  };

  const currentlyReadingBooks = books.filter((book) => book.shelf === "currentlyReading");
  const wantToReadBooks = books.filter((book) => book.shelf === "wantToRead");
  const readBooks = books.filter((book) => book.shelf === "read");

  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {currentlyReadingBooks.length > 0 ? (
                    currentlyReadingBooks.map((book) => (
                      <li key={book.id}>
                        <Book
                          book={book}
                          title={book.title}
                          img={book.imageLinks.thumbnail}
                          handleChange={handleChange}
                          shelf={book.shelf}
                        />
                      </li>
                    ))
                  ) : (
                    <h1>No Books</h1>
                  )}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {wantToReadBooks.length > 0 ? (
                    wantToReadBooks.map((book) => (
                      <li key={book.id}>
                        <Book
                          book={book}
                          title={book.title}
                          img={book.imageLinks.thumbnail}
                          handleChange={handleChange}
                          shelf={book.shelf}
                        />
                      </li>
                    ))
                  ) : (
                    <h1>No Books</h1>
                  )}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {readBooks.length > 0 ? (
                    readBooks.map((book) => (
                      <li key={book.id}>
                        <Book
                          book={book}
                          title={book.title}
                          img={book.imageLinks.thumbnail}
                          handleChange={handleChange}
                          shelf={book.shelf}
                        />
                      </li>
                    ))
                  ) : (
                    <h1>No Books</h1>
                  )}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
