import 'react-native-gesture-handler'
import React from 'react'
import { LoginScreen } from './src/screens/LoginScreen'
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { StackNavigator } from './src/navigator/StackNavigator'

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  )
}

export default App;
