// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './LoginScreen';
import RegistroScreen from './RegistroScreen';
import Planes from './Planes'; // Verifica la ruta
import CreateReport from './CreateReport';
import EditReport from './EditReport';
import main from './main.tsx';
import ConfigReport from './ConfigReport';
import InfoTecnicos from './InfoTecnicos';
import ReportScreen from './reportScreen.js';
import landing from './landing.tsx'
import { StackScreen } from 'react-native-screens';

import RegisteredUsersScreen from './RegisteredUsersScreen';
import CommerceAccountsScreen from './CommerceAccountsScreen';
import AccountVariablesScreen from './AccountVariables';
import SettingsScreen from './SettingsScreen';
import OperationsScreen from './OperationsScreen';
import AppearanceScreen from './AppearanceScreen';

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
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegistroScreen"
            component={RegistroScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Planes"
            component={Planes}
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
          <Stack.Screen
            name="ConfigReport"
            component={ConfigReport}
            options={{ headerShown: false }}
          />
           <Stack.Screen
              name="Landing"
              component={landing}
              options={{headerShown: false}}
            ></Stack.Screen>


            <Stack.Screen
              name="reportScreen"
              component={ReportScreen}
              options={{headerShown: false}}
            ></Stack.Screen>

          <Stack.Screen
            name="RegisteredUsers"
            component={RegisteredUsersScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CommerceAccounts"
            component={CommerceAccountsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AccountVariables"
            component={AccountVariablesScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Operations"
            component={OperationsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Appearance"
            component={AppearanceScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="InfoTecnicos"
            component={InfoTecnicos}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>

      {/* </SafeAreaView> */}
    </SafeAreaProvider>
  );
}
