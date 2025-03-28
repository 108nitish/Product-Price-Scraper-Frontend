import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Import CSS file

const App = () => {
  const [product, setProduct] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchProduct = async () => {
    if (!product) return;

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const response = await axios.get(`http://127.0.0.1:5000/search?product=${product}`);
      setResults(response.data);
    } catch (err) {
      setError("No product found or API error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">🛍️ Product Price Scraper</h1>

      {/* Search Section */}
      <div className="search-box">
        <input
          type="text"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder="Enter product name..."
          className="search-input"
        />
        <button onClick={searchProduct} className="search-button">
          Search
        </button>
      </div>

      {/* Loading & Error Messages */}
      {loading && <p className="loading">🔄 Searching...</p>}
      {error && <p className="error">{error}</p>}

      {/* Results Section */}
      <div className="results">
        {results.map((item, index) => (
          <div key={index} className="card">
            <img src={item.image} alt={item.title} className="product-image" />
            <h2 className="product-title">{item.title}</h2>
            <p className="price">💰 Price: {item.price}</p>
            <p className="rating">⭐ Rating: {item.rating}</p>
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="view-button">
              🔗 View Product
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
