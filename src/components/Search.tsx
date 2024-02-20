import React, { useState, useCallback } from "react";
import debounce from "lodash/debounce";
import { ICountries } from "../interfaces/countries.ts";
import "../css/search.css";

interface ISearch {
  onSearch: (term: string, criteria: keyof ICountries) => void;
  onShowAll: () => void;
  groupCriteria: string;
  setGroupCriteria: React.Dispatch<React.SetStateAction<string>>;
}

function Search({ onSearch, onShowAll, setGroupCriteria }: ISearch) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchCriteria, setSearchCriteria] = useState<string>("name");

  const debouncedSearch = useCallback(
    debounce((term, criteria) => {
      onSearch(term, criteria);
    }, 500),
    [],
  );

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value, searchCriteria);
  };

  const handleCriteriaChange = (value: string) => {
    console.log(value);
    setSearchCriteria(value);
    debouncedSearch(searchTerm, value);
  };

  const handleShowAll = () => {
    onShowAll();
    setSearchTerm("");
    setSearchCriteria("name");
  };

  return (
    <div className="search-container">
      <div>
        <div className="text">Search by</div>

        <input
          type="text"
          placeholder="Search "
          value={searchTerm}
          onChange={handleSearchTermChange}
          className="search-box"
        />
      </div>
      <div>
        <div className="text">Filter by</div>

        <select
          value={searchCriteria}
          onChange={(e) => handleCriteriaChange(e.target.value)}
          className="select-box"
        >
          <option value="name">Name</option>
          <option value="capital">Capital</option>
          <option value="currency">Currency</option>
          <option value="continent">Continent</option>
        </select>
      </div>

      <div>
        <div className="text">Group by</div>
        <select
          onChange={(e) => setGroupCriteria(e.target.value)}
          className="select-box"
        >
          <option value="all">All</option>
          <option value="continent">Continent</option>
          <option value="currency">Currency</option>
        </select>
      </div>
      <div>
        <button className="button" onClick={handleShowAll}>
          Show All
        </button>
      </div>
    </div>
  );
}

export default Search;
