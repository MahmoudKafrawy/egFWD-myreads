import React from "react";
import Book from "../components/Book";
import { Link } from "react-router-dom";
import { getAll, update } from "../BooksAPI";

const Home = ({ books, setBooks, handleChange }) => {
  // const [books, setBooks] = useState([]);
  // useEffect(async () => {
  //   const data = await getAll();
  //   setBooks(data);
  // }, []);

  // const handleChange = async (book, shelf) => {
  //   await update(book, shelf);
  //   book.shelf = shelf;
  //   const filterdBook = books.filter((b) => b.id !== book.id).concat(book);
  //   setBooks(filterdBook);

  //   // const updateBook = await update(book, shelf);
  //   // const data = await getAll();
  //   // setBooks(data);
  // };

  // const currentlyReadingBooks = books.filter((book) => book.shelf === "currentlyReading");
  // const wantToReadBooks = books.filter((book) => book.shelf === "wantToRead");
  // const readBooks = books.filter((book) => book.shelf === "read");

  // const filter = (books) => {
  //   (shelf) => {
  //     books.shelf((b) => b.shelf === shelf);
  //   };
  // };
  // console.log(arguments);

  const filter = function (books) {
    return function (shelf) {
      return books.filter(function (b) {
        return b.shelf === shelf;
      });
    };
  };

  const filterBy = filter(books);

  const wantToRead = filterBy("wantToRead");
  const currentlyReading = filterBy("currentlyReading");
  const read = filterBy("read");

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
                  {currentlyReading.length > 0 ? (
                    currentlyReading.map((book) => (
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
                  {wantToRead.length > 0 ? (
                    wantToRead.map((book) => (
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
                  {read.length > 0 ? (
                    read.map((book) => (
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
