import { Tabs, useRouter, usePathname } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NavLayout = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get current tab path

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: '#1a1a2e' },
        headerTitleStyle: { fontSize: 20, fontWeight: '600' , color : 'white'},
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => {
              if (pathname === '/nav/home') {
                router.replace('/Login/login'); // Navigate to login only from home
              } else {
                router.replace('/nav/home'); // Other tabs go to home
              }
            }}
            style={{ marginLeft: 15 }}
          >
            <Ionicons name="menu" size={24} color="white" />
          </TouchableOpacity>
        ),
        tabBarStyle: { backgroundColor: '#1a1a2e', borderTopWidth: 0 },
        tabBarActiveTintColor: '#007BFF',
        tabBarInactiveTintColor: '#8e8e8e',
        tabBarIconStyle: { padding: 5 , marginTop : -5 },
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      {/* Define your tabs here */}
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="search-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="heart-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
};

export default NavLayout;


