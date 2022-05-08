import React from 'react'
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native'
import {Colors} from '../constants/colors'
import {spaces} from '../constants/spaces'

interface DividerProps {
  style?: StyleProp<ViewStyle>
}

export const Divider = (props: DividerProps) => {
  return <View style={[styles.divider, props.style]} />
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.textInput.border,
    marginBottom: spaces.medium,
    marginTop: spaces.medium,
  },
})
