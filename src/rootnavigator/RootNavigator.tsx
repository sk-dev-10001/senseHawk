/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler'; // Import this at the top of the file
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../homescreen';
import ChatScreen from '../chatscreen';
import MapScreen from '../mapscreen/MapScreen';

function AppStackNavigator(): JSX.Element {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Chatscreen"
          component={ChatScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Mapscreen"
          component={MapScreen}
          options={{
            headerShown: true,
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: '#4FC3F7',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppStackNavigator;
