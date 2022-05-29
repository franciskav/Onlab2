/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native'
import React, {useEffect} from 'react'
import {StyleSheet, useColorScheme} from 'react-native'
import {enableLatestRenderer} from 'react-native-maps'

import {Colors} from 'react-native/Libraries/NewAppScreen'
import {RootStackScreen} from './src/navigation/rootStack'
import {AppProvider} from './src/providers/appProvider'
import Geocoder from 'react-native-geocoding'

const App = () => {
  enableLatestRenderer()
  const API_KEY = 'AIzaSyAp9Gy_S-VNQbgM1_p0elPUqA0oZO3NJYM'

  useEffect(() => {
    Geocoder.init(API_KEY, {language: 'hu'})
  })

  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  return (
    <AppProvider>
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </AppProvider>
  )
}

const styles = StyleSheet.create({})

export default App
