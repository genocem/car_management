import { StyleSheet, FlatList, View, Alert } from 'react-native';
import * as data from '../Database';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import CarEntry from './CarEntry';

export default function CarEntryList({ selectedItems, toggleItemSelection, handlePress, refreshKey }) {
  const [entries, setEntries] = useState([]);

  // const showPrompt = () => {
  //   Alert.alert(
  //     "Choose an option",
  //     "Please select one of the following:",
  //     [
  //       { text: "Use ", onPress: () => console.log("Option 1 selected") },
  //       { text: "Option 2", onPress: () => console.log("Option 2 selected") },
  //       { text: "Show Picker", onPress: () => setShowPicker(true) },
  //     ]
  //   );
  // };
  useFocusEffect(
    useCallback(() => {
      data.getVoitures(setEntries);
      data.deleteIfSoftDeleted30Days();
    }, [refreshKey])
  );
  // useFocusEffect(
  //   useCallback(() => {
  //     data.script();
  //   }, [])
  // );
  const renderItem = useCallback(({ item }) => (
    <CarEntry
      name={item.nomProprietere}
      matricule={item.matricule}
      kilometrage={item.kilometrageTotale}
      isSelected={selectedItems.includes(item.matricule)}
      onPress={() => handlePress(item.matricule)}
      onLongPress={() => toggleItemSelection(item.matricule)}
    />
  ), [selectedItems, handlePress, toggleItemSelection]);

  return (
    <View style={styles.EntryList}>
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={item => item.matricule.toString()}
        extraData={selectedItems}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  EntryList: {
    flexDirection: 'column',
  },
});