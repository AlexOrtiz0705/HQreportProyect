// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './LoginScreen';
import PricingScreen from './Planes'; // Verifica la ruta

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }} edges={['top', 'left', 'right']}>
        
        <StatusBar 
          style="light" 
          backgroundColor="transparent"
          translucent 
        />

        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Pricing"
              component={PricingScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}
