import {Coordinates} from './coordinates'

export interface Address {
  zipCode: string
  city: string
  streetAddress: string
}

export interface Place {
  id: string
  name: string
  address: Address
  coordinates: Coordinates
  garbageType: string[]
}
