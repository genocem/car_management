// import { StyleSheet, FlatList, View } from 'react-native';
// import * as data from './Database';
// import React, { useCallback, useState } from 'react';
// import { useFocusEffect } from '@react-navigation/native';
// import Entry from './Entry';


// export default function TableEntryList({ selectedItems, toggleItemSelection, handlePress, refreshKey }) {
//   const [entries, setEntries] = useState([]);

//   useFocusEffect(
//     useCallback(() => {
//       data.getVoitures(setEntries);
//     }, [refreshKey])
//   );
//   const renderItem = useCallback(({ item }) => (
//     <Entry
//       name={item.nomProprietere}
//       matricule={item.matricule}
//       kilometrage={item.kilometrageTotale}
//       isSelected={selectedItems.includes(item.matricule)}
//       onPress={() => handlePress(item.matricule)}
//       onLongPress={() => toggleItemSelection(item.matricule)}
//     />
//   ), [selectedItems, handlePress, toggleItemSelection]);

//   return (
//     <View style={styles.EntryList}>
//       <FlatList
//         data={entries}
//         renderItem={renderItem}
//         keyExtractor={item => item.matricule.toString()}
//         extraData={selectedItems}
//       />
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   EntryList: {
//     flexDirection: 'column',
//   },
// });