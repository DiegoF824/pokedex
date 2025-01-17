import { useState } from "react";
import Image from "next/image";
import Logo from "@/public/images/logo.svg";
import Claro from "@/public/images/claro.svg";
import Escuro from "@/public/images/escuro.svg";

const Header = ({ toggleTheme, isDarkMode, setSearchTerm, selectedTypes, setSelectedTypes }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Alterna o estado do menu de filtro
    const toggleFilterMenu = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    // Manipula a seleção dos tipos de Pokémon
    const handleFilterChange = (type) => {
        setSelectedTypes((prevSelectedTypes) => {
            if (prevSelectedTypes.includes(type)) {
                // Remove o tipo se já estiver selecionado
                return prevSelectedTypes.filter((item) => item !== type);
            } else {
                // Adiciona o tipo se não estiver selecionado
                return [...prevSelectedTypes, type];
            }
        });
    };

    return (
        <div
            className={`fixed top-0 left-0 right-0 z-10 p-4 flex items-center justify-between ${isDarkMode ? "bg-gray-800 text-white" : "bg-[#ba4644] text-black"
                } shadow-md`}
        >
            <div className="w-11">
                <Image src={Logo} alt="Logo" />
            </div>
            <div className="flex items-center gap-7">
                <div>
                    <input
                        type="text"
                        placeholder="Search Pokémon"
                        onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de busca
                        className={`px-4 py-2 rounded-lg focus:outline-none ${isDarkMode
                            ? "bg-gray-700 text-white border border-gray-600"
                            : "bg-white text-black"
                            }`}
                    />
                </div>
                <div className="relative">
                    <button
                        onClick={toggleFilterMenu}
                        className={`px-4 py-2 rounded-lg ${isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"} flex items-center`}
                    >
                        Filtro
                    </button>

                    {/* Menu de filtros */}
                    {isFilterOpen && (
                        <div className={`absolute top-full right-0 mt-2 ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-lg w-48 p-4`}>
                            <h4 className={`font-bold ${isDarkMode ? "text-white" : "text-black"} mb-2`}>Selecione os Tipos</h4>
                            <div className="flex flex-col gap-2">
                                {[
                                    "fire", "water", "grass", "electric", "ground", "rock",
                                    "psychic", "ice", "dragon", "dark", "fairy", "normal",
                                    "fighting", "poison", "flying", "bug", "ghost", "steel"
                                ].map((type) => (
                                    <label key={type} className={isDarkMode ? "text-white" : "text-black"}>
                                        <input
                                            type="checkbox"
                                            checked={selectedTypes.includes(type)}
                                            onChange={() => handleFilterChange(type)}
                                            className="mr-2"
                                        />
                                        {type.charAt(0).toUpperCase() + type.slice(1)} {/* Exibe o nome do tipo */}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="w-11">
                    <button onClick={toggleTheme}>
                        <Image src={isDarkMode ? Escuro : Claro} alt="Tema" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
