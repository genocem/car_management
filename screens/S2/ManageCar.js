import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import React, { useState, useCallback } from 'react';

import DbEntryList from '../../components/DbS2/DbEntryList';


export default function ManageCar({ navigation,route }) {

  const { matricule } = route.params;
  
    
  const handlePress = useCallback((Tname) => {
    var title = Tname;
    if (title == "consommationGazoile"){title="Consommation Gazoile"}
    else if (title == "entretienKilometre"){title="Entretien Kilometrage"}
    else if (title == "entretienDate"){title="Entretien Date"}
    else if (title == "kilometrage"){title="Kilometrage"}
    else {title="Assurance"}
    navigation.navigate('ManageTable', { matricule,Tname, screenTitle: title });
  });

  return (
    <View style={styles.container}>

      <View style={styles.ListContainer}>
        <DbEntryList handlePress={handlePress} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
