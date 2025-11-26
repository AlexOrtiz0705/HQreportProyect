// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './LoginScreen';
import PricingScreen from './Planes'; // Verifica la ruta
import CreateReport from './CreateReport';
import EditReport from './EditReport';
import main from './main.tsx';
import ConfigReport from './ConfigReport';
import { StackScreen } from 'react-native-screens';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      {/* <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }} edges={['top', 'left', 'right','bottom']}> */}
        
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
            <Stack.Screen
              name="CreateReport"
              component={CreateReport}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditReport"
              component={EditReport}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="main"
              component={main}
              options={{ headerShown: false }}
            />
            <StackScreen
              name="ConfigReport"
              component={ConfigReport}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>

      {/* </SafeAreaView> */}
    </SafeAreaProvider>
  );
}
