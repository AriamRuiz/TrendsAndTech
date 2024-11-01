import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search as SearchIcon } from "lucide-react";

const LibraryPage = () => {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      year: 1997,
      image: "/images/HP1.jpg",
      isBorrowed: false,
    },
    {
      id: 2,
      title: "Harry Potter and the Chamber of Secrets",
      author: "J.K. Rowling",
      year: 1998,
      image: "/images/HP2.jpg",
      isBorrowed: false,
    },
    {
      id: 3,
      title: "Harry Potter and the Prisoner of Azkaban",
      author: "J.K. Rowling",
      year: 1999,
      image: "/images/HP3.jpg",
      isBorrowed: false,
    },
    {
      id: 4,
      title: "Harry Potter and the Goblet of Fire",
      author: "J.K. Rowling",
      year: 2000,
      image: "/images/HP4.jpg",
      isBorrowed: false,
    },
    {
      id: 5,
      title: "Harry Potter and the Order of the Phoenix",
      author: "J.K. Rowling",
      year: 2003,
      image: "/images/HP5.jpg",
      isBorrowed: false,
    },
    {
      id: 6,
      title: "Harry Potter and the Half-Blood Prince",
      author: "J.K. Rowling",
      year: 2005,
      image: "/images/HP6.jpg",
      isBorrowed: false,
    },
    {
      id: 7,
      title: "Harry Potter and the Deathly Hallows",
      author: "J.K. Rowling",
      year: 2007,
      image: "/images/HP7.jpg",
      isBorrowed: false,
    },
    {
      id: 8,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      year: 1925,
      image: "/images/gatsby.jpg",
      isBorrowed: false,
    },
    {
      id: 9,
      title: "Absalom, Absalom!",
      author: "William Faulkner",
      year: 1949,
      image: "/images/absalom.jpg",
      isBorrowed: false,
    },
  ]);

  const [filteredBooks, setFilteredBooks] = useState(books);
  const [filter, setFilter] = useState("All");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    year: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    handleSearch();
  }, [books, searchQuery, filter]);

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add or update book
  const handleAddOrUpdateBook = () => {
    if (editingId) {
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === editingId ? { ...book, ...formData } : book
        )
      );
      setEditingId(null);
    } else {
      const newBook = { ...formData, id: Date.now(), isBorrowed: false };
      setBooks([...books, newBook]);
    }
    setFormData({ title: "", author: "", year: "", image: "" });
  };

  // Start editing a book
  const startEditing = (book) => {
    setEditingId(book.id);
    setFormData({
      title: book.title,
      author: book.author,
      year: book.year,
      image: book.image,
    });
  };

  // Delete book
  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  // Toggle borrowing status
  const toggleBorrowStatus = (id) => {
    setBooks(
      books.map((book) =>
        book.id === id ? { ...book, isBorrowed: !book.isBorrowed } : book
      )
    );
  };

  // Search and filter books
  const handleSearch = () => {
    const results = books.filter((book) => {
      const matchesSearch = book.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesFilter =
        filter === "All" ||
        (filter === "Available" && !book.isBorrowed) ||
        (filter === "Borrowed" && book.isBorrowed);
      return matchesSearch && matchesFilter;
    });
    setFilteredBooks(results);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Library Management System
        </h1>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          {["All", "Available", "Borrowed"].map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-3 py-1 rounded-md font-semibold text-sm focus:outline-none transition-colors duration-200 ${
                filter === option
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Updated Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search for a book..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            <SearchIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Form for adding/editing books */}
        <div className="mb-6 flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Book Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Year"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Image URL"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleAddOrUpdateBook}
          className="w-full py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 mb-6"
        >
          {editingId ? "Update" : "Add"} Book
        </button>

        {/* Book list with borrow, edit, and delete options */}
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="flex items-center justify-between border border-gray-300 p-4 rounded-md mb-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={book.image}
                alt={book.title}
                className="w-20 h-24 object-cover rounded-md"
              />
              <div>
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-gray-600">
                  by {book.author} ({book.year})
                </p>
                <p
                  className={
                    book.isBorrowed ? "text-red-500" : "text-green-500"
                  }
                >
                  {book.isBorrowed ? "Borrowed" : "Available"}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => toggleBorrowStatus(book.id)}
                className={`px-3 py-2 rounded-md text-white transition duration-200 focus:outline-none ${
                  book.isBorrowed
                    ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                    : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                }`}
              >
                {book.isBorrowed ? "Return" : "Borrow"}
              </button>
              <button
                onClick={() => startEditing(book)}
                className="px-3 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-md focus:outline-none transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => deleteBook(book.id)}
                className="px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-md focus:outline-none transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default LibraryPage;
