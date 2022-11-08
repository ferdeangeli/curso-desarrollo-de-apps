import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity, Modal } from 'react-native';
import { useState } from 'react';

export default function App() {

  const [textItem, setTextItem] = useState("")
  const [itemList, setItemList] = useState([])

  const handleChangeItem = (t) => {
    setTextItem(t)
  }

  const addItem = () => {
    const newItem = {id: Math.random().toString(), value: textItem}
    setItemList(currentItems => [...currentItems, newItem]);
    setTextItem('');
  }

  const renderItem = ({item}) => (
    <View>
      <Text style={styles.item}>{item.value}</Text>
    </View>
  )

  return (
    
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
        onChangeText={handleChangeItem} 
        placeholder='Ingrese el producto' 
        value={textItem}
        style={styles.input}
        />
        
        <TouchableOpacity style={styles.addButton} onPress={addItem}>
          <Text style={styles.addButtonText}>AGREGAR</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
        style={styles.flatList}
        data={itemList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    flex: 1,
    backgroundColor: '#778',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding:20
  },
  
  input: {
    borderBottomWidth:0.5,
    borderBottomColor: 'black',
    width:200,
    fontSize:18,
    fontWeight: '400',
    color: 'white'
  },

  addButton: {
    width: 80,
    borderWidth: 2,
    backgroundColor: "#294",
    borderRadius:10
  },

  addButtonText: {
    color: 'white',
    textAlign: 'center'
  },

  item: {
    padding:12,
    fontSize: 18,
    color: 'white',
    fontWeight: '600'
  },
  
  flatList: {
    fontSize: 20,
    padding:20
  }
})

