import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext, useRef, useState} from 'react'
import {StyleSheet, TextInput} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {CustomButton} from '../components/button'
import {CustomTextInput} from '../components/textInput'
import {Colors} from '../constants/colors'
import {Strings} from '../constants/localization'
import {margins} from '../constants/margins'
import {spaces} from '../constants/spaces'
import {RootStackParamList} from '../navigation/rootStack'
import {AuthContext} from '../providers/authProvider'
import {isValidEmail} from '../utility/helpers/validation'

export interface SignUpScreenProps {}

interface SignUpError {
  email?: string
  password?: string
  passwordAgain?: string
}

export const SignUpScreen = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordAgain, setPasswordAgain] = useState<string>('')
  const [errors, setErrors] = useState<SignUpError>({})
  const {signUp} = useContext(AuthContext)

  let nameRef = useRef<TextInput>()
  let passwordRef = useRef<TextInput>()
  let passwordAgainRef = useRef<TextInput>()

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  const validate = () => {
    let errors: SignUpError = {}

    if (!email) {
      errors.email = Strings.errors.empty
    } else {
      if (!isValidEmail(email)) {
        errors.email = Strings.errors.invalidEmail
      }
    }

    if (!password) {
      errors.password = Strings.errors.empty
    }

    if (!passwordAgain) {
      errors.passwordAgain = Strings.errors.empty
    } else if (password !== passwordAgain) {
      errors.passwordAgain = Strings.errors.differentPasswords
    }

    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps={'handled'}
      enableOnAndroid={true}
      scrollEnabled={true}
      enableAutomaticScroll={true}>
      <CustomTextInput
        style={[margins.mbMedium, margins.mtExtraLarge]}
        label={Strings.signUp.email}
        textInputProps={{
          value: email,
          onChangeText: value => {
            setEmail(value)
          },
          keyboardType: 'email-address',
          autoCapitalize: 'none',
          returnKeyType: 'next',
          onSubmitEditing: () => nameRef?.current?.focus?.(),
        }}
        error={errors.email}
      />
      <CustomTextInput
        ref={passwordRef}
        style={margins.mbMedium}
        label={Strings.signUp.password}
        textInputProps={{
          value: password,
          onChangeText: value => {
            setPassword(value)
          },
          secureTextEntry: true,
          returnKeyType: 'next',
          onSubmitEditing: () => passwordAgainRef?.current?.focus?.(),
        }}
        error={errors.password}
      />
      <CustomTextInput
        ref={passwordAgainRef}
        style={margins.mbExtraLarge}
        label={Strings.signUp.passwordAgain}
        textInputProps={{
          value: passwordAgain,
          onChangeText: value => {
            setPasswordAgain(value)
          },
          secureTextEntry: true,
        }}
        error={errors.passwordAgain}
      />
      <CustomButton
        title={Strings.signUp.signUp}
        onPress={() => {
          if (validate()) {
            //signUp(email, password, () => navigation.replace('MAP'))
          }
        }}
      />
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spaces.medium,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
  },
  title: {
    flexWrap: 'wrap',
  },
})
