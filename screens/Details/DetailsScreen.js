import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import styles from "./Details-Styles";

const DetailsScreen = ({ route }) => {
  const { pokemonName } = route.params;
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      const data = await response.json();
      setPokemonDetails(data);
    };

    fetchPokemonDetails();
  }, [pokemonName]);

  if (!pokemonDetails) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: pokemonDetails.sprites.other["official-artwork"].front_default,
        }}
        style={styles.image}
      />
      <Text style={styles.name}>{pokemonDetails.name.toUpperCase()}</Text>
      <Text style={styles.detail}>Weight: {pokemonDetails.weight}</Text>
      <Text style={styles.detail}>
        Types: {pokemonDetails.types.map((type) => type.type.name).join(", ")}
      </Text>
    </View>
  );
};

export default DetailsScreen;
