import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import AddCar from './screens/AddCar';
import ManageCar from './screens/ManageCar';
import ManageTable from './screens/ManageTable';
import AddTableEntry from './screens/AddTableEntry';
import AddAssurance from './screens/AddAssurance';
import AddEntretienKilometre from './screens/AddEntretienKilometre';
import AddEntretienDate from './screens/AddEntretienDate';
import AddConsommationGazoile from './screens/AddConsommationGazoile';


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
        <Stack.Screen name="AddTableEntry" component={AddTableEntry}/>
        <Stack.Screen name="AddAssurance" component={AddAssurance} />
        <Stack.Screen name="AddEntretienKilometre" component={AddEntretienKilometre} />
        <Stack.Screen name="AddEntretienDate" component={AddEntretienDate} />
        <Stack.Screen name="AddConsommationGazoile" component={AddConsommationGazoile} />
          
      </Stack.Navigator>
    </NavigationContainer>
  );
}