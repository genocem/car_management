import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import EntryList from './components/EntryList';
import * as ImagePicker from 'expo-image-picker';
import Button from './components/Button';
import * as NavigationBar from 'expo-navigation-bar';

const PlaceholderImage = require('./assets/images/background-image.png');


export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        
      </View>
      <View style={styles.imageContainer}>
        <EntryList/>
      </View>

      <View style={styles.footerContainer} >
        <Button label="Choose a photo" theme={'primary'} onPress={pickImageAsync}/>
        <Button label="Use this photo"/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
    width: '100%',
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
