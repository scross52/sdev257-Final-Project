import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { searchMovies, getTopRatedMovies } from "../services/tmdb";
import MovieCard from "../components/MovieCard";

export default function HomeScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    loadTopRated();
  }, []);

  const loadTopRated = async () => {
    const results = await getTopRatedMovies();
    setMovies(results || []);
  };

  const handleSearch = async (text) => {
    setQuery(text);

    if (text.length > 2) {
      const results = await searchMovies(text);
      setMovies(results || []);
    } else {
      loadTopRated();
    }
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <FlatList
          data={movies}
          numColumns={3}
          keyExtractor={(item) => item.id.toString()}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
          ListHeaderComponent={
            <>
              <Text style={styles.header}>
                {query.length > 2 ? "Search Results" : ""}
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Search for a movie..."
                value={query}
                onChangeText={handleSearch}
              />

              <Text style={styles.subHeader}>
                {query.length <= 2 ? "Top Rated Movies" : ""}
              </Text>
            </>
          }
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
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  container: {
    flex: 1,
    width: "100%",
    maxWidth: 1100,
    padding: 16,
  },
  header: {
    height: 28, 
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
});
