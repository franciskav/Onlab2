import axios from 'axios'
import {resetNavigation} from '../navigation/navigation'
import asyncStorageService from './services/asyncStorageService'

const Network = axios.create({
  baseURL: 'http://192.168.0.136:3000',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

Network.interceptors.request.use(
  async reqConfig => {
    console.log('REQUEST#################################################')
    console.log(
      reqConfig.method,
      reqConfig.url,
      reqConfig.params,
      reqConfig.baseURL,
    )
    console.log(reqConfig.data)
    console.log('#################################################')
    const accessToken = await asyncStorageService.getAccessToken()
    if (accessToken) {
      reqConfig.headers = {
        ...reqConfig.headers,
        Authorization: 'Bearer ' + accessToken,
      }
    }
    return reqConfig
  },
  error => {
    Promise.reject(error)
  },
)

Network.interceptors.response.use(
  response => {
    console.log('RESPONSE#################################################')
    console.log(response.config.method, response.config.url)
    console.log(response.data)
    console.log('#################################################')
    return Promise.resolve(response)
  },
  async error => {
    if (error && error.response) {
      console.log(
        'RESPONSE ERROR#################################################',
      )
      console.log(
        error.response.status,
        error.response.method,
        error.response.url,
      )
      console.log(error.response.data)
      console.log('#################################################')

      const originalRequest = error.config
      if (
        error.response.status === 401 &&
        originalRequest.url.includes('account/refresh') //TODO: url-t javítani a megfelelőre
      ) {
        await asyncStorageService.clearAuthinfo()
        resetNavigation()
      } else if (error.response.status === 401) {
        let refreshToken = await asyncStorageService.getRefreshToken()
        let accessToken = await asyncStorageService.getAccessToken()
        if (accessToken) {
          const response = await Network.post('account/refresh', {
            token: refreshToken,
          }) //TODO: url-t csekkolni, kérést csekkolni
          const authData = response.data
          await asyncStorageService.saveAuthInfo(authData)
          const newResponse = await Network.request(originalRequest)
          return Promise.resolve(newResponse)
        }
      }
    }

    return Promise.reject(error)
  },
)

export default Network
