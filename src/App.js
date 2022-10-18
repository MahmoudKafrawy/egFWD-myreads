import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import "./App.css";
import BookDetails from "./pages/BookDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/book/:id" element={<BookDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
