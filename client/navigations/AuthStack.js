import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen   from '../screens/LoginInScreen';
import SignUpScreen  from '../screens/SignUpScreen';
import HelloWorldScreen from "../screens/HelloWorldScreen"
const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login"  component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Home" component={HelloWorldScreen} />
    </Stack.Navigator>
  );
}

