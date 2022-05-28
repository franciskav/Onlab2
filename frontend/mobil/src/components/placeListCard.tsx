import React from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Colors} from '../constants/colors'
import {FontSizes} from '../constants/fonts'
import {Icons} from '../constants/icons'
import {margins} from '../constants/margins'
import {spaces} from '../constants/spaces'
import {textStyle} from '../constants/styles'
import {Place} from '../model/place'
import {IconButton} from './iconButton'

interface PlaceListCardProps {
  place: Place
  onItemPress: () => void
  onEditPress: () => void
}

export const PlaceListCard = (props: PlaceListCardProps) => {
  return (
    <TouchableOpacity
      style={[styles.card, margins.mbNormal]}
      onPress={props.onItemPress}>
      <Text style={textStyle.title}>{props.place.name}</Text>
      <Text
        style={
          styles.address
        }>{`${props.place.address.zipCode} ${props.place.address.city}, ${props.place.address.streetAddress}`}</Text>
      <Text style={[styles.types, margins.mtNormal]}>
        {props.place.garbageType.join(', ')}
      </Text>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => {
          props.onEditPress()
        }}>
        <Image style={styles.icon} source={Icons.editLocation} />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card.background,
    borderColor: Colors.card.border,
    borderWidth: 1,
    borderRadius: 15,
    padding: spaces.normal,
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
  touchable: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: spaces.normal,
  },
  icon: {
    tintColor: Colors.button.background,
  },
})
