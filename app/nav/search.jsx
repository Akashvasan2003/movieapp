import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const mockMovies = [
  { id: '1', title: 'Black Phone', image: require('../../assets/images/black.jpg') },
  { id: '2', title: 'Joker', image: require('../../assets/images/Joker.jpg') },
  { id: '3', title: 'Avatar', image: require('../../assets/images/avatar.jpg') },
  { id: '4', title: 'Hellboy', image: require('../../assets/images/hell.jpg') },
  { id: '5', title: 'Edge', image: require('../../assets/images/edge.jpg') },
  { id: '6', title: 'Arrival', image: require('../../assets/images/arrival.jpg') },
  { id: '7', title: 'Hangover', image: require('../../assets/images/hang.jpg') },
  { id: '8', title: '17 Again', image: require('../../assets/images/17.jpg') },
  { id: '9', title: 'Rush Hour', image: require('../../assets/images/rush.jpg') },
];

const Search = () => {
  const [query, setQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState(mockMovies);

  const handleSearch = (text) => {
    setQuery(text);
    const filtered = mockMovies.filter((movie) =>
      movie.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <Text style={styles.header}>My Favorites</Text>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={24} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search movies..."
          placeholderTextColor="#888"
          value={query}
          onChangeText={handleSearch}
        />
      </View>

      {/* Movie Results */}
      {filteredMovies.length > 0 ? (
        <FlatList
          data={filteredMovies}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.movieCard}>
              <Image source={item.image} style={styles.movieImage} />
              <Text style={styles.movieTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.noResults}>No results found</Text>
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a4e', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', paddingHorizontal: 20 ,padding : 10,backgroundColor: '#1a1a2e', color: '#fff', textAlign: 'center', marginBottom: 20, borderRadius : 200},
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#222',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, color: '#fff', fontSize: 16 },
  movieCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  movieImage: { width: 60, height: 85, borderRadius: 5, marginRight: 10 },
  movieTitle: { color: '#fff', fontSize: 16 },
  noResults: { color: '#888', textAlign: 'center', marginTop: 20, fontSize: 18 },
});
