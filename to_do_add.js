// import React, { useState, useCallback } from 'react';
// import { View, FlatList, TouchableOpacity, Text } from 'react-native';
// import { useFocusEffect } from '@react-navigation/native';

// function HomeScreen() {
//   const [data, setData] = useState([]);
//   const [selectedItems, setSelectedItems] = useState([]);

//   const fetchData = useCallback(() => {
//     // Fetch your data here and update the state
//     // setData(fetchedData);
//   }, []);

//   useFocusEffect(
//     useCallback(() => {
//       fetchData();
//     }, [fetchData])
//   );

//   const toggleItemSelection = (id) => {
//     setSelectedItems(prevSelected => 
//       prevSelected.includes(id)
//         ? prevSelected.filter(item => item !== id)
//         : [...prevSelected, id]
//     );
//   };

//   const deleteSelectedItems = () => {
//     // Implement your delete logic here
//     // After deletion, update your data and clear selection
//     setData(prevData => prevData.filter(item => !selectedItems.includes(item.id)));
//     setSelectedItems([]);
//   };

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       onPress={() => toggleItemSelection(item.id)}
//       style={{
//         backgroundColor: selectedItems.includes({id}) ? 'lightblue' : 'white',
//         padding: 10,
//         margin: 5,
//       }}
//     >
//       <Text>{item.title}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={{ flex: 1 }}>
//       {selectedItems.length > 0 && (
//         <TouchableOpacity
//           onPress={deleteSelectedItems}
//           style={{
//             backgroundColor: 'red',
//             padding: 10,
//             alignItems: 'center',
//           }}
//         >
//           <Text style={{ color: 'white' }}>Delete Selected ({selectedItems.length})</Text>
//         </TouchableOpacity>
//       )}
//       <FlatList
//         data={data}
//         renderItem={renderItem}
//         keyExtractor={item => item.id.toString()}
//       />
//     </View>
//   );
// }

// export default HomeScreen;