import React from 'react'
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import {Colors} from '../constants/colors'

interface IconButtonProps {
  style?: StyleProp<ViewStyle>
  icon: ImageSourcePropType
  onPress: () => void
}

export const IconButton = (props: IconButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, props.style]}
      onPress={props.onPress}>
      <Image style={styles.icon} source={props.icon} />
    </TouchableOpacity>
  )
}

const radius = 20

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.iconButton.background,
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    tintColor: Colors.iconButton.tint,
  },
})
