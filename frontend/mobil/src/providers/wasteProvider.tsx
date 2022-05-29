import React, {createContext, useState} from 'react'
import {Place} from '../model/place'
import {Request} from '../model/request'
import {Alert} from 'react-native'
import {Strings} from '../constants/localization'
import placeApi from '../utility/api/placeApi'

interface WasteContextProps {
  loadPlaces: () => void
  createPlace: (place: Place) => void
  updatePlace: (place: Place) => void
  deletePlace: (placeId: string) => void
  filters: string[]
  updateFilters: (filters: string[]) => void
  places: Place[]
  isLoading: boolean
}

export const WasteContext = createContext<WasteContextProps>({
  loadPlaces: () => {},
  createPlace: () => {},
  updatePlace: () => {},
  deletePlace: () => {},
  filters: [],
  updateFilters: () => {},
  places: [],
  isLoading: false,
})

export const WasteProvider: React.FC = ({children}) => {
  const [places, setPlaces] = useState<Place[]>([])
  const [filters, setFilters] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const loadPlaces = async () => {
    setIsLoading(true)
    try {
      var filterString = ''
      if (filters.length !== 0) {
        filterString = `?types=${filters.join('&types=')}`
      }
      console.log(filterString)
      const response = await placeApi.getPlaces(filterString)
      setPlaces(response)
    } catch (error) {}
    setIsLoading(false)
  }

  const createPlace = async (place: Place) => {
    try {
      await placeApi.createPlace(place)
      Alert.alert('Gyűjtőhely sikeresen hozzáadva')
    } catch (error: any) {
      Alert.alert(error.response.data.message)
    }
  }

  const updatePlace = async (place: Place) => {
    try {
      await placeApi.updatePlace(place)
      Alert.alert('Gyűjtőhely sikeresen módisítva')
    } catch (error: any) {
      Alert.alert(error.response.data.message)
    }
  }

  const deletePlace = async (placeId: string) => {
    try {
      await placeApi.deletePlace(placeId)
      Alert.alert('Gyűjtőhely sikeresen törölve')
    } catch (error: any) {
      Alert.alert(error.response.data.message)
    }
  }

  const updateFilters = (filters: string[]) => {
    setFilters(filters)
    loadPlaces()
  }

  return (
    <WasteContext.Provider
      value={{
        loadPlaces,
        createPlace,
        updatePlace,
        deletePlace,
        updateFilters,
        places,
        filters,
        isLoading,
      }}>
      {children}
    </WasteContext.Provider>
  )
}
