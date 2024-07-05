import { StyleSheet, FlatList, View } from 'react-native';
import * as data from './Database';
import React, { useCallback, useState } from 'react';
import TableEntry from './TableEntry';


export default function TableEntryList({handlePress}) {
  const entries= [
    {"name": "consommationGazoile"}
    ,{"name": "assurance"}
    ,{"name": "entretienDate"}
    ,{"name": "entretienKilometre"}];

  const renderItem = useCallback(({ item }) => (
    <TableEntry
      name={item.name}
      onPress={() => handlePress(item.name)}
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