import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import CarEntryList from '../components/CarEntryList';
import Button from '../components/Button';
import React, { useState, useCallback } from 'react';
import * as data from '../components/Database';

export default function HomeScreen({ navigation }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);



  const toggleItemSelection = useCallback((matricule) => {
    setSelectedItems(prevSelected =>
      prevSelected.includes(matricule)
        ? prevSelected.filter(item => item !== matricule)
        : [...prevSelected, matricule]
    );
  }, []);

  const handlePress = useCallback((matricule) => {
    if (selectedItems.length > 0) {
      toggleItemSelection(matricule);
    } else {
      // Handle single item press (e.g., navigate to detail view)
      navigation.navigate('ManageCar', { matricule });
    }
  }, [selectedItems, toggleItemSelection]);


  const handleDelete = async () => {
    for (const matricule of selectedItems) {
      await data.deleteCarEntry(matricule);
    }
    setSelectedItems([]);
    setRefreshKey(prevKey => prevKey + 1);
  };


  return (
    <View style={styles.container}>

      {selectedItems.length > 0 && (
        <View style={styles.deleteButtonContainer}>
          <Button title="Delete" onPress={handleDelete} color="red" />
        </View>
      )}

      <View style={styles.ListContainer}>
        <CarEntryList selectedItems={selectedItems} 
        toggleItemSelection={toggleItemSelection}
        handlePress={handlePress}
        refreshKey={refreshKey}
          />
      </View>

      <View style={styles.footerContainer} >
        <Button title="ajouter une nouvelle voiture" onPress={() => navigation.navigate('AddCar')} />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#25292e',
    alignItems: 'center',
  },
  ListContainer: {
    flex: 1,
    paddingTop: 58,
    width: '100%',
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
