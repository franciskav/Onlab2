import Geolocation from 'react-native-geolocation-service'
import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext, useEffect, useRef, useState} from 'react'
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {Colors} from '../constants/colors'
import {RootStackParamList} from '../navigation/rootStack'
import MapView, {Region} from 'react-native-maps'
import {IconButton} from '../components/iconButton'
import {Icons} from '../constants/icons'
import {CustomMarker} from '../components/marker'
import {PlaceListCard} from '../components/placeListCard'
import {spaces} from '../constants/spaces'
import {Place} from '../model/place'
import {margins} from '../constants/margins'
import {AuthContext} from '../providers/authProvider'
import {Strings} from '../constants/localization'
import {textStyle} from '../constants/styles'
import {WasteContext} from '../providers/wasteProvider'

const MapScreen = () => {
  const {logOut} = useContext(AuthContext)
  const {places, loadPlaces, isLoading} = useContext(WasteContext)
  const [region, setRegion] = useState<Region>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  })

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  const flatListRef = useRef<FlatList<any>>()

  useEffect(() => {
    getCurrentLocation()
    loadPlaces()
    navigation.setOptions({
      headerLeft: () => (
        <View style={[{flexDirection: 'row'}, margins.mlSmall]}>
          <IconButton
            icon={Icons.info}
            onPress={() => {
              navigation.navigate('INFO')
            }}
          />
          <IconButton
            icon={Icons.addLocation}
            onPress={() => {
              navigation.navigate('ADD_LOCATION')
            }}
          />
          <IconButton
            icon={Icons.filter}
            onPress={() => {
              navigation.navigate('FILTER')
            }}
          />
        </View>
      ),
      headerRight: () => (
        <View style={[{flexDirection: 'row'}, margins.mrSmall]}>
          <IconButton
            icon={Icons.logOut}
            onPress={() => {
              logOut()
              navigation.replace('LOGIN')
            }}
          />
        </View>
      ),
    })
  }, [])

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      info => {
        setRegion({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        })
      },
      error => {
        console.log(error)
      },
      {
        enableHighAccuracy: false,
        timeout: 2000,
        maximumAge: 3600000,
      },
    )
  }

  const renderItem = (item: ListRenderItemInfo<Place>) => {
    return (
      <PlaceListCard
        place={item.item}
        onItemPress={() => {
          setRegion({
            latitude: item.item.coordinates.latitude,
            longitude: item.item.coordinates.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          })
        }}
        onEditPress={() => {
          navigation.navigate('EDIT_LOCATION', {place: item.item})
        }}
      />
    )
  }

  const renderEmptyComponenet = (item: ListRenderItemInfo<Place>) => {
    return (
      <View
        style={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: spaces.extraLarge,
        }}>
        <Text style={textStyle.title}>{Strings.map.empty}</Text>
      </View>
    )
  }

  const onPressMarker = (place: Place, index: number) => {
    flatListRef.current?.scrollToIndex({animated: true, index: index})
  }

  return (
    <View style={styles.container}>
      <MapView style={{flex: 0.5}} region={region}>
        {places.map((place, index) => (
          <CustomMarker
            key={index}
            place={place}
            onPressMarker={() => {
              onPressMarker(place, index)
            }}
          />
        ))}
      </MapView>
      <View style={{flex: 0.5}}>
        <View style={styles.separator} />
        <FlatList
          //@ts-ignore
          ref={flatListRef}
          contentContainerStyle={styles.contentContainer}
          keyExtractor={(item, index) => index.toString()}
          data={places}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          extraData={places}
          ListEmptyComponent={renderEmptyComponenet}
          refreshing={isLoading}
          onRefresh={loadPlaces}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  separator: {backgroundColor: Colors.card.border, height: 1},
  contentContainer: {padding: spaces.small, flexGrow: 1},
})

export default MapScreen
