import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ICountries } from "../interfaces/countries.ts";
import Search from "./Search";
import { GET_COUNTRIES } from "../api/queries.ts";
import "../css/countriesList.css";
import { useAtom } from "jotai";
import { selectedItemAtom } from "../jotai/atoms";
import colors from "../constants/colors.tsx";

function CountriesList() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [countries, setCountries] = useState<ICountries[]>([]);
  const [groupedCountries, setGroupedCountries] = useState<{
    [key: string]: ICountries[];
  }>({});
  const [groupCriteria, setGroupCriteria] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useAtom(selectedItemAtom);
  useEffect(() => {
    if (data) {
      setCountries(data.countries);
    }
  }, [data]);

  useEffect(() => {
    if (groupCriteria && countries.length > 0) {
      groupCountries(countries, groupCriteria);
    }
  }, [groupCriteria, countries]);

  useEffect(() => {
    if (countries.length > 0 && countries.length <= 9) {
      const lastIndex = countries.length - 1;
      setSelectedItem(countries[lastIndex]);
    } else if (countries.length > 9) {
      setSelectedItem(countries[9]);
    }
  }, [countries]);

  const groupCountries = (countries: ICountries[], criteria: string) => {
    const grouped = countries.reduce(
      (acc, country) => {
        const key =
          criteria === "continent" ? country.continent.name : country.currency;

        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(country);

        return acc;
      },
      {} as { [key: string]: ICountries[] },
    );

    setGroupedCountries(grouped);
  };

  const handleSearch = (term: string, criteria: keyof ICountries) => {
    if (!data) return;

    const filtered = data.countries.filter((country: ICountries) => {
      return criteria === "continent"
        ? country.continent.name.toLowerCase().includes(term.toLowerCase())
        : country[criteria]?.toLowerCase().includes(term.toLowerCase());
    });

    setCountries(filtered);
    if (groupCriteria) {
      groupCountries(filtered, groupCriteria);
    }
  };

  if (loading) return <p>Loading countries...</p>;
  if (error) return <p>Error fetching countries: {error.message}</p>;

  return (
    <div className="scroll-content">
      <h3>List of Countries</h3>
      <Search
        onSearch={handleSearch}
        onShowAll={() => {
          setCountries(data.countries);
          setGroupCriteria("all");
          setSelectedItem(null);
        }}
      />
      <select
        onChange={(e) => setGroupCriteria(e.target.value)}
        value={groupCriteria}
        className="select-box"
      >
        <option value="all">All</option>
        <option value="continent">Continent</option>
        <option value="currency">Currency</option>
      </select>
      {groupCriteria !== "all"
        ? Object.entries(groupedCountries).map(([key, countries]) => (
            <div key={key} className="country">
              <h4>{key}</h4>
              <ul>
                {countries.map((country) => (
                  <li
                    key={country.code}
                    onClick={() => setSelectedItem(country)}
                    style={
                      selectedItem?.code === country.code
                        ? { backgroundColor: colors.selectColor }
                        : undefined
                    }
                  >
                    <img
                      width={20}
                      height={20}
                      src={`https://raw.githubusercontent.com/onramper/small-open-datasets/master/rendered-country-flags/flags/${country.code}.png`}
                      alt={country.code}
                    />
                    {country.name} - Capital: {country.capital}, Currency:{" "}
                    {country.currency}
                  </li>
                ))}
              </ul>
            </div>
          ))
        : countries?.map((country) => (
            <li
              key={country.code}
              onClick={() => setSelectedItem(country)}
              style={
                selectedItem?.code === country.code
                  ? { backgroundColor: colors.selectColor }
                  : undefined
              }
            >
              <img
                width={20}
                height={20}
                src={`https://raw.githubusercontent.com/onramper/small-open-datasets/master/rendered-country-flags/flags/${country.code}.png`}
                alt={country.code}
              />
              {country.name} - Capital: {country.capital}, Currency:{" "}
              {country.currency}
            </li>
          ))}
    </div>
  );
}

export default CountriesList;
