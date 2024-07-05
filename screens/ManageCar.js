import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import EntryList from '../components/CarEntryList';
import Button from '../components/Button';
import React, { useState, useCallback } from 'react';
import * as data from '../components/Database';
import TableEntryList from '../components/TableEntryList';


export default function ManageCar({ navigation,route }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const { matricule } = route.params;
  
  
  
  const handlePress = useCallback(() => {
    navigation.navigate('EditEntry', { matricule });
  });


  // const toggleItemSelection = useCallback((matricule) => {
  //   setSelectedItems(prevSelected =>
  //     prevSelected.includes(matricule)
  //       ? prevSelected.filter(item => item !== matricule)
  //       : [...prevSelected, matricule]
  //   );
  // }, []);

  // const handlePress = useCallback((matricule) => {
  //   if (selectedItems.length > 0) {
  //     toggleItemSelection(matricule);
  //   } else {
  //     // handle editing entry
  //     // navigation.navigate('edit entry', { matricule });
  //   }
  // }, [selectedItems, toggleItemSelection]);


  // const handleDelete = async () => {
  //   for (const matricule of selectedItems) {
  //     await data.deleteEntry(matricule);
  //   }
  //   setSelectedItems([]);
  //   setRefreshKey(prevKey => prevKey + 1);
  // };


  return (
    <View style={styles.container}>

      <View style={styles.ListContainer}>
        <TableEntryList
        handlePress={handlePress}
        refreshKey={refreshKey}
          />
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
