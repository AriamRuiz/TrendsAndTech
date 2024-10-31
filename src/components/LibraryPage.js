import React, { useState } from "react";
import Search from "./search"; // Assuming this component exists
import Borrow from "./borrow/Borrow"; // Correct path for Borrow
import Return from "./return/Return"; // Correct path for Return

const LibraryPage = () => {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      year: 1925,
      image: "/images/gatsby.jpg",
      isBorrowed: false,
    },
    {
      id: 2,
      title: "Absalom",
      author: "William Faulkner",
      year: 1949,
      image: "/images/absalom.jpg",
      isBorrowed: false,
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    year: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [searchResults, setSearchResults] = useState([]); // New state for search results

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addBook = () => {
    const newBook = { ...formData, id: Date.now(), isBorrowed: false };
    setBooks([...books, newBook]);
    setFormData({ title: "", author: "", year: "", image: "" });
  };

  const updateBook = () => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === editingId ? { ...formData, id: editingId } : book
      )
    );
    setFormData({ title: "", author: "", year: "", image: "" });
    setEditingId(null);
  };

  const startEditing = (book) => {
    setEditingId(book.id);
    setFormData({
      title: book.title,
      author: book.author,
      year: book.year,
      image: book.image,
    });
  };

  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const handleSearch = () => {
    if (searchQuery) {
      const results = books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBooks(results);
      // Set search results with availability status
      setSearchResults(
        results.map((book) => ({
          title: book.title,
          isAvailable: !book.isBorrowed,
        }))
      );
    } else {
      setFilteredBooks(books);
      setSearchResults([]); // Clear results if no query
    }
  };
  const returnBook = (id) => {
    setBooks(
      books.map((book) =>
        book.id === id ? { ...book, isBorrowed: false } : book
      )
    );
  };

  const borrowBook = (id) => {
    setBooks(
      books.map((book) =>
        book.id === id ? { ...book, isBorrowed: true } : book
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Library Management System
      </h1>

      <Search
        query={searchQuery}
        onChange={setSearchQuery}
        onSearch={handleSearch}
      />

      <div className="mb-6 flex flex-wrap items-end gap-4">
        <div className="flex-grow">
          <input
            type="text"
            placeholder="Book Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex-grow">
          <input
            type="text"
            placeholder="Author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Year"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <button
        onClick={editingId ? updateBook : addBook}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {editingId ? "Update" : "Add"} Book
      </button>

      <div className="mt-4">
        {searchResults.length > 0 &&
          searchResults.map((result, index) => (
            <p
              key={index}
              className={result.isAvailable ? "text-green-500" : "text-red-500"}
            >
              {result.title} is{" "}
              {result.isAvailable ? "available" : "not available."}
            </p>
          ))}
      </div>

      {filteredBooks.map((book) => (
        <div
          key={book.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "15px",
          }}
        >
          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <img
              src={book.image}
              alt={book.title}
              style={{ width: "80px", height: "100px", objectFit: "cover" }}
            />
            <div>
              <h3>{book.title}</h3>
              <p>
                by {book.author} ({book.year})
              </p>
              <p>{book.isBorrowed ? "Borrowed" : "Available"}</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            {book.isBorrowed ? (
              <button
                onClick={() => returnBook(book.id)}
                className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
              >
                Return
              </button>
            ) : (
              <button
                onClick={() => borrowBook(book.id)}
                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Borrow
              </button>
            )}
            <button
              onClick={() => startEditing(book)}
              className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none"
            >
              Edit
            </button>
            <button
              onClick={() => deleteBook(book.id)}
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <Borrow books={books} setBooks={setBooks} />
      <Return books={books} setBooks={setBooks} />
    </div>
  );
};

export default LibraryPage;
