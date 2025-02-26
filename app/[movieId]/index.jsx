import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const MovieDetails = () => {
  const { movieId } = useLocalSearchParams();  // Get movie ID from dynamic route
  const router = useRouter();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=aaf96c78ceffb8eb75d10677356165e9&language=en-US`);
        const data = await response.json();
        setMovie(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#fff" />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      {movie && (
        <>
          <Image 
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
            style={styles.poster}
          />
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.overview}>{movie.overview}</Text>
          <Text style={styles.rating}>Rating: {movie.vote_average}/10</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e', padding: 20 },
  backButton: { position: 'absolute', top: 40, left: 20, zIndex: 10 },
  poster: { width: '100%', height: 500, borderRadius: 10, marginTop: 50},
  title: { fontSize: 24, fontWeight: 'bold', color: 'white', marginTop: 20 },
  overview: { fontSize: 16, color: 'white', marginTop: 10 },
  rating: { fontSize: 18, fontWeight: 'bold', color: '#FFD700', marginTop: 10 },
});

export default MovieDetails;
