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
      <Stack.Screen name="Home" component={HomeScreen} options={() => ({ title: "Accueil" })} />
<Stack.Screen name="AddCar" component={AddCar} options={() => ({ title: "Ajouter voiture" })} />
<Stack.Screen name="ManageCar" component={ManageCar} options={() => ({ title: "Gérer Voiture" })} />
<Stack.Screen name="ManageTable" component={ManageTable} options={({ route }) => ({ title: route.params?.screenTitle || "Gérer Table" })} />
<Stack.Screen name="AddAssurance" component={AddAssurance} options={() => ({ title: "Ajouter Assurance" })} />
<Stack.Screen name="AddEntretienKilometre" component={AddEntretienKilometre} options={() => ({ title: "Ajouter Entretien Kilometre" })} />
<Stack.Screen name="AddEntretienDate" component={AddEntretienDate} options={() => ({ title: "Ajouter Entretien Date" })} />
<Stack.Screen name="AddConsommationGazoile" component={AddConsommationGazoile} options={() => ({ title: "Ajouter Consommation Gazoile" })} />
<Stack.Screen name="AddKilometrage" component={AddKilometrage} options={() => ({ title: "Ajouter Kilométrage" })} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
