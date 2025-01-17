import React from "react";

export default function PokemonModal({ isOpen, onClose, pokemon, isDarkMode }) {
  if (!isOpen || !pokemon) return null;

  const handleClickOutside = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  return (
    <div
      id="modal-overlay"
      onClick={handleClickOutside}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        className={`relative rounded-lg shadow-lg w-11/12 max-w-2xl p-6 ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        {/* Botão para fechar */}
        <button
          onClick={onClose}
          className={`absolute top-2 right-2 rounded-full p-2 ${
            isDarkMode
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-red-500 text-white hover:bg-red-600"
          } transition`}
        >
          X
        </button>

        {/* Conteúdo do modal */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-shrink-0">
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              className="w-32 h-32 mx-auto"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 capitalize">{pokemon.name}</h2>
            <p className="mb-2">
              <strong>Tipos:</strong>{" "}
              {pokemon.types.map((type) => (
                <span
                  key={type.type.name}
                  className={`inline-block px-2 py-1 rounded text-sm font-medium mr-1 ${
                    isDarkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {type.type.name}
                </span>
              ))}
            </p>
            <p className="mb-2">
              <strong>Habilidades:</strong>
            </p>
            <ul className="mb-4">
              {pokemon.abilities.map((ability, index) => (
                <li
                  key={index}
                  className={`ml-4 list-disc capitalize ${
                    isDarkMode ? "text-gray-300" : "text-black"
                  }`}
                >
                  {ability.ability.name}
                </li>
              ))}
            </ul>
            <p className="mb-2">
              <strong>Movimentos:</strong>
            </p>
            <ul className="flex flex-wrap gap-2">
              {pokemon.moves.slice(0, 10).map((move, index) => (
                <li
                  key={index}
                  className={`px-2 py-1 rounded capitalize text-sm ${
                    isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
                  }`}
                >
                  {move.move.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
