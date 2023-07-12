import React from 'react';
import { Scene, Stack, Router, Actions } from 'react-native-router-flux';
import { StyleSheet, StatusBar } from 'react-native';
import Login from './Login';
import Register from './Register';
import Home from './Home';

export default RouterComponent = () => {
  return (
    <Router>
      <Stack hideNavBar key="root">
        <Stack
          key="auth"
          type="reset"
          navigationBarStyle={style.navBarStyle}
          titleStyle={style.titleStyle}
        >
          <Scene
            title="Sign In"
            key="login"
            component={Login}
            initial
          />
          <Scene
            title="Register"
            key="register"
            component={Register}
          />  
        </Stack>
        <Stack
          key="main"
          type="reset"
          navigationBarStyle={style.navBarStyle}
          titleStyle={style.titleStyle}
        >
          <Scene
            title="Home"
            key="home"
            component={Home}
            initial
          />
        </Stack>
      </Stack>
    </Router>
  );
};


const style = StyleSheet.create({
  navBarStyle: {
    top: StatusBar.currentHeight
  },
  titleStyle: {
    flexDirection: 'row',
    width: 200
  }
});