import React, {useEffect} from 'react'
import {
  Image,
  ImageSourcePropType,
  LayoutAnimation,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import {Colors} from '../constants/colors'
import {margins} from '../constants/margins'
import {spaces} from '../constants/spaces'
import {textStyle} from '../constants/styles'

interface CustomTextInputProps {
  textInputProps?: TextInputProps
  label?: string
  labelStyle?: StyleProp<TextStyle>
  error?: string
  errorStyle?: StyleProp<TextStyle>
  style?: StyleProp<ViewStyle>
  onPress?: () => void
  icon?: ImageSourcePropType
  onIconPress?: () => void
  disabled?: boolean
}

export const CustomTextInput = React.forwardRef(
  (props: CustomTextInputProps, ref: any) => {
    useEffect(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    }, [props.error])

    const textInputPaddingRight = props.icon ? 40 : spaces.normal
    const opacity = props.disabled ? 0.5 : 1

    const editable = props.onPress
      ? !props.onPress
      : props.textInputProps?.editable

    const getBorderColor = () => {
      if (props.error) {
        return {borderColor: Colors.textInput.borderError}
      }
      return {borderColor: Colors.textInput.border}
    }

    return (
      <View
        style={[styles.container, props.style, {opacity: opacity}]}
        pointerEvents={props.disabled ? 'none' : 'auto'}>
        {!!props.label && (
          <Text style={[textStyle.label, margins.mbSmall, props.labelStyle]}>
            {props.label}
          </Text>
        )}
        <TouchableOpacity
          style={styles.touchableContainer}
          onPress={props.onPress}
          disabled={props.onPress === undefined}>
          <TextInput
            ref={ref}
            pointerEvents={props.onIconPress ? 'none' : 'auto'}
            {...props.textInputProps}
            style={[
              styles.textInput,
              textStyle.normal,
              getBorderColor(),
              {paddingRight: textInputPaddingRight},
              props.textInputProps?.style,
            ]}
            editable={editable}
          />
        </TouchableOpacity>
        {props.icon && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={props.onIconPress}
            disabled={!props.onIconPress}>
            <Image source={props.icon} style={styles.icon} />
          </TouchableOpacity>
        )}
        <Text style={textStyle.error}>{props.error ? props.error : ''}</Text>
      </View>
    )
  },
)

const styles = StyleSheet.create({
  container: {},
  touchableContainer: {
    justifyContent: 'center',
  },
  textInput: {
    borderColor: Colors.textInput.border,
    borderRadius: 15,
    borderWidth: 1,
    paddingHorizontal: spaces.normal,
    paddingVertical: spaces.normal,
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
})
