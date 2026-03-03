import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import MainTabNavigator from '@/navigation/MainTabNavigator';
import theme from '@/constants/theme';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style="dark" backgroundColor={theme.colors.background} />
      <MainTabNavigator />
    </NavigationContainer>
  );
};

export default App;