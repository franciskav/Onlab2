import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import {Colors} from '../constants/colors'
import {WasteTypes} from '../constants/infoTypes'
import {margins} from '../constants/margins'
import {spaces} from '../constants/spaces'
import {textStyle} from '../constants/styles'
import {RootStackParamList} from '../navigation/rootStack'

const InfoScreen = () => {
  const renderContent = () => {
    return WasteTypes.map((mt, mt_idx) => {
      return (
        <View style={[margins.mbLarge]} key={mt_idx}>
          <Text
            style={[
              textStyle.bigTitle,
              {color: Colors.card.text},
              margins.mbSmall,
            ]}>
            {mt.mainType}
          </Text>
          <Text style={[textStyle.small, margins.mlNormal, margins.mbNormal]}>
            {mt.description}
          </Text>
          {mt.types.map((t, t_idx) => {
            return (
              <View style={[styles.card, margins.mbSmall]} key={t_idx}>
                <Text style={[textStyle.title, margins.mbSmall]}>{t.type}</Text>
                <Text style={textStyle.small}>{t.description}</Text>
              </View>
            )
          })}
        </View>
      )
    })
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      {renderContent()}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    flexGrow: 1,
    padding: spaces.normal,
  },
  card: {
    backgroundColor: Colors.card.background,
    borderColor: Colors.card.border,
    borderWidth: 1,
    borderRadius: 15,
    padding: spaces.normal,
  },
})

export default InfoScreen
