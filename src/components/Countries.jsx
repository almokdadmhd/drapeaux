import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./../components/Card";

const Countries = () => {
  // initializer dta à un tab vide
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [playOnce, setPlayOnce] = useState(true);
  const [rangeValue, setRangeValue] = useState(40);
  const [selectedRadio, setSelectedRadio] = useState("");
  const radios = ["Africa", "America", "Asia", "Europe", "Oceania"];

  useEffect(() => {
    if (playOnce) {
      axios
        .get(
          "https://www.restcountries.eu/rest/v2/all?fields=name;population;region;capital;flag"
        )
        .then((res) => {
          setData(res.data);
          setPlayOnce(false);
        });
    }
    // fin ajax request

    const sortedCountry = () => {
      const countryObject = Object.keys(data).map((i) => data[i]);
      const sortedArray = countryObject.sort((a, b) => {
        return b.population - a.population;
      });
      sortedArray.length = rangeValue;
      setSortedData(sortedArray);
    };
    sortedCountry();
  }, [data, playOnce, rangeValue]);

  return (
    <div className="countries">
      <div className="sort-container">
        <input
          type="range"
          min="1"
          max="250"
          value={rangeValue}
          onChange={(e) => setRangeValue(e.target.value)}
        />
        <ul>
          {radios.map((radio) => {
            return (
              <li>
                <input
                  type="radio"
                  value={radio}
                  id={radio}
                  checked={radio === selectedRadio}
                  onChange={(e) => setSelectedRadio(e.target.value)}
                />
                <label htmlFor={radio}>{radio}</label>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="cancel">
          {selectedRadio && <h5 onClick={() =>setSelectedRadio('')}>Réinitialiser</h5>}
      </div>

      <ul className="countries-list">
        {sortedData
        .filter(((country) =>country.region.includes(selectedRadio)))
        .map((country) => (
          <Card country={country} key={country.name} />
        ))}
      </ul>
    </div>
  );
};

export default Countries;
