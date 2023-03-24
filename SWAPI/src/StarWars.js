import React, { useState, useEffect } from 'react';
import './Star.css';

function StarWarsData() {
  const [films, setFilms] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const fetchFilms = async () => {
      const response = await fetch('https://swapi.dev/api/films/');
      const data = await response.json();
      setFilms(data.results);
    };

    const fetchCharacters = async () => {
      const response = await fetch('https://swapi.dev/api/people/');
      const data = await response.json();
      setCharacters(data.results);
    };

    const fetchVehicles = async () => {
      const response = await fetch('https://swapi.dev/api/vehicles/');
      const data = await response.json();
      setVehicles(data.results);
    };

    const fetchPlanets = async () => {
      const response = await fetch('https://swapi.dev/api/planets/');
      const data = await response.json();
      setPlanets(data.results);
    };

    fetchFilms();
    fetchCharacters();
    fetchVehicles();
    fetchPlanets();
  }, []);

  return (
    <div className='main'>
      <h2>Star Wars Films</h2>
      <div className="card-container">
        {films.map(film => (
          <div key={film.title} className="card">
            <img src={`https://starwars-visualguide.com/assets/img/films/${film.episode_id}.jpg`} alt={film.title} />
            <div className="card-content">
              <h3>{film.title}</h3>
              <p>{film.opening_crawl}</p>
            </div>
          </div>
        ))}
      </div>
      <h2>Star Wars Characters</h2>
      <div className="card-container">
        {characters.map(character => (
          <div key={character.name} className="card">
            <img src={`https://starwars-visualguide.com/assets/img/characters/${getCharacterId(character.url)}.jpg`} alt={character.name} />
            <div className="card-content">
              <h3>{character.name}</h3>
              <p>{`Gender: ${character.gender}`}</p>
              <p>{`Birth Year: ${character.birth_year}`}</p>
              <p>{`Height: ${character.height}`+ 'cm'}</p>
            </div>
          </div>
        ))}
      </div>
      <h2>Star Wars Vehicles</h2>
      <div className="card-container">
        {vehicles.map(vehicle => (
          <div key={vehicle.name} className="card">
            <img src={`https://starwars-visualguide.com/assets/img/vehicles/${getVehicleId(vehicle.url)}.jpg`} alt={vehicle.name} />
            <div className="card-content">
              <h3>{vehicle.name}</h3>
              <p>{`Model: ${vehicle.model}`}</p>
              <p>{`Manufacturer: ${vehicle.manufacturer}`}</p>
            </div>
          </div>
        ))}
      </div>
      <h2>Star Wars Planets</h2>
      <div className="card-container">
        {planets.map(planet => (
          <div key={planet.name} className="card">
            <img src={`https://starwars-visualguide.com/assets/img/planets/${getPlanetId(planet.url)}.jpg`} alt={planet.name} />
            <div className="card-content">
              <h3>{planet.name}</h3>
              <p>{`Diameter: ${planet.diameter}`}</p>
              <p>{`Climate: ${planet.diameter}`}</p>
              <p>{`Population: ${planet.population}`}</p>
              <p>{`Terrain: ${planet.terrain}`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getCharacterId(url) {
  const idRegex = /\/people\/(\d+)\//;
  return url.match(idRegex)[1];
}

function getVehicleId(url) {
  const idRegex = /\/vehicles\/(\d+)\//;
  return url.match(idRegex)[1];
}

function getPlanetId(url) {
  const idRegex = /\/planets\/(\d+)\//;
  return url.match(idRegex)[1];
}

export default StarWarsData;
