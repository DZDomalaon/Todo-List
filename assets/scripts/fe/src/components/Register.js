import React, { Component } from 'react';
import { View, Text } from 'react-native';
import LoginOrRegister from '../common/LoginOrRegister';

export default Register = () => {
  return (
    <View style={{ flex: 1 }}>
      <LoginOrRegister create/>
    </View>
  );
}