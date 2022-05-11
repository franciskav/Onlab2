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
import React from 'react'
import {StyleSheet, useColorScheme} from 'react-native'
import {enableLatestRenderer} from 'react-native-maps'

import {Colors} from 'react-native/Libraries/NewAppScreen'
import {RootStackScreen} from './src/navigation/rootStack'
import {AppProvider} from './src/providers/appProvider'

const App = () => {
  enableLatestRenderer()

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
