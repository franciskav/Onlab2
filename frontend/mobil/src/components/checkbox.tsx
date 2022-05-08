import React, {useState} from 'react'
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import {Colors} from '../constants/colors'
import {Icons} from '../constants/icons'
import {margins} from '../constants/margins'
import {textStyle} from '../constants/styles'

interface CustomCheckBoxProps {
  isChecked: boolean
  onValueChange: (value: boolean) => void
  text: string
  style?: StyleProp<ViewStyle>
}

export const CustomCheckBox = (props: CustomCheckBoxProps) => {
  const [isChecked, setIsChecked] = useState(props.isChecked)

  const onValueChange = () => {
    const value = !props.isChecked
    setIsChecked(value)
    props.onValueChange(value)
  }

  return (
    <TouchableOpacity
      style={[styles.container, props.style]}
      onPress={onValueChange}>
      <Image
        source={props.isChecked ? Icons.checkBoxChecked : Icons.checkBox}
        style={styles.image}
      />
      <Text style={[textStyle.small, margins.mlSmall]}>{props.text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    tintColor: Colors.button.background,
  },
})
