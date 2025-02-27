import React, { useEffect, useState, useRef } from 'react';
import { 
  View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ScrollView, ActivityIndicator, Animated 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const API_URL = 'https://api.themoviedb.org/3/movie/popular?api_key=aaf96c78ceffb8eb75d10677356165e9&language=en-US&page=1';
const ACTION_API_URL = 'https://api.themoviedb.org/3/discover/movie?api_key=aaf96c78ceffb8eb75d10677356165e9&with_genres=28';
const COMEDY_API_URL = 'https://api.themoviedb.org/3/discover/movie?api_key=aaf96c78ceffb8eb75d10677356165e9&with_genres=35';

const HomeScreen = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [topRes, actionRes, comedyRes] = await Promise.all([
          fetch(API_URL),
          fetch(ACTION_API_URL),
          fetch(COMEDY_API_URL)
        ]);

        const topData = await topRes.json();
        const actionData = await actionRes.json();
        const comedyData = await comedyRes.json();

        setTopMovies(topData.results);
        setActionMovies(actionData.results);
        setComedyMovies(comedyData.results);

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

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
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
            <Text style={styles.sectionTitle}>Top 10 Movies Today</Text>
            <FlatList
              horizontal
              data={topMovies}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Animated.View>
                  <TouchableOpacity
                    style={styles.movieCard}
                    onPress={() => router.push(`/${item.id}`)}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                  >
                    <Animated.Image
                      source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                      style={[styles.movieImage, { transform: [{ scale: scaleAnim }] }]}
                    />
                  </TouchableOpacity>
                </Animated.View>
              )}
              showsHorizontalScrollIndicator={false}
            />

            <Text style={styles.sectionTitle}>Action Movies</Text>
            <FlatList
              horizontal
              data={actionMovies}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.movieCard} onPress={() => router.push(`/${item.id}`)}>
                  <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.movieImage} />
                </TouchableOpacity>
              )}
              showsHorizontalScrollIndicator={false}
            />

            <Text style={styles.sectionTitle}>Comedy Movies</Text>
            <FlatList
              horizontal
              data={comedyMovies}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.movieCard} onPress={() => router.push(`/${item.id}`)}>
                  <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.movieImage} />
                </TouchableOpacity>
              )}
              showsHorizontalScrollIndicator={false}
            />
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a4e', paddingTop: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 60, padding: 10, backgroundColor: '#1a1a2e', color: '#fff', textAlign: 'center', marginBottom: 20, borderRadius: 200 },
  greeting: { fontSize: 22, color: 'white' },
  username: { fontSize: 22, fontWeight: 'bold', color: 'white' },
  sectionTitle: { fontSize: 18, color: 'white', fontWeight: 'bold', paddingHorizontal: 20, marginVertical: 25 },
  movieCard: { marginHorizontal: 10, borderRadius: 10, overflow: 'hidden' },
  movieImage: { width: 140, height: 200, borderRadius: 10 },
});

export default HomeScreen;
