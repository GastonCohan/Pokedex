import React from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import styles from "./PokemonCard-styles";

const PokemonCard = ({ name, imageUrl, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.name}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </Text>
    </TouchableOpacity>
  );
};

export default PokemonCard;
