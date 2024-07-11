import { useState, useCallback, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Button from '../components/Button';
import * as data from '../components/Database';

export default function AddEntretienKilometre({ navigation, route }) {
  const { matricule } = route.params;
  const [name, setName] = useState('');
  const [kilometrageOld, setKilometrageOld] = useState('');
  const [limiteKilometre, setLimiteKilometre] = useState('');
  // const navigation = useNavigation();


useEffect(() => {
  data.getKillometrage(matricule, setKilometrageOld);
}, []);


  const setSubmission = useCallback(() => {
    if (name === '' || limiteKilometre === '' ) {
      alert('Please fill in all fields');
      return;
    } else if (isNaN(kilometrageOld) || isNaN(limiteKilometre)) {
      alert('Kilometrage Old and Limite Kilometre have to be numbers');
      return;
    } else {
      try {
        data.AddEntretienKilometre(matricule, name, kilometrageOld, limiteKilometre);
        alert('Entretien Kilometre added successfully');
        navigation.goBack();
      } catch (error) {
        console.error('Failed to add entretien kilometre:', error);
        alert('Failed to add entretien kilometre');
      }
    }
  }, [name, matricule, limiteKilometre, navigation]);

  return (
    <View style={styles.form}>
      <View style={styles.formElem}>
        <Text style={styles.text}>Nom</Text>
        <TextInput
          style={styles.textIn}
          placeholder='Nom'
          onChangeText={setName}
        />
      </View>
      <View style={styles.formElem}>
        <Text style={styles.text}>Limite Kilometre</Text>
        <TextInput
          style={styles.textIn}
          placeholder='Limite Kilometre'
          keyboardType='numeric'
          onChangeText={setLimiteKilometre}
        />
      </View>
      <Button title="Save" onPress={setSubmission} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  formElem: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    width: '80%',
    margin: 7,
  },
  textIn: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 3,
  },
});
