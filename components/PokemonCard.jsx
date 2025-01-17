import React, { useState, useEffect } from "react";

export default function PokemonCard({ pokemon, index, className, isDarkMode, onClick }) {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const res = await fetch(pokemon.url);
      const data = await res.json();
      setPokemonData(data);
    };
    fetchPokemonData();
  }, [pokemon.url]);

  const getTypeColor = (type) => {
    const typeColors = {
      fire: "bg-red-500 text-white",
      water: "bg-blue-500 text-white",
      grass: "bg-green-500 text-white",
      electric: "bg-yellow-500 text-white",
      ground: "bg-yellow-700 text-white",
      rock: "bg-gray-500 text-white",
      psychic: "bg-pink-500 text-white",
      ice: "bg-blue-300 text-black",
      dragon: "bg-purple-600 text-white",
      dark: "bg-gray-800 text-white",
      fairy: "bg-pink-300 text-black",
      normal: "bg-gray-300 text-black",
      fighting: "bg-red-800 text-white",
      poison: "bg-purple-500 text-white",
      flying: "bg-blue-200 text-black",
      bug: "bg-green-700 text-white",
      ghost: "bg-purple-800 text-white",
      steel: "bg-gray-400 text-black",
    };
    return typeColors[type] || "bg-gray-300 text-black";
  };

  if (!pokemonData) return <div>Carregando...</div>;

  const types = pokemonData.types.map((type) => type.type.name);

  return (
    <div
      onClick={onClick}
      className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"}
        rounded-lg shadow-lg p-4 text-center hover:scale-105 transform transition duration-300 ${className}`}
    >
      <img
        src={pokemonData.sprites.front_default}
        alt={pokemon.name}
        className="w-32 h-32 mx-auto mb-4"
      />
      <h3 className="font-bold capitalize text-xl">{pokemon.name}</h3>
      <div className="mt-2 flex justify-center gap-2">
        {types.map((type) => (
          <span
            key={type}
            className={`px-2 py-1 rounded-lg text-sm font-semibold ${getTypeColor(type)}`}
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}
