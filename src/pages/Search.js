import { useEffect, useState } from "react";
import { update } from "../BooksAPI";
import { search } from "../BooksAPI";
import Book from "../components/Book";
import { Link } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";

const Search = ({ books, handleChange }) => {
  const [query, setQuery] = useState("");
  const [searchedBooks, setSearchedBooks] = useState([]);
  // const [booksWithOutShelf, setBooksWithOutShelf] = useState(books.map(({ shelf, ...keepAttrs }) => keepAttrs));
  // const [foundBooks, setFoundBooks] = useState([]);
  // const [result, setResults] = useState([]);
  const debounceValue = useDebounce(query, 400);

  useEffect(async () => {
    if (query.length > 0) {
      const data = await search(query.toLowerCase());
      if (data.length > 1) {
        setSearchedBooks(data);
        // setBooksWithOutShelf(books.map(({ shelf, ...keepAttrs }) => keepAttrs));
        // setFoundBooks(searchedBooks.filter((item) => booksWithOutShelf.includes(item)));
      }
    } else {
      setSearchedBooks([]);
    }
  }, [debounceValue]);

  //set shelf for search with  O(n) time complexity <=================

  const searchedBooksMap = new Map([...searchedBooks.map((item) => [item.id, item])]);
  const exist = books.filter((item) => searchedBooksMap.has(item.id));

  //Concat two arrays based on ids <=================

  const output = exist.concat(
    searchedBooks.filter((s) => !exist.find((t) => t.id == s.id)) //end filter
  ); //end concat

  // for (var i = 0, len = booksWithOutShelf.length; i < len; i++) {
  //   for (var j = 0, len2 = searchedBooks.length; j < len2; j++) {
  //     if (booksWithOutShelf[i].name === searchedBooks[j].name) {
  //       console.log(true);
  //     }
  //   }
  // }

  // searchedBooks.filter((item) => {
  //   booksWithOutShelf.map(book)=>{
  //     book.title == item.title
  //   }
  // });
  // console.log(booksWithOutShelf[12].title == searchedBooks[0].title);
  // console.log(searchedBooks[0]);
  // console.log(booksWithOutShelf.includes(searchedBooks[0]));

  // useEffect(() => {
  //   setFoundBooks(
  //     searchedBooks.filter((item) => booksWithOutShelf.includes(item.title)).map(({ title, ...rest }) => title)
  //   );
  //   setResults([...searchedBooks, books.map((item) => foundBooks.includes(item.title))]);
  // }, [searchedBooks]);

  // console.log();
  // console.log(booksWithOutShelf[12].title == searchedBooks[3].title);
  // console.log(searchedBooks);
  // console.log(searchedBooks.find((book) => console.log(books.includes(book))));
  // const diff = () =>
  //   searchedBooks.find((searched) => {
  //     if (books.includes(searched)) {
  //       console.log(searched);
  //     }
  //   });
  // console.log(searchedBooks[3], books[4]);
  // console.log(searchedBooks[3].id === books[4].id ? "yes !" : "no :(");

  // const handleChange = async (id, shelf) => {
  //   console.log(id, shelf);
  //   const updateBook = await update(id, shelf);
  // };

  // const booksMap = new Map([...books.map((item) => [item.id, item])]);

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
          {output.map((book) => (
            <Book
              key={book.id}
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
