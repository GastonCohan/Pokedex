import React from "react";
import { View, TextInput } from "react-native";
import styles from "./SearchBar-styles";

const SearchBar = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search Pokémon"
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};

export default SearchBar;
