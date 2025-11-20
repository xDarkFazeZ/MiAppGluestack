// App.js
import { config } from '@gluestack-ui/config';
import { Box, GluestackUIProvider, Text } from '@gluestack-ui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/firebase/firebaseConfig';

// Navegadores
import AppNavigator from './src/navigation/AppNavigator';
import LoginScreen from './src/screens/LoginScreen';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Usuario actual:', user?.email);
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <GluestackUIProvider config={config}>
            <Box flex={1} justifyContent="center" alignItems="center">
              <Text>Cargando...</Text>
            </Box>
          </GluestackUIProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <GluestackUIProvider config={config}>
          <NavigationContainer>
            {user ? <AppNavigator /> : <LoginScreen />}
          </NavigationContainer>
        </GluestackUIProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default registerRootComponent(App);