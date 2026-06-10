import React from "react";
import "./SearchBar.css";

const SearchBar = () => {
  return (
    <div className="search-container">
      <div className="search-glass">
        <div className="search-field">
          <label>Location</label>
          <input type="text" placeholder="Where to?" />
        </div>
        <div className="search-divider"></div>
        <div className="search-field">
          <label>Date</label>
          <input type="date" />
        </div>
        <button className="search-btn">Find Trip</button>
      </div>
    </div>
  );
};
export default SearchBar;