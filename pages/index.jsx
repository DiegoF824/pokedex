import { fetchPokemonList, fetchPokemonDetails } from "@/utils/api";
import Header from "@/components/Header";
import PokemonCard from "@/components/PokemonCard";
import PokemonModal from "@/components/PokemonModal";
import { useState, useEffect } from "react";

export default function Home({ pokemonList }) {
  const [displayedPokemons, setDisplayedPokemons] = useState([]);
  const [loadCount, setLoadCount] = useState(10);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleCardClick = async (pokemon) => {
    const details = await fetchPokemonDetails(pokemon.url.split("/")[6]);
    setSelectedPokemon(details);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
  };

  const filteredPokemons = pokemonList.filter((pokemon) => {
    const matchesSearch = pokemon.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTypes =
      selectedTypes.length === 0 ||
      pokemon.types.some((type) => selectedTypes.includes(type.type.name));
    return matchesSearch && matchesTypes;
  });

  useEffect(() => {
    setDisplayedPokemons(filteredPokemons.slice(0, loadCount));
  }, [loadCount, filteredPokemons]);

  const loadMorePokemons = () => {
    setLoadCount((prev) => prev + 10);
  };

  const themeClasses = isDarkMode
    ? "bg-fundo-escuro text-white"
    : "bg-fundo-claro text-black";

  if (!pokemonList || pokemonList.length === 0) {
    return (
      <div className={`${themeClasses} bg-cover bg-fixed bg-center min-h-screen`}>
        <Header
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
          setSearchTerm={setSearchTerm}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
        />
        <div className="text-center mt-8 text-xl">
          Nenhum Pokémon encontrado. Tente novamente mais tarde.
        </div>
      </div>
    );
  }

  return (
    <div className={`${themeClasses} bg-cover bg-fixed bg-center min-h-screen`}>
      <Header
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        setSearchTerm={setSearchTerm}
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
      />

      <div className="pt-24 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {displayedPokemons.map((pokemon, index) => (
          <PokemonCard
            pokemon={pokemon}
            index={index}
            key={pokemon.name}
            isDarkMode={isDarkMode}
            onClick={() => handleCardClick(pokemon)}
          />
        ))}
      </div>

      {displayedPokemons.length < filteredPokemons.length && (
        <div className="text-center mt-6 p-3">
          <button
            onClick={loadMorePokemons}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Carregar mais
          </button>
        </div>
      )}

      <PokemonModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        pokemon={selectedPokemon}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

export async function getStaticProps() {
  const pokemonList = await fetchPokemonList(151, 0);

  for (const pokemon of pokemonList) {
    const details = await fetchPokemonDetails(pokemon.url.split("/")[6]);
    pokemon.types = details.types;
  }

  return {
    props: { pokemonList },
  };
}
