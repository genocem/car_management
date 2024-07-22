import { useState, useCallback, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import * as data from '../../components/Database';


export default function AddConsommationGazoile({ navigation, route }) {
  const { matricule } = route.params;
  const [quantiteCarburant, setQuantiteCarburant] = useState('');
  const [date, setDate] = useState('');
  const [kilometrage, setKilometrage] = useState('');
  const [prix, setPrix] = useState('');

  useEffect(() => {
    data.getKillometrage(matricule, setKilometrage);
  }, []);

  const setSubmission = useCallback(() => {
    if (quantiteCarburant === '' || date === '' || prix === '') {
      alert('Please fill in all fields');
      return;
    } else if (isNaN(quantiteCarburant) || isNaN(kilometrage) || isNaN(prix)) {
      alert('Quantite Carburant, Kilometrage, and Prix have to be numbers');
      return;
    } else {
      try {
        data.AddConsommationGazoile(quantiteCarburant, date, kilometrage, matricule, prix);
        alert('Consommation Gazoile added successfully');
        navigation.goBack();
      } catch (error) {
        console.error('Failed to add consommation gazoile:', error);
        alert('Failed to add consommation gazoile');
      }
    }
  }, [quantiteCarburant, date, kilometrage, matricule, prix, navigation]);

  return (
    <View style={styles.form}>
      <View style={styles.formElem}>
        <Text style={styles.text}>Quantite Carburant</Text>
        <TextInput
          style={styles.textIn}
          placeholder='Quantite Carburant'
          keyboardType='numeric'
          onChangeText={setQuantiteCarburant}
        />
      </View>
      <View style={styles.formElem}>
        <Text style={styles.text}>Date</Text>
        <TextInput
          style={styles.textIn}
          placeholder='Date'
          onChangeText={setDate}
        />
      </View>
      <View style={styles.formElem}>
        <Text style={styles.text}>Kilometrage</Text>
        <TextInput
          style={styles.textIn}
          placeholder='Kilometrage'
          keyboardType='numeric'
          onChangeText={setKilometrage}
        />
      </View>
      <View style={styles.formElem}>
        <Text style={styles.text}>Prix</Text>
        <TextInput
          style={styles.textIn}
          placeholder='Prix'
          keyboardType='numeric'
          onChangeText={setPrix}
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