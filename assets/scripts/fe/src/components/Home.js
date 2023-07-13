import React, { useState, useEffect } from 'react';
import { Keyboard, View, Button, StyleSheet, ScrollView, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';

import axios from 'axios';

export default Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks()
  }, []);


  const getTasks = () => {
    axios
    .get(`/todo/item/`)
    .then(response => {
      setTasks(response.data);
    })
    .catch(error => console.log(error));
  }

  const addTask = (task) => {
    if (task == null) return;
    const payload = { title: task };
    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = 'X-CSRFToken'

    axios
      .post(`/todo/item/`, payload)
      .then(response => {
        setTasks([...tasks, response.data]);
      })
      .catch(error => console.log(error));
    Keyboard.dismiss();
  }

  const updateTask = (selected) => {
    axios
      .post(`/todo/item/${selected.id}/`, {is_completed: true})
      .then(response => {
      })
      .catch(error => console.log(error));
    Keyboard.dismiss();
  }

  const deleteTask = (selected) => {
    axios
      .get(`/todo/item/${selected.id}/`)
      .then(response => {
        setTasks(tasks.filter((task, index) => task.id != selected.id));
      })
      .catch(error => console.log(error));
    Keyboard.dismiss();
  }

  const handleRequest = () => {
    axios
      .post('/user/logout/')
      .then(response => {
        Actions.auth()
      })
      .catch(error =>  console.log(error));
  }

  return (
    <View style={styles.buttonContainerStyle}>
      <Button title="Logout" onPress={() => handleRequest()}/>
      <Text style={styles.heading}>TODO LIST</Text>
      <ScrollView style={styles.scrollView}>
        {tasks.map((task, index) => {
          return (
            <View key={index} style={styles.taskContainer}>
              <TodoItem
                index={index + 1}
                task={task.title}
                deleteTask={() => deleteTask(task)}
                updateTask={() => updateTask(task)}
              />
            </View>
          );
        })}
      </ScrollView>
      <TodoInput addTask={addTask}/>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1A3C',
  },
  heading: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 20,
  },
  scrollView: {
    marginBottom: 70,
  },
  taskContainer: {
    marginTop: 20,
  },
  buttonContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white'
  }
});