import {Coordinates} from './coordinates'

export interface Address {
  zip_code: string
  city: string
  street_address: string
}

export interface Place {
  _id: string
  name: string
  address: Address
  coordinates: Coordinates
  garbage_type: string[]
}
