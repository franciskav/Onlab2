import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Callout, Marker} from 'react-native-maps'
import {Colors} from '../constants/colors'
import {FontSizes} from '../constants/fonts'
import {Icons} from '../constants/icons'
import {margins} from '../constants/margins'
import {spaces} from '../constants/spaces'
import {Place} from '../model/place'

//API_KEY: AIzaSyAp9Gy_S-VNQbgM1_p0elPUqA0oZO3NJYM

interface MarkerProps {
  place: Place
  onPressMarker: () => void
}

export const CustomMarker = (props: MarkerProps) => {
  const onPressMarker = () => {
    props.onPressMarker()
  }

  return (
    <Marker
      coordinate={props.place.coordinates}
      image={Icons.location}
      onPress={onPressMarker}>
      <Callout>
        <View style={styles.container}>
          <Text style={styles.name}>{props.place.name}</Text>
          <Text style={[styles.address, styles.contain]}>
            {`${props.place.address.zip_code} ${props.place.address.city}, ${props.place.address.street_address}`}
          </Text>
          <Text style={[styles.types, margins.mtNormal]}>
            {props.place.garbage_type.join(', ')}
          </Text>
        </View>
      </Callout>
    </Marker>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: spaces.normal,
    maxWidth: 250,
  },
  contain: {
    flex: 1,
    flexWrap: 'wrap',
  },
  name: {
    fontSize: FontSizes.normal,
    fontWeight: 'bold',
    color: Colors.text.title,
  },
  address: {
    fontSize: FontSizes.extraSmall,
    fontWeight: 'normal',
    color: Colors.text.bodyLight,
  },
  types: {
    fontSize: FontSizes.small,
    fontWeight: 'bold',
    color: Colors.text.body,
  },
})
