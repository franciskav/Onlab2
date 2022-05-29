import jwtDecode from 'jwt-decode'
import React, {createContext, useState} from 'react'
import {Alert} from 'react-native'
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
  authState: AuthState
}

export const AuthContext = createContext<AuthContextProps>({
  setUserData: () => {},
  login: () => {},
  signUp: () => {},
  logOut: () => {},
  checkAuthState: () => {},
  authState: AuthState.NONE,
})

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<any | undefined>(undefined)
  const [authState, setAuthState] = useState<AuthState>(AuthState.NONE)

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

  const checkAuthState = async () => {
    try {
      const accessToken = await asyncStorageService.getAccessToken()
      if (accessToken) {
        setAuthState(AuthState.LOGGED_IN)
      } else {
        setAuthState(AuthState.LOGGED_OUT)
      }
    } catch (error: any) {
      setAuthState(AuthState.LOGGED_OUT)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        setUserData,
        login,
        signUp,
        logOut,
        checkAuthState,
        authState,
      }}>
      {children}
    </AuthContext.Provider>
  )
}
