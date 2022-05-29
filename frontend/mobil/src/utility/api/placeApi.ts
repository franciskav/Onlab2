import {Place} from '../../model/place'
import Network from '../networking'

class PlaceApi {
  public getPlaces = async (filter: string): Promise<Place[]> => {
    const response = await Network.get(`/places/getPlaces${filter}`)
    return response.data
  }

  public createPlace = async (place: Place): Promise<void> => {
    const response = await Network.post(`/places/createPlace`, place)
    return response.data
  }

  public updatePlace = async (place: Place): Promise<void> => {
    const response = await Network.post(`/places/updatePlace`, place)
    return response.data
  }

  public deletePlace = async (id: string): Promise<void> => {
    const response = await Network.delete(`/places/deletePlace/${id}`)
    return response.data
  }
}

const placeApi = new PlaceApi()
export default placeApi
