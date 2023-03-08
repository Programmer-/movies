// import "./App.css";
import { useEffect, useState } from "react";

import { Card } from "antd";
const { Meta } = Card;

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "bbf3efa2c0msh477e43d7009f0f6p1f0f7ejsn6020d990d89d",
    "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
  },
};

function App() {
  const { isLoaded, setIsloaded } = useState(false);
  const { searchTitle, setsearchTitle } = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState();

  const searchMovies = async (title) => {
    try {
      const response = await fetch(
        `https://moviesdatabase.p.rapidapi.com/titles/search/akas/${title}`,
        options
      );
      const data = await response.json();
      console.log(data);
    } catch (err) {
      setIsloaded(true);
      setError(err);
      console.log(err);
    }
  };
  searchMovies();
  useEffect(() => {
    searchMovies("Spiderman");

    return () => {};
  }, []);

  if (error) {
    return (
      <div>
        <p> Error: {error.message}</p>
      </div>
    );
  } else if (!isLoaded) {
    return (
      <div>
        <p>Loading....</p>
      </div>
    );
  } else {
    return (
      <div className="app">
        <h1>Movies</h1>
        <input
          placeholder="Search for movies"
          value={searchTitle}
          onChange={(e) => setsearchTitle(e.target.value)}
        />
        {movies.results.map((movie) => (
          <Card
            hoverable
            style={{
              width: 240,
            }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        ))}
      </div>
    );
  }
}

export default App;
