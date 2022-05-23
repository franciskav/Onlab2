import {useNavigation} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext, useEffect, useState} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {CustomButton} from '../components/button'
import {CustomCheckBox} from '../components/checkbox'
import {Colors} from '../constants/colors'
import {initTypes} from '../constants/initWasteTypes'
import {Strings} from '../constants/localization'
import {margins} from '../constants/margins'
import {spaces} from '../constants/spaces'
import {textStyle} from '../constants/styles'
import {RootStackParamList} from '../navigation/rootStack'
import {WasteContext} from '../providers/wasteProvider'

interface Error {}

const FilterScreen = () => {
  const {filters, updateFilters} = useContext(WasteContext)

  const [wasteTypes, setWasteTypes] = useState<string[]>([])

  useEffect(() => {}, [])

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  return (
    <View style={styles.container}>
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
                      const types = filters
                      types.push(t.type)
                      updateFilters([...types])
                    } else {
                      const types = filters
                      const index = types.findIndex(f => f === t.type)
                      if (index > -1) {
                        types.splice(index, 1)
                      }
                      updateFilters([...types])
                    }
                  }}
                  isChecked={filters.includes(t.type)}
                  text={t.type}
                  style={margins.mlBig}
                />
              )
            })}
          </View>
        )
      })}
      <CustomButton
        onPress={() => {
          updateFilters(filters)
          navigation.goBack()
        }}
        title={Strings.filter.done}
        style={margins.mtExtraLarge}
      />
    </View>
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

export default FilterScreen
