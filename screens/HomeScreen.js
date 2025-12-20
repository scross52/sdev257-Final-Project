import { View, Text, TextInput, FlatList, StyleSheet, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { searchMovies, getTopRatedMovies } from "../services/tmdb";
import MovieCard from "../components/MovieCard";

export default function HomeScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortType, setSortType] = useState(null);


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


    const applySorting = (list, type) => {
        if (!type) return list;

        const sorted = [...list];

        switch (type) {
            case "A-Z":
                return sorted.sort((a, b) => a.title.localeCompare(b.title));
            case "Z-A":
                return sorted.sort((a, b) => b.title.localeCompare(a.title));
            case "RATING_HIGH":
                return sorted.sort((a, b) => b.vote_average - a.vote_average);
            case "RATING_LOW":
                return sorted.sort((a, b) => a.vote_average - b.vote_average);
            default:
                return list;
        }
    };

    useEffect(() => {
        setMovies((prev) => applySorting(prev, sortType));
    }, [sortType]);


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
                      <View style={styles.headerRow}>
                          <Text style={styles.header}>
                              {query.length > 2 ? "Search Results" : ""}
                          </Text>
                      </View>

                      <TextInput
                          style={styles.input}
                          placeholder="Search for a movie..."
                          value={query}
                          onChangeText={handleSearch}
                      />
                  <Pressable
                      style={styles.filterButton}
                      onPress={() => setShowFilters((prev) => !prev)}
                  >
                      <Text style={styles.filterButtonText}>Filter</Text>
                  </Pressable>
                      {showFilters && (
                          <View style={styles.filterPanel}>
                              <Text style={styles.filterTitle}>Sort By</Text>

                              <Pressable onPress={() => setSortType("A-Z")}>
                                  <Text style={styles.filterOption}>A → Z</Text>
                              </Pressable>

                              <Pressable onPress={() => setSortType("Z-A")}>
                                  <Text style={styles.filterOption}>Z → A</Text>
                              </Pressable>

                              <Pressable onPress={() => setSortType("RATING_HIGH")}>
                                  <Text style={styles.filterOption}>Rating: High → Low</Text>
                              </Pressable>

                              <Pressable onPress={() => setSortType("RATING_LOW")}>
                                  <Text style={styles.filterOption}>Rating: Low → High</Text>
                              </Pressable>
                          </View>
                      )}

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
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    filterButton: {
        backgroundColor: "#333",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        width: "100%",
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    filterButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    filterPanel: {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 8,
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    filterTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
    },
    filterOption: {
        paddingVertical: 6,
        fontSize: 15,
    },
});
