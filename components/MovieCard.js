import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }}
        style={styles.poster}
      />

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        <Text style={styles.rating}>⭐ {movie.vote_average}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2,
  },
  poster: {
    width: "100%",
    aspectRatio: 2 / 3,
    resizeMode: "contain", 
    backgroundColor: "#000",
  },
  info: {
    padding: 6,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
  },
  rating: {
    marginTop: 2,
    fontSize: 11,
  },
});
