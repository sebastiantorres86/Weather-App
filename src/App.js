import React, { Fragment, useState, useEffect } from "react";
import Header from "./Components/Header";
import Form from "./Components/Form";
import Weather from "./Components/Weather";
import Error from "./Components/Error";

function App() {
  // Form State
  const [search, saveSearch] = useState({
    city: "",
    country: "",
  });

  const [query, saveQuery] = useState(false);
  const [result, saveResult] = useState({});
  const [error, saveError] = useState(false);

  const { city, country } = search;

  useEffect(() => {
    const queryAPI = async () => {
      if (query) {
        const appId = "38d6abaddd7a2a5fb24f3e09fdf0ab44";
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`;

        const answer = await fetch(url);
        const result = await answer.json();

        saveResult(result);
        saveQuery(false);

        // Detects if there were correct results in the query
        if (result.cod === "404") {
          saveError(true);
        } else {
          saveError(false);
        }
      }
    };
    queryAPI();
  }, [city, country, query]);

  let component;
  if (error) {
    component = <Error message="No results" />;
  } else {
    component = <Weather result={result} />;
  }

  return (
    <Fragment>
      <Header title="React Weather App" />

      <div className="container-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Form
                search={search}
                saveSearch={saveSearch}
                saveQuery={saveQuery}
              />
            </div>
            <div className="col m6 s12">{component}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
