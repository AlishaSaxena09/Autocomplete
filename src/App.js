import React, { useState, useEffect } from "react";
import "./App.css";
import data from "./data.json";

const App = () => {
  const [booksData, setBooksData] = useState({});
  const [searchText, setSearchText] = useState("");

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  useEffect(() => {
    setBooksData(data);
  }, []);

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredTitles = booksData.titles
    ? booksData.titles.filter((title) =>
        title.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  return (
    <div className="container flex flex-col items-center justify-center gap-4 p-4 m-auto App">
      <h1 className="text-sm font-bold">Book Search App</h1>
      <div className="w-9/12 md:w-1/2">
        <input
          list="titles"
          placeholder="Search"
          value={searchText}
          className="px-6 py-2 text-sm border-2 border-black rounded-lg"
          onChange={handleInputChange}
        />
        <datalist id="titles">
          {filteredTitles.map((title, index) => (
            <option key={index} value={title} />
          ))}
        </datalist>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4 py-4">
        {filteredTitles.map((title, index) => {
          const color = getRandomColor();
          return (
            <div
              key={index}
              className="flex items-center justify-center gap-4 p-4 shadow-lg"
              style={{ color: color }}
            >
              <span className="material-symbols-outlined">auto_stories</span>
              {title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
