import { StyleSheet, FlatList, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import DbEntry from './DbEntry';


export default function DbEntryList({handlePress}) {
  const entries= [
    {"name": "consommationGazoile"}
    ,{"name": "assurance"}
    ,{"name": "entretienDate"}
    ,{"name": "entretienKilometre"}];

  const renderItem = useCallback(({ item }) => (
    <DbEntry
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