import {useNavigation} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext, useEffect, useRef, useState} from 'react'
import {
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {CustomButton} from '../components/button'
import {CustomTextInput} from '../components/textInput'
import {Colors} from '../constants/colors'
import {Icons} from '../constants/icons'
import {Strings} from '../constants/localization'
import {margins} from '../constants/margins'
import {spaces} from '../constants/spaces'
import {textStyle} from '../constants/styles'
import {RootStackParamList} from '../navigation/rootStack'
import {AuthContext} from '../providers/authProvider'
import {isValidEmail} from '../utility/helpers/validation'

export interface LoginScreenProps {}

interface LoginError {
  email?: string
  password?: string
}

export const LoginScreen = () => {
  const {login} = useContext(AuthContext)

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errors, setErrors] = useState<LoginError>({})

  let passwordRef = useRef<TextInput>()

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestFineLocationPermission()
    }
  }, [])

  const requestFineLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location')
      } else {
        console.log('Fine location permission denied')
      }
    } catch (err) {
      console.warn(err)
    }
  }

  const validate = () => {
    let errors: LoginError = {}

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

    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      enableOnAndroid={true}>
      <View style={[styles.row, margins.mtExtraLarge, margins.mbExtraLarge]}>
        <Image source={Icons.appIcon} />
        <Text style={[textStyle.bigTitle, styles.title, margins.mlNormal]}>
          {Strings.login.recycleBin}
        </Text>
      </View>
      <View>
        <CustomTextInput
          style={margins.mbMedium}
          label={Strings.login.email}
          textInputProps={{
            value: email,
            onChangeText: value => {
              setEmail(value)
            },
            keyboardType: 'email-address',
            autoCapitalize: 'none',
            returnKeyType: 'next',
            onSubmitEditing: () => passwordRef?.current?.focus?.(),
          }}
          error={errors.email}
        />
        <CustomTextInput
          ref={passwordRef}
          label={Strings.login.password}
          textInputProps={{
            value: password,
            onChangeText: value => {
              setPassword(value)
            },
            secureTextEntry: true,
          }}
          error={errors.password}
        />
      </View>
      <CustomButton
        title={Strings.login.login}
        onPress={() => {
          if (validate()) {
            login(email, password, () => navigation.replace('MAP'))
          }
        }}
        style={margins.mtExtraLarge}
      />
      <View style={styles.flex1} />
      <View style={margins.mbMedium}>
        <Text style={[textStyle.label, textStyle.center]}>
          {Strings.login.dontHaveAccount}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SIGN_UP')
            setErrors({})
          }}>
          <Text style={[textStyle.medium, textStyle.bold, textStyle.center]}>
            {Strings.login.signUp}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
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
