import { useQuery, gql } from '@apollo/client';
import React from 'react';
import {ICountries} from "../interfaces/countries.ts";

//import ReactCountryFlag from "react-country-flag";

// GraphQL query to get countries
const GET_COUNTRIES = gql`
    query GetCountries {
        countries {
            code
            name
            capital
            currency
        }
    }
`;

const CountriesList: React.FC = () => {
    const { loading, error, data } = useQuery(GET_COUNTRIES);

    if (loading) return <p>Loading countries...</p>;
    if (error) return <p>Error fetching countries: {error.message}</p>;

    return (
        <div>
            <h3>List of Countries</h3>
            <ul>
                {data.countries.map(({ code, name,  capital, currency }: ICountries) => {
                   return (<li key={code}>

                        <img width={20} height={20} src={`https://raw.githubusercontent.com/onramper/small-open-datasets/master/rendered-country-flags/flags/${code}.png`} alt={code}/>
                        <strong>{name}</strong> - Capital: {capital},
                        Currency: {currency}


                    </li>)
                })}
            </ul>
        </div>
    );
}


export default CountriesList;
