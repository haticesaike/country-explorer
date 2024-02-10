import React, { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';

interface ISearch {
    onSearch: (term: string, criteria: string) => void;
    onShowAll: () => void;
}

const Search: React.FC<ISearch> = ({ onSearch, onShowAll }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchCriteria, setSearchCriteria] = useState<string>('name');

    const debouncedSearch = useCallback(debounce((term, criteria) => {
        onSearch(term, criteria);
    }, 500), []);

    const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        debouncedSearch(e.target.value, searchCriteria);
    };

    const handleCriteriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchCriteria(e.target.value);
        debouncedSearch(searchTerm, e.target.value);
    };

    const handleShowAll = () => {
        onShowAll();
        setSearchTerm('');
        setSearchCriteria('name');
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search countries..."
                value={searchTerm}
                onChange={handleSearchTermChange}
            />
            <select value={searchCriteria} onChange={handleCriteriaChange}>
                <option value="name">Name</option>
                <option value="capital">Capital</option>
                <option value="currency">Currency</option>
                <option value="continent">Continent</option>
            </select>
            <button onClick={handleShowAll}>Show All</button>
        </div>
    );
};

export default Search;
