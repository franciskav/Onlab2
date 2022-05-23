import React, {createContext, useState} from 'react'
import {Alert} from 'react-native'
import {Strings} from '../constants/localization'

export enum AuthState {
  'NONE',
  'LOGGED_IN',
  'LOGGED_OUT',
}

interface AuthContextProps {
  setUserData: (user: any) => void
  login: (email: string, password: string, succes: () => void) => void
  signUp: (email: string, password: string, succes: () => void) => void
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

  const login = (email: string, password: string, succes: () => void) => {
    succes()
  }

  const signUp = (email: string, password: string, succes: () => void) => {}
  const logOut = () => {}

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
