import { View, Text, StyleSheet } from "react-native";

export default function MovieDetailScreen({ route }) {
  const { movie } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.rating}>Rating: {movie.vote_average}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: "bold"
  },
  rating: {
    marginVertical: 10,
    fontSize: 18
  },
  overview: {
    fontSize: 16
  }
});
