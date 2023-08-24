import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage() {
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    axios
      .get("https://ih-countries-api.herokuapp.com/countries")
      .then((countriesFromAPI) => {
        console.log(countriesFromAPI.data);
        setCountries(countriesFromAPI.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (countries === null) {
    return <h3>Looking For A Country</h3>;
  }
  return (
    <div>
      <p style={{ fontSize: "20px", fontWeight: "bold" }}>
        WikiCountries: Your Guide to the World
      </p>
      {countries.map((country) => {
        return (
          <Link key={country._id} to={`/${country.alpha3Code}`}>
            <div>
              <img
                src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
              />

              <p>{country.name.common}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default HomePage;
