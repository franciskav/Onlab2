import React from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import {Colors} from '../constants/colors'
import {spaces} from '../constants/spaces'
import {textStyle} from '../constants/styles'

interface CustomButtonProps {
  style?: StyleProp<ViewStyle>
  title: string
  onPress: () => void
}

export const CustomButton = (props: CustomButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, props.style]}
      onPress={props.onPress}>
      <Text style={textStyle.button}>{props.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.button.background,
    borderRadius: 10,
    paddingHorizontal: spaces.extraLarge,
    paddingVertical: spaces.normal,
    alignItems: 'center',
  },
  title: {},
})
