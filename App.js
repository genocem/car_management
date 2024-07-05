import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import AddCar from './screens/AddCar';
import ManageCar from './screens/ManageCar';
import EditEntry from './screens/EditEntry';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddCar" component={AddCar} />
        <Stack.Screen name="ManageCar" component={ManageCar} />
        <Stack.Screen name="EditEntry" component={EditEntry} 
        options={({ route }) => ({ title: route.params?.screenTitle || 'Default Title' })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}