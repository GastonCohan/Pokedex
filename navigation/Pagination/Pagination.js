import React from "react";
import { View, Button, Text } from "react-native";
import styles from "./Pagination-styles";

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <View style={styles.container}>
      <Button
        title="Previous"
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      <Text
        style={styles.pageInfo}
      >{`Page ${currentPage} of ${totalPages}`}</Text>
      <Button
        title="Next"
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </View>
  );
};

export default Pagination;
