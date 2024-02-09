import { useQuery, gql } from '@apollo/client';
import React from 'react';
import ReactCountryFlag from "react-country-flag";

// GraphQL query to get countries
const GET_COUNTRIES = gql`
    query GetCountries {
        countries {
            code
            name
            emoji
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
                {data.countries.map(({ code, name, capital, currency }: { code: string; name: string; capital: string; currency: string }) => (
                    <li key={code}>
                        <p>
                            <ReactCountryFlag countryCode={code} svg style={{width: '2em', height: '2em'}} />
                            <strong>{name}</strong> - Capital: {capital}, Currency: {currency}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CountriesList;
