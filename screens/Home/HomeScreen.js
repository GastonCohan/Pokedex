import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import styles from "./HomeScreen.js";
import SearchBar from "../../components/SearchBar/SearchBar.js";
import Pagination from "../../navigation/Pagination/Pagination.js";
import PokemonCard from "../../components/PokemonCard/PokemonCard.js";

const HomeScreen = ({ navigation }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchPokemonList = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    const data = await response.json();
    setPokemonList(data.results);
    setFilteredPokemonList(data.results);
  };

  useEffect(() => {
    fetchPokemonList();
  }, []);

  useEffect(() => {
    const filteredData = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPokemonList(filteredData);
    setCurrentPage(1);
  }, [searchQuery, pokemonList]);

  const paginatedData = filteredPokemonList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getPokemonId = (url) => {
    const urlParts = url.split("/");
    return urlParts[urlParts.length - 2];
  };

  return (
    <View style={styles.container}>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <FlatList
        data={paginatedData}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          const pokemonId = getPokemonId(item.url);
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

          return (
            <PokemonCard
              name={item.name}
              imageUrl={imageUrl}
              onPress={() =>
                navigation.navigate("Details", { pokemonName: item.name })
              }
            />
          );
        }}
      />
      <Pagination
        currentPage={currentPage}
        totalItems={filteredPokemonList.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </View>
  );
};

export default HomeScreen;
