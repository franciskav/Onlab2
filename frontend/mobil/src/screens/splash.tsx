import React, {useContext, useEffect, useRef, useState} from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'
import {Colors} from '../constants/colors'
import {Icons} from '../constants/icons'
import {Strings} from '../constants/localization'
import {margins} from '../constants/margins'
import {textStyle} from '../constants/styles'
import {AuthContext, AuthState} from '../providers/authProvider'
import {useNavigation} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import {RootStackParamList} from '../navigation/rootStack'

const SplashScreen = () => {
  const {checkAuthState, authState} = useContext(AuthContext)

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  useEffect(() => {
    setTimeout(() => {
      checkAuthState()
    }, 1000)
  }, [])

  useEffect(() => {
    console.log(authState)
    if (authState === AuthState.LOGGED_IN) {
      navigation.replace('MAP')
    } else if (authState === AuthState.LOGGED_OUT) {
      navigation.replace('LOGIN')
    }
  }, [authState])

  return (
    <View style={styles.container}>
      <Image source={Icons.appIcon} />
      <Text style={[textStyle.bigTitle, textStyle.center, margins.mtNormal]}>
        {Strings.splash.appName}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {},
})

export default SplashScreen
