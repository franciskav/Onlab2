import React, {createContext, useState} from 'react'
import {Place} from '../model/place'
import {Request} from '../model/request'
import {Alert} from 'react-native'
import {Strings} from '../constants/localization'

interface WasteContextProps {
  loadPlaces: () => void
  createRequest: (request: Request) => void
  filters: string[]
  updateFilters: (filters: string[]) => void
  places: Place[]
  isLoading: boolean
}

export const WasteContext = createContext<WasteContextProps>({
  loadPlaces: () => {},
  createRequest: () => {},
  filters: [],
  updateFilters: () => {},
  places: [],
  isLoading: false,
})

export const WasteProvider: React.FC = ({children}) => {
  const [places, setPlaces] = useState<Place[]>([])
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([])
  const [filters, setFilters] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const loadPlaces = () => {
    setIsLoading(true)

    setIsLoading(false)
  }

  const createRequest = (request: Request) => {}

  const updateFilters = (filters: string[]) => {
    setFilters(filters)
    filterPlaces(places, filters)
  }

  const filterPlaces = (places: Place[], filters: string[]) => {
    const temp: Place[] = []
    if (filters.length === 0) {
      setFilteredPlaces(places)
    } else {
      places.forEach(p => {
        p.garbage_type.forEach(t => {
          if (filters.includes(t)) {
            temp.push(p)
          }
        })
      })
      setFilteredPlaces(temp)
    }
  }

  return (
    <WasteContext.Provider
      value={{
        loadPlaces,
        createRequest,
        places: filteredPlaces,
        updateFilters,
        filters,
        isLoading,
      }}>
      {children}
    </WasteContext.Provider>
  )
}
