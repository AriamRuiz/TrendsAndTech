import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure to install axios: npm install axios
import Button from "../ui/Button"; // Adjust the import path as needed

function Read() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("YOUR_API_ENDPOINT");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`YOUR_API_ENDPOINT/${id}`);
        setItems(items.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Library Items</h2>
      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center p-4 bg-white shadow rounded"
            >
              <span>{item.title}</span>
              <Button
                onClick={() => handleDelete(item.id)}
                variant="destructive"
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Read;
