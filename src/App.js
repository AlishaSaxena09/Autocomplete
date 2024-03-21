import React, { useState, useEffect } from "react";
import "./App.css";
import data from "./data.json";

const App = () => {
  const [booksData, setBooksData] = useState({});
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);

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
    const inputValue = e.target.value;

    setSearchText(e.target.value);
    filterData(e.target.value);

    if (inputValue === "") {
      setSearchResults([]);
    } else {
      filterData(inputValue);
    }
  };

  const filterData = (searchItem) => {
    const filteredTitles = booksData.titles
      ? booksData.titles.filter((title) =>
          title.toLowerCase().includes(searchItem.toLowerCase())
        )
      : [];
    setSearchResults(filteredTitles);
  };

  const handleResultClick = (title) => {
    setSearchResults([]);

    if (!selectedBooks.includes(title)) {
      setSelectedBooks([...selectedBooks, title]);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen gap-4 p-4 m-auto bg-pink-100 App">
      <h1 className="text-sm font-bold md:text-2xl head">Book Search App</h1>
      <div className="w-9/12 md:w-1/2">
        <input
          list="titles"
          placeholder="Search"
          value={searchText}
          className="w-full px-6 py-2 text-sm border-2 border-black rounded-lg focus:outline-none"
          onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-wrap items-center justify-center w-9/12 gap-4 py-4 md:w-1/2">
        {searchResults.map((title, index) => {
          const color = getRandomColor();
          return (
            <div
              key={index}
              onClick={() => handleResultClick(title)}
              className="w-full bg-white rounded-lg shadow-lg cursor-pointer hover:opacity-60"
            >
              <div className="flex flex-col items-center justify-center gap-4 p-4 ">
                <div
                  style={{ color: color }}
                  className="flex items-center gap-2"
                >
                  <span className="material-symbols-outlined">
                    auto_stories
                  </span>
                  {title}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="container grid gap-6 md:gap-12 md:grid-cols-4">
        {selectedBooks.map((title, index) => {
          const bookIndex = booksData.titles.findIndex((t) => t === title);
          const summary = booksData.summaries[bookIndex];
          const author = booksData.authors[bookIndex];
          const color = getRandomColor();
          return (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl hover:opacity-60"
            >
              <div className="flex flex-col items-center justify-center gap-4 p-6 ">
                <div
                  style={{ color: color }}
                  className="flex items-center gap-2"
                >
                  <span className="material-symbols-outlined">
                    auto_stories
                  </span>
                  {title}
                </div>
                <p className="text-xs md:text-sm leading-1.5 ">
                  {summary.summary}
                </p>
                <p style={{ color: color }} className="text-xs md:text-sm">
                  {author.author}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
