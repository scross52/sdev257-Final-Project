import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function MovieCard({ movie, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{movie.title}</Text>
      <Text>Rating: {movie.vote_average}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderBottomWidth: 1
  },
  title: {
    fontSize: 18,
    fontWeight: "bold"
  }
});
