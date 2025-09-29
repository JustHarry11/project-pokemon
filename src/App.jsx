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
            <p><strong>Type:</strong> {pokemon.types.map(t => t.type.name).join(", ")}</p>
            <p><strong>Abilities:</strong> {pokemon.abilities.map(a => a.ability.name).join(", ")}</p>
          </div>

          <div className="stats">
            <h3>Base Stats</h3>
            <ul>
              {pokemon.stats.map(stat => (
                <li key={stat.stat.name}>
                  {stat.stat.name}: {stat.base_stat}
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
