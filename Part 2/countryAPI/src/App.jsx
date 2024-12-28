import { useState, useEffect } from 'react';
import axios from 'axios';

// A component to display a single country's details including its weather
const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (country.capital) {
      const apiKey = import.meta.env.VITE_SOME_KEY; // Use environment variable for API key
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${apiKey}&units=metric`)
        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => {
          console.log('Weather API error', error);
        });
    }
  }, [country.capital]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p><strong>Capital:</strong> {country.capital}</p>
      <p><strong>Area:</strong> {country.area} km²</p>
      <p><strong>Languages:</strong> {Object.values(country.languages).join(', ')}</p>
      <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width="100" />

      {weather && (
        <div>
          <h3>Weather in {country.capital}</h3>
          <p><strong>Temperature:</strong> {weather.main.temp} °C</p>
          <p><strong>Weather:</strong> {weather.weather[0].description}</p>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt={weather.weather[0].description} />
        </div>
      )}
    </div>
  );
};

// The main App component
const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setSelectedCountry(null); // Reset selected country on search change
  };

  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Country Information</h1>

      <input
        type="text"
        placeholder="Search for a country"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {countriesToShow.length > 10 && (
        <p>Too many matches, please specify your query further.</p>
      )}

      {countriesToShow.length <= 10 && countriesToShow.length > 1 && (
        <ul>
          {countriesToShow.map((country) => (
            <li key={country.cca3}>
              {country.name.common}{' '}
              <button onClick={() => setSelectedCountry(country)}>Show Details</button>
            </li>
          ))}
        </ul>
      )}

      {countriesToShow.length === 1 && <CountryDetails country={countriesToShow[0]} />}

      {selectedCountry && <CountryDetails country={selectedCountry} />}
    </div>
  );
};

export default App;
