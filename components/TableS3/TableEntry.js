import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

export default function TableEntry({ name, isSelected, onPress, onLongPress, name2, name3 }) {
    return (
        <View style={[styles.Entry, isSelected && styles.selectedEntry]}>
            <TouchableOpacity 
                onPress={onPress}
                onLongPress={onLongPress}>
                <View style={styles.listItem}>
                    <Text style={styles.name}>{name}</Text>
                    <Text>{name2}</Text>
                    {name3 && <Text>{name3}</Text>}
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    Entry: {
        margin: 10,
        padding: 6,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    selectedEntry: {
        backgroundColor: 'lightblue',
    },
    listItem: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 13,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});