import { StyleSheet, FlatList, View } from 'react-native';
import * as data from './Database';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import TableEntry from './TableEntry';


export default function TableEntryList({handlePress, refreshKey }) {
  const [entries, setEntries] = useState([]);

  useFocusEffect(
    useCallback(() => {
      data.getTables(setEntries);
    }, [refreshKey])
  );
  const renderItem = useCallback(({ item }) => (
    <TableEntry
      name={item.name}
      onPress={() => handlePress()}
    />
  ), []);

  return (
    <View style={styles.EntryList}>
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={item => item.name}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  EntryList: {
    flexDirection: 'column',
  },
});