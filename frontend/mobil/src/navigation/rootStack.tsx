import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import React from 'react'
import {Colors} from '../constants/colors'
import {Strings} from '../constants/localization'
import AddLocatinScreen from '../screens/addLocation'
import EditLocatinScreen, {
  EditLocationScreenProps,
} from '../screens/editLocation'
import FilterScreen from '../screens/filter'
import InfoScreen from '../screens/info'
import {LoginScreen} from '../screens/login'
import MapScreen from '../screens/map'
import {SignUpScreen} from '../screens/signUp'

export type RootStackParamList = {
  SPLASH: undefined
  LOGIN: undefined
  SIGN_UP: undefined
  MAP: undefined
  INFO: undefined
  ADD_LOCATION: undefined
  EDIT_LOCATION: EditLocationScreenProps
  FILTER: undefined
}

const RootStack = createStackNavigator<RootStackParamList>()

export function RootStackScreen() {
  return (
    <RootStack.Navigator screenOptions={defaultOptions}>
      {/* <RootStack.Screen
        name={'SPLASH'}
        component={SplashScreen}
        options={{headerShown: false}}
      /> */}
      <RootStack.Screen
        name={'LOGIN'}
        component={LoginScreen}
        options={{title: Strings.login.title}}
      />
      <RootStack.Screen
        name={'SIGN_UP'}
        component={SignUpScreen}
        options={{title: Strings.signUp.title}}
      />
      <RootStack.Screen
        name={'MAP'}
        component={MapScreen}
        options={{title: Strings.map.title}}
      />
      <RootStack.Screen
        name={'INFO'}
        component={InfoScreen}
        options={{title: Strings.info.title}}
      />
      <RootStack.Screen
        name={'ADD_LOCATION'}
        component={AddLocatinScreen}
        options={{title: Strings.addLocation.title}}
      />
      <RootStack.Screen
        name={'EDIT_LOCATION'}
        component={EditLocatinScreen}
        options={{title: Strings.editLocation.title}}
      />
      <RootStack.Screen
        name={'FILTER'}
        component={FilterScreen}
        options={{title: Strings.filter.title}}
      />
    </RootStack.Navigator>
  )
}

const defaultOptions: StackNavigationOptions = {
  headerStyle: {backgroundColor: Colors.header.background},
  headerTintColor: Colors.header.tint,
  headerBackTitleVisible: false,
}
