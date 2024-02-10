import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { ICountries } from "../interfaces/countries.ts";
import Search from './Search';
import {GET_COUNTRIES} from "../api/queries.ts";



const CountriesList: React.FC = () => {
    const { loading, error, data } = useQuery(GET_COUNTRIES);
    const [filteredCountries, setFilteredCountries] = useState<ICountries[]>([]);



    const handleSearch = (term: string, criteria: string) => {
        if (data) {
            const filtered = data.countries.filter((country: ICountries) => {
                if (criteria === 'name') {
                    return country.name.toLowerCase().startsWith(term.toLowerCase());
                } else if (criteria === 'capital') {
                    return country.capital?.toLowerCase().startsWith(term.toLowerCase());
                } else if (criteria === 'currency') {
                    return country.currency?.toLowerCase().startsWith(term.toLowerCase());
                } else if (criteria === 'continent') {
                    return country.continent.name.toLowerCase().startsWith(term.toLowerCase());
                }
                return false;
            });
            setFilteredCountries(filtered);
        }
    };

    const handleShowAll = () => {
        if (data) {
            setFilteredCountries(data.countries);

        }
    };

    useEffect(() => {
        if (data) {
            setFilteredCountries(data.countries);
        }
    }, [data]);

    if (loading) return <p>Loading countries...</p>;
    if (error) return <p>Error fetching countries: {error.message}</p>;

    return (
        <div>
            <h3>List of Countries</h3>
            <Search onSearch={handleSearch} onShowAll={handleShowAll}/>
            <ul>
                {filteredCountries.map(({code, name, capital, currency, continent}: ICountries) => {
                    return (
                        <li key={code}>
                            <img width={20} height={20}
                                 src={`https://raw.githubusercontent.com/onramper/small-open-datasets/master/rendered-country-flags/flags/${code}.png`}
                                 alt={code}/>
                            <strong>{name}</strong> - Capital: {capital}, Currency: {currency},
                            Continent: {continent.name}
                        </li>
                    )
                })}
            </ul>

        </div>

    );
}

export default CountriesList;
