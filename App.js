import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Modal, Pressable } from 'react-native';
import { useState } from 'react';

export default function App() {

  const [textItem, setTextItem] = useState("")
  const [itemList, setItemList] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [itemSelected, setItemSelected] = useState({})

  const handleChangeItem = (t) => {
    setTextItem(t)
  }

  const addItem = () => {
    const newItem = {id: Math.random().toString(), value: textItem}
    setItemList(currentItems => [...currentItems, newItem]);
    setTextItem('');
  }

  const selectItem = (id) => {
    const selection = itemList.find(item => item.id === id)
    setItemSelected(selection)
    setModalVisible(true)
    console.log(itemSelected)
  }

  const deleteItem = () => {
    const newItemList = itemList.filter(item => item.id !== itemSelected.id)
    setItemList(newItemList)
    setItemSelected({})
    setModalVisible(false)
  }

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => selectItem(item.id)}>
      <Text style={styles.item}>{item.value}</Text>
    </TouchableOpacity>
  )



  return (
    
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Mi Lista de Compras</Text>
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

      <Modal 
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Eliminar de la lista?</Text>
            <TouchableOpacity onPress={() => deleteItem()}>
              <Text>Eliminar</Text>
            </TouchableOpacity>
          </View>
          
        </View>
        
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    flex: 1,
    backgroundColor: '#778',
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainTitle: {
    fontSize: 30,
    color: 'white',
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
  },

  modalContainer: {
    backgroundColor: 'transparent',
    height: "100%",
    alignItems: 'center',
    paddingTop: '80%'
  },

  modalContent: {
    backgroundColor: 'red',
    padding: '2%',
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'center'
  },
})

