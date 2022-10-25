import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import "./App.css";
import BookDetails from "./pages/BookDetails";
import { useEffect, useState } from "react";
import { getAll, update } from "./BooksAPI";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(async () => {
    const data = await getAll();
    setBooks(data);
  }, []);

  const handleChange = async (book, shelf) => {
    await update(book, shelf);
    book.shelf = shelf;
    const filterdBook = books.filter((b) => b.id !== book.id).concat(book);
    setBooks(filterdBook);

    // const updateBook = await update(book, shelf);
    // const data = await getAll();
    // setBooks(data);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home books={books} setBooks={setBooks} handleChange={handleChange} />} />
        <Route path="/search" element={<Search handleChange={handleChange} />} />
        <Route path="/book/:id" element={<BookDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
