import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function CountryDetails() {
  const [countriesInfo, setCountriesInfo] = useState(null);
  const params = useParams();

  useEffect(() => {
    axios
      .get(
        `https://ih-countries-api.herokuapp.com/countries/${params.countryId}`
      )
      .then((countriesInfoFromAPI) => {
        setCountriesInfo(countriesInfoFromAPI.data);
        console.log(countriesInfoFromAPI.data);
        console.log(countriesInfo);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.countryId]);
  if (countriesInfo === null) {
    return (
      <div>
        <h3>Looking For Country Details</h3>
      </div>
    );
  }

  return (
    <div>
      <p style={{ fontSize: "20px", fontWeight: "bold" }}>Country Details</p>

      <img
        src={`https://flagpedia.net/data/flags/icon/72x54/${countriesInfo.alpha2Code.toLowerCase()}.png`}
      />
      <h1>{countriesInfo.name.common}</h1>
      <div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <p>Capital</p> <p>{countriesInfo.capital}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <p>Area</p> <p>{countriesInfo.area}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <p>Borders</p>
          <div>
            {countriesInfo.borders.map((oneBorder) => {
              return (
                <div key={oneBorder}>
                  <Link to={`/${oneBorder}`}>{oneBorder}</Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryDetails;
