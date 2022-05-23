import {useNavigation} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext, useRef, useState} from 'react'
import {StyleSheet, Text, TextInput, View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {CustomButton} from '../components/button'
import {CustomCheckBox} from '../components/checkbox'
import {CustomTextInput} from '../components/textInput'
import {Colors} from '../constants/colors'
import {initTypes} from '../constants/initWasteTypes'
import {Strings} from '../constants/localization'
import {margins} from '../constants/margins'
import {spaces} from '../constants/spaces'
import {RootStackParamList} from '../navigation/rootStack'
import Geocoder from 'react-native-geocoding'
import {textStyle} from '../constants/styles'
import {Address} from '../model/place'
import {WasteContext} from '../providers/wasteProvider'

interface Error {
  name?: string
  address?: string
  wasteTypes?: string
}

const AddLocatinScreen = () => {
  const {createRequest} = useContext(WasteContext)

  const [name, setName] = useState<string>('')
  const [address, setAddress] = useState<Address>({
    zip_code: '',
    city: '',
    street_address: '',
  })
  const [wasteTypes, setWasteTypes] = useState<string[]>([])
  const [errors, setErrors] = useState<Error>({})

  let zipCodeRef = useRef<TextInput>()
  let cityRef = useRef<TextInput>()
  let streetRef = useRef<TextInput>()

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  const validate = () => {
    let errors: Error = {}

    if (!name) {
      errors.name = Strings.errors.empty
    }

    if (!(address.zip_code && address.city && address.street_address)) {
      errors.address = Strings.errors.empty
    }

    if (wasteTypes.length == 0) {
      errors.wasteTypes = Strings.errors.empty
    }

    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      enableOnAndroid={true}>
      <View style={styles.flex1}>
        <CustomTextInput
          style={margins.mbMedium}
          label={Strings.addLocation.name}
          textInputProps={{
            value: name,
            onChangeText: value => {
              setName(value)
            },
            returnKeyType: 'next',
            onSubmitEditing: () => zipCodeRef?.current?.focus?.(),
          }}
          error={errors.name}
        />
        <View>
          <Text style={[textStyle.label, margins.mbSmall]}>
            {Strings.addLocation.address}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <CustomTextInput
              ref={zipCodeRef}
              label={Strings.addLocation.zipCode}
              textInputProps={{
                value: address.zip_code,
                onChangeText: value => {
                  setAddress({...address, zip_code: value})
                },
                returnKeyType: 'next',
                onSubmitEditing: () => cityRef?.current?.focus?.(),
              }}
              error={errors.address ? ' ' : undefined}
            />
            <CustomTextInput
              ref={cityRef}
              style={[margins.mlNormal, {flex: 1}]}
              label={Strings.addLocation.city}
              textInputProps={{
                value: address.city,
                onChangeText: value => {
                  setAddress({...address, city: value})
                },
                returnKeyType: 'next',
                onSubmitEditing: () => streetRef?.current?.focus?.(),
              }}
              error={errors.address ? ' ' : undefined}
            />
          </View>
          <CustomTextInput
            ref={streetRef}
            label={Strings.addLocation.streetAddress}
            textInputProps={{
              value: address.street_address,
              onChangeText: value => {
                setAddress({...address, street_address: value})
              },
            }}
            error={errors.address}
          />
        </View>
        {initTypes.map((mt, idx) => {
          return (
            <View key={idx}>
              <Text style={[textStyle.small, margins.mtNormal]}>
                {mt.mainType}
              </Text>
              {mt.types.map((t, i) => {
                return (
                  <CustomCheckBox
                    key={i}
                    onValueChange={value => {
                      if (value) {
                        const types = wasteTypes
                        types.push(t.type)
                        setWasteTypes([...types])
                      } else {
                        const types = wasteTypes
                        const index = types.findIndex(f => f === t.type)
                        if (index > -1) {
                          types.splice(index, 1)
                        }
                        setWasteTypes([...types])
                      }
                    }}
                    isChecked={wasteTypes.includes(t.type)}
                    text={t.type}
                    style={margins.mlBig}
                  />
                )
              })}
            </View>
          )
        })}
        <CustomButton
          title={Strings.addLocation.add}
          onPress={() => {
            if (validate()) {
              Geocoder.from(
                `${address.zip_code} ${address.city}, ${address.street_address}`,
              )
                .then(json => {
                  var location = json.results[0].geometry.location
                  createRequest({
                    type: 'új',
                    comment: '',
                    place: {
                      _id: '',
                      name: name,
                      address: address,
                      coordinates: {
                        latitude: location.lat,
                        longitude: location.lng,
                      },
                      garbage_type: wasteTypes,
                    },
                    _id: '',
                  })
                })
                .catch(error => console.warn(error))
              navigation.goBack()
            }
          }}
          style={margins.mtExtraLarge}
        />
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
    flexGrow: 1,
    paddingBottom: spaces.extraLarge,
  },
})

export default AddLocatinScreen
