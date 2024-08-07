import { StyleSheet, FlatList, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import DbEntry from './DbEntry';


export default function DbEntryList({handlePress}) {
  const entries= [
    {"name": "kilometrage", "shownName": "Kilometrage"},
    {"name": "consommationGazoile", "shownName": "Consommation de Gazoile"}
    ,{"name": "assurance", "shownName": "Assurance"}
    ,{"name": "entretienDate", "shownName": "Entretien Date"}
    ,{"name": "entretienKilometre", "shownName": "Entretien Kilometrique"}
  ];

  const renderItem = useCallback(({ item }) => (
    <DbEntry
      name={item.shownName}
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