import { StyleSheet, Text, View } from 'react-native'
import { Slot, Stack } from 'expo-router';

const RootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="nav" options={{ headerShown: false }} />
      <Stack.Screen name="[movieId]" options={{ headerTitle: false }} />
    </Stack> 
  )
}

export default RootLayout

