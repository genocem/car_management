import { StyleSheet, FlatList, View } from 'react-native';
import * as data from '../Database';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import TableEntry from './TableEntry';

export default function TableEntryList({ selectedItems, toggleItemSelection, handlePress, refreshKey, Tname, matricule }) {
    const [entries, setEntries] = useState([]);

    useFocusEffect(
        useCallback(() => {
            data.getTable(setEntries, Tname, matricule);
        }, [refreshKey])
    );
    const renderItem = useCallback(({ item }) => (
        console.log(item),
        <TableEntry
            name={item.name}
            name2={item.name2}
            name3={item.name3 ?? null}
            isSelected={selectedItems.includes(item.id)}
            onPress={() => handlePress(item.id)}
            onLongPress={() => toggleItemSelection(item.id)}
        />
    ), [selectedItems, handlePress, toggleItemSelection]);

    return (
        <View style={styles.EntryList}>
            <FlatList
                data={entries}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                extraData={selectedItems}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    EntryList: {
        flexDirection: 'column',
    },
});