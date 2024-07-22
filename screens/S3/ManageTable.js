import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import React, { useState, useCallback } from 'react';

import Button from '../../components/Button';
import TableEntryList from '../../components/TableS3/TableEntryList';
import * as data from '../../components/Database';


export default function ManageTable({ navigation, route }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const { matricule, Tname } = route.params;

  // guess i'll check if items have actual ids
  const toggleItemSelection = useCallback((id) => {
    setSelectedItems(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(item => item !== id)
        : [...prevSelected, id]
    );
  }, []);

  const handlePress = useCallback((id) => {
    if (selectedItems.length > 0) {
      toggleItemSelection(id);
    } else {
      // ye nothing for now
    }
  }, [selectedItems, toggleItemSelection]);


  const handleDelete = async () => {
    for (const id of selectedItems) {
      await data.deleteTableEntry(Tname, id);
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
        <TableEntryList
          Tname={Tname}
          matricule={matricule}
          selectedItems={selectedItems}
          toggleItemSelection={toggleItemSelection}
          handlePress={handlePress}
          refreshKey={refreshKey}
        />
      </View>

      <View style={styles.footerContainer} >
        <Button   title={
    Tname === 'assurance' ? "Ajouter une assurance" :
    Tname === 'entretienKilometre' ? "Ajouter un entretien kilométrique" :
    Tname === 'entretienDate' ? "Ajouter un entretien daté" :
    Tname === 'consommationGazoile' ? "Ajouter une consommation de gazoile" :
    "Ajouter"
  } onPress={() => {
          if (Tname === 'assurance') {
            navigation.navigate('AddAssurance', { matricule });
          }
          else if (Tname === 'entretienKilometre') {
            navigation.navigate('AddEntretienKilometre', { matricule });
          }
          else if (Tname === 'entretienDate') {
            navigation.navigate('AddEntretienDate', { matricule });
          }
          else if (Tname === 'consommationGazoile') {
            navigation.navigate('AddConsommationGazoile', { matricule });

          }
        }} />
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
