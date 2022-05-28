import React, {useContext, useEffect, useRef, useState} from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'
//import LinearGradient from 'react-native-linear-gradient'
import {Colors} from '../constants/colors'
import {Icons} from '../constants/icons'
import {Strings} from '../constants/localization'
import {margins} from '../constants/margins'
import {textStyle} from '../constants/styles'
import {AuthContext} from '../providers/authProvider'
import {useNavigation} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import {RootStackParamList} from '../navigation/rootStack'

const SplashScreen = () => {
  const {setUserData, logOut} = useContext(AuthContext)

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState()

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user)
    setUserData(user)
    if (initializing) setInitializing(false)
  }

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('LOGIN')
    }, 1000)
  }, [])

  if (initializing) return null

  if (!user) {
    setTimeout(() => {
      navigation.replace('LOGIN')
    }, 1000)
  } else {
    setTimeout(() => {
      navigation.replace('MAP')
    }, 1000)
  }

  return (
    // <LinearGradient
    //   style={styles.container}
    //   colors={[
    //     Colors.gradient.light,
    //     Colors.gradient.light,
    //     Colors.gradient.dark,
    //   ]}>
    <View style={styles.container}>
      <Image source={Icons.appIcon} />
      <Text style={[textStyle.bigTitle, textStyle.center, margins.mtNormal]}>
        {Strings.splash.appName}
      </Text>
    </View>
    // </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {},
})

export default SplashScreen
