import { StyleSheet, ScrollView, View, Text } from 'react-native';
import * as data from './Database';
import React, { useEffect, useState } from 'react';

export default function EntryList() {
    const [entries, setEntries] = useState([]);
    
    useEffect(() => {data.getVoitures(setEntries);}, []); 
    
    return (
        <ScrollView>
            {entries}
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    EntryList: {
        backgroundColor: '#fff',
        flexDirection: 'column',
    },
});