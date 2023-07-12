import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function TodoItem(props) {
  return  (
    <View style={styles.container}>
      <View style={styles.indexContainer}>
          <Text style={styles.index}>{props.index}</Text>
      </View>
      <View style={styles.taskContainer}>
          <Text style={styles.task}>{props.task}</Text>
          <TouchableOpacity onPress={() => props.deleteTask()}>
              <Image source={require('../../media/images/delete.png')}/>
          </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flexDirection: 'row',
      marginHorizontal: 20,
  },
  indexContainer: {
      backgroundColor: '#3E3364',
      borderRadius: 12,
      marginRight: 10,
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
  },
  index: {
      color: '#fff',
      fontSize: 20,
  },
  taskContainer: {
      backgroundColor: '#3E3364',
      borderRadius: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 5,
      minHeight: 50,
  },
  task: {
      color: '#fff',
      width: '90%',
      fontSize: 16,
  },
  delete: {
      marginLeft: 10,
      height: 18,
      width: 'auto'
  },
});