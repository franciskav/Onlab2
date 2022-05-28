import React, {createContext, useState} from 'react'
import {Alert} from 'react-native'
import {Strings} from '../constants/localization'
import {LoginDto} from '../model/loginDto'
import {SignUpDto} from '../model/signUpDto'
import authApi from '../utility/api/authApi'
import asyncStorageService from '../utility/services/asyncStorageService'

export enum AuthState {
  'NONE',
  'LOGGED_IN',
  'LOGGED_OUT',
}

interface AuthContextProps {
  setUserData: (user: any) => void
  login: (loginDto: LoginDto, succes: () => void) => void
  signUp: (signUpDto: SignUpDto, succes: () => void) => void
  logOut: () => void
  checkAuthState: () => void
}

export const AuthContext = createContext<AuthContextProps>({
  setUserData: () => {},
  login: () => {},
  signUp: () => {},
  logOut: () => {},
  checkAuthState: () => {},
})

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<any | undefined>(undefined)

  const setUserData = (user: any) => {}

  const login = async (loginDto: LoginDto, succes: () => void) => {
    try {
      const response = await authApi.login(loginDto)
      asyncStorageService.saveAuthInfo(response)
      succes()
    } catch (error: any) {
      Alert.alert(error.response.data.message)
    }
  }

  const signUp = async (signUpDto: SignUpDto, succes: () => void) => {
    try {
      const response = await authApi.signUp(signUpDto)
      asyncStorageService.saveAuthInfo(response)
      succes()
    } catch (error: any) {
      Alert.alert(error.response.data.message)
    }
  }

  const logOut = async () => {
    try {
      asyncStorageService.clearAuthinfo()
    } catch (error) {
      console.warn('LOGOUT_ERROR', error)
    }
  }

  const checkAuthState = () => {}

  return (
    <AuthContext.Provider
      value={{
        setUserData,
        login,
        signUp,
        logOut,
        checkAuthState,
      }}>
      {children}
    </AuthContext.Provider>
  )
}
