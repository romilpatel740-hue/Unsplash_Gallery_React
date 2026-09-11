import "./components/App.css";
import React, { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);

  // Reads environment variable supplied by deployment server or build process
  const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY || process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

  const fetchImages = async () => {
    const query = value.trim();

    if (!query) return;

    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?client_id=${ACCESS_KEY}&query=${encodeURIComponent(query)}&orientation=squarish`
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Failed to fetch images:", error);
    }
  };

  return (
    <div className="App">
      <div className="myDiv">
        <span>Search </span>
        <input
          style={{ width: "60%" }}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchImages()}
        />
        <button onClick={fetchImages}>Search</button>
      </div>

      <div className="gallery">
        {results.map((item) => (
          <img
            className="item"
            key={item.id}
            src={item.urls.regular}
            alt={item.alt_description || "Unsplash image"}
          />
        ))}
      </div>
    </div>
  );
}

export default App;