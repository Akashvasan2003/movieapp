import React, { useEffect, useState, useRef } from 'react';
import { 
  View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ScrollView, ActivityIndicator, Animated, Pressable
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const API_URL = 'https://api.themoviedb.org/3/movie/popular?api_key=aaf96c78ceffb8eb75d10677356165e9&language=en-US&page=1';

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const detailScaleAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setMovies(data.results);
        setLoading(false);
        
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start();
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const router = useRouter();

  const handleLongPress = (movie) => {
    setSelectedMovie(movie);
    Animated.spring(detailScaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  const handleCloseDetails = () => {
    Animated.timing(detailScaleAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setSelectedMovie(null));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello,</Text>
        <Text style={styles.username}>User</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <Animated.View style={{ opacity: fadeAnim }}>
          <ScrollView>
            <Text style={styles.sectionTitle}>Popular Movies</Text>
            <FlatList
              horizontal
              data={movies}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.movieCard}
                  onPress={() => router.push(`/${item.id}`)}
                  onLongPress={() => handleLongPress(item)}
                >
                  <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                    style={styles.movieImage}
                  />
                </Pressable>
              )}
              showsHorizontalScrollIndicator={false}
            />
          </ScrollView>
        </Animated.View>
      )}

      {selectedMovie && (
        <Pressable style={styles.overlay} onPress={handleCloseDetails}>
          <Animated.View style={[styles.detailCard, { transform: [{ scale: detailScaleAnim }] }]}> 
            <Image 
              source={{ uri: `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}` }} 
              style={styles.detailImage} 
            />
            <Text style={styles.detailTitle}>{selectedMovie.title}</Text>
            <Text style={styles.detailOverview}>{selectedMovie.overview}</Text>
          </Animated.View>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a4e', paddingTop: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 60, padding: 10, backgroundColor: '#1a1a2e', marginBottom: 20, borderRadius: 200 },
  greeting: { fontSize: 22, color: 'white' },
  username: { fontSize: 22, fontWeight: 'bold', color: 'white' },
  sectionTitle: { fontSize: 18, color: 'white', fontWeight: 'bold', paddingHorizontal: 20, marginVertical: 25 },
  movieCard: { marginHorizontal: 10, borderRadius: 10, overflow: 'hidden' },
  movieImage: { width: 140, height: 200, borderRadius: 10 },
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.8)', justifyContent: 'center', alignItems: 'center' },
  detailCard: { backgroundColor: '#fff', width: '80%', padding: 15, borderRadius: 10, alignItems: 'center' },
  detailImage: { width: 120, height: 180, borderRadius: 10 },
  detailTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  detailOverview: { fontSize: 14, color: '#333', marginTop: 10, textAlign: 'center' },
});

export default HomeScreen;
