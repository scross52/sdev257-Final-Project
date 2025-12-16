import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";
import { useState } from "react";
import { searchMovies } from "../services/tmdb";
import MovieCard from "../components/MovieCard";

export default function HomeScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = async (text) => {
    setQuery(text);
    if (text.length > 2) {
      const results = await searchMovies(text);
      setMovies(results);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movie Review App</Text>

      <TextInput
        style={styles.input}
        placeholder="Search for a movie..."
        value={query}
        onChangeText={handleSearch}
      />

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() =>
              navigation.navigate("Movie Details", { movie: item })
            }
          />
        )}
      />
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
    fontWeight: "bold",
    marginBottom: 12
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 12
  }
});
