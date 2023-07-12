import React, { Component, useState } from 'react';
import { Button, View, Text, TextInput, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';


export default LoginOrRegister = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  onEmailChange = (text) => {
    setEmail(text);
  }

  onPasswordChange = (text) => {
    setPassword(text);
  }

  onFirstNameChange = (text) => {
    setFirstName(text);
  }

  onLastNameChange = (text) => {
    setLastName(text);
  }

  handleRequest = () => {

    const endpoint = props.create ? 'register' : 'login';
    const payload = { email: email, password: password } 
    
    if (props.create) {
      payload.first_name = firstName;
      payload.last_name = lastName;
    }
    console.log(payload);
    
    axios
      .post(`/user/${endpoint}/`, payload)
      .then(response => {
        const { token, user } = response.data;

        // We set the returned token as the default authorization header
        axios.defaults.headers.common.Authorization = `Token ${token}`;
        
        // Navigate to the home screen
        
        props.create ? Actions.login() : Actions.main();
      })
      .catch(error => console.log(error));
  }

  renderRegisterForm = () => {
    const { fieldStyle, textInputStyle } = styles;
    if (props.create) {
      return (
          <View style={fieldStyle}>
            <TextInput
              placeholder="First name"
              autoCorrect={false}
              onChangeText={this.onFirstNameChange.bind(this)}
              style={textInputStyle}
            />
            <TextInput
              placeholder="Last name"
              autoCorrect={false}
              onChangeText={this.onLastNameChange.bind(this)}
              style={textInputStyle}
            />
          </View>
      );
    }
  }

  renderButton = () => {
    const buttonText = props.create ? 'Register' : 'Login';

    return (
      <Button title={buttonText} onPress={() => this.handleRequest()}/>
    );
  }


  renderRegisterLink = () => {
    if (!props.create) {
      return (
        <Text style={styles.accountCreateTextStyle}>
          Or 
          <Text style={{ color: 'blue' }} onPress={() => Actions.register()}>
            {' Sign-up'}
          </Text>
        </Text>
      );
    }
  }


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.formContainerStyle}>
        <View style={styles.fieldStyle}>
          <TextInput
            placeholder="Email"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={this.onEmailChange.bind(this)}
            style={styles.textInputStyle}
          />
        </View>
        <View style={styles.fieldStyle}>
          <TextInput
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Password"
            onChangeText={this.onPasswordChange.bind(this)}
            style={styles.textInputStyle}
          />
        </View>
        {this.renderRegisterForm()}
      </View>
      <View style={styles.buttonContainerStyle}>
        {this.renderButton()}
        <View style={styles.accountCreateContainerStyle}>
          {this.renderRegisterLink()}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputStyle: {
    flex: 1,
    padding: 15
  },
  fieldStyle: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    padding: 25
  },
  accountCreateTextStyle: {
    color: 'black'
  },
  accountCreateContainerStyle: {
    padding: 25,
    alignItems: 'center'
  }
});