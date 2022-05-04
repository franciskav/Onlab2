import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'
import {LoginScreen} from '../screens/login'

export type RootStackParamList = {
  LOGIN: undefined
}

const RootStack = createNativeStackNavigator<RootStackParamList>()

export function RootStackScreen() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="LOGIN" component={LoginScreen} />
    </RootStack.Navigator>
  )
}
