import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState(null);

  const getRandomPokemon = async () => {
    try {
      const randomId = Math.floor(Math.random() * 1025) + 1;
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      setPokemon(response.data);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    }
  };

  const typeClass = (type) => `type-badge ${type}`;

  return (
    <div className="app">
      <h1 className="title">Random Pokémon Generator</h1>
      <button className="btn" onClick={getRandomPokemon}>
        Get Random Pokémon
      </button>

      {pokemon && (
        <div className="pokemon-card">
          <h2 className="pokemon-name">
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h2>
          <img
            className="pokemon-img"
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />

          <div className="info">
            <p><strong>Type:</strong></p>
            <div className="types">
              {pokemon.types.map((t) => (
                <span key={t.slot} className={typeClass(t.type.name)}>
                  {t.type.name}
                </span>
              ))}
            </div>
            <p>
              <strong>Abilities:</strong>{" "}
              {pokemon.abilities.map((a) => a.ability.name).join(", ")}
            </p>
          </div>

          <div className="stats">
            <h3>Base Stats</h3>
            <ul>
              {pokemon.stats.map((stat) => (
                <li key={stat.stat.name} className="stat-item">
                  <span className="stat-name">{stat.stat.name}</span>
                  <div className="stat-bar">
                    <div
                      className="stat-fill"
                      style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                    ></div>
                  </div>
                  <span className="stat-value">{stat.base_stat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
