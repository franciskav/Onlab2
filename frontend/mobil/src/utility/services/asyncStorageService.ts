import {AuthData} from '../../model/authData'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AsyncStorageKeys = {
  ACCESS_TOKEN: 'ACCESS_TOKEN',
  REFRESH_TOKEN: 'REFRESH_TOKEN',
}

class AsyncStorageService {
  public saveAuthInfo = async (authData: AuthData) => {
    await AsyncStorage.multiSet([
      [AsyncStorageKeys.ACCESS_TOKEN, authData.accessToken],
      [AsyncStorageKeys.REFRESH_TOKEN, authData.refreshToken],
    ])
  }

  public clearAuthinfo = async () => {
    await AsyncStorage.multiRemove([
      AsyncStorageKeys.ACCESS_TOKEN,
      AsyncStorageKeys.REFRESH_TOKEN,
    ])
  }

  public getAccessToken = async () => {
    const accessToken = await AsyncStorage.getItem(
      AsyncStorageKeys.ACCESS_TOKEN,
    )
    if (!accessToken) {
      return undefined
    }
    return accessToken
  }

  public getRefreshToken = async () => {
    const refreshToken = await AsyncStorage.getItem(
      AsyncStorageKeys.REFRESH_TOKEN,
    )
    if (!refreshToken) {
      return undefined
    }
    return refreshToken
  }
}

const asyncStorageService = new AsyncStorageService()
export default asyncStorageService
