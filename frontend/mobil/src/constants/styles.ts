import {StyleSheet} from 'react-native'
import {Colors} from './colors'
import {FontSizes} from './fonts'

export const textStyle = StyleSheet.create({
  title: {
    fontSize: FontSizes.large,
    fontWeight: 'bold',
    color: Colors.card.text,
  },
  bigTitle: {
    fontSize: FontSizes.extraLarge,
    fontWeight: 'bold',
    color: Colors.text.title,
  },
  label: {
    fontSize: FontSizes.small,
    fontWeight: 'normal',
    color: Colors.text.body,
  },
  error: {
    fontSize: FontSizes.small,
    fontWeight: 'normal',
    color: Colors.text.error,
  },
  small: {
    fontSize: FontSizes.small,
    fontWeight: 'normal',
    color: Colors.text.body,
  },
  normal: {
    fontSize: FontSizes.normal,
    fontWeight: 'normal',
    color: Colors.text.body,
  },
  medium: {
    fontSize: FontSizes.medium,
    fontWeight: 'normal',
    color: Colors.text.body,
  },
  button: {
    fontSize: FontSizes.normal,
    fontWeight: 'bold',
    color: Colors.button.text,
  },
  bold: {
    fontWeight: 'bold',
  },
  center: {
    textAlign: 'center',
  },
})
