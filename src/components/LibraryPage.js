import React, { useState } from "react";

const LibraryPage = () => {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      year: 1925,
    },
    { id: 2, title: "1984", author: "George Orwell", year: 1949 },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    year: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addBook = () => {
    if (!formData.title || !formData.author || !formData.year) {
      setError("All fields are required");
      return;
    }
    const newBook = {
      id: books.length ? Math.max(...books.map((b) => b.id)) + 1 : 1,
      ...formData,
    };
    setBooks((prev) => [...prev, newBook]);
    setFormData({ title: "", author: "", year: "" });
    setError("");
  };

  const startEditing = (book) => {
    setEditingId(book.id);
    setFormData({
      title: book.title,
      author: book.author,
      year: book.year,
    });
  };

  const updateBook = () => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === editingId ? { ...book, ...formData } : book
      )
    );
    setEditingId(null);
    setFormData({ title: "", author: "", year: "" });
    setError("");
  };

  const deleteBook = (id) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Library Management System
      </h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
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
        <button
          onClick={editingId ? updateBook : addBook}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {editingId ? "Update" : "Add"} Book
        </button>
      </div>

      <div>
        {books.map((book) => (
          <div
            key={book.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{book.title}</h3>
            <p>
              by {book.author} ({book.year})
            </p>
            <button
              onClick={() => startEditing(book)}
              style={{ marginRight: "10px" }}
            >
              Edit
            </button>
            <button onClick={() => deleteBook(book.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryPage;
