import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/S1/HomeScreen';
import AddCar from './screens/S1/AddCar';
import ManageCar from './screens/S2/ManageCar';
import ManageTable from './screens/S3/ManageTable';
import AddAssurance from './screens/S3/AddAssurance';
import AddEntretienKilometre from './screens/S3/AddEntretienKilometre';
import AddEntretienDate from './screens/S3/AddEntretienDate';
import AddConsommationGazoile from './screens/S3/AddConsommationGazoile';
import AddKilometrage from './screens/S3/AddKilometrage';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddCar" component={AddCar} />
        <Stack.Screen name="ManageCar" component={ManageCar} />
        <Stack.Screen name="ManageTable" component={ManageTable} 
        options={({ route }) => ({ title: route.params?.screenTitle || 'Default Title' })} />
        <Stack.Screen name="AddAssurance" component={AddAssurance} />
        <Stack.Screen name="AddEntretienKilometre" component={AddEntretienKilometre} />
        <Stack.Screen name="AddEntretienDate" component={AddEntretienDate} />
        <Stack.Screen name="AddConsommationGazoile" component={AddConsommationGazoile} />
        <Stack.Screen name="AddKilometrage" component={AddKilometrage} />
          
      </Stack.Navigator>
    </NavigationContainer>
  );
}