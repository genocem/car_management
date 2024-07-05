import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Button(props) {
  const { onPress, title  } = props;
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 17,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    
  },
});
