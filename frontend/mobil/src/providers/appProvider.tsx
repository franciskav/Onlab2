import React from 'react'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {BottomModalProvider} from '../components/bottomModel'
import {AuthProvider} from './authProvider'
import {WasteProvider} from './wasteProvider'

interface AppProviderProps {
  children: React.ReactElement
}

const providers: React.ReactElement[] = [
  <BottomModalProvider />,
  <SafeAreaProvider />,
  <AuthProvider />,
  <WasteProvider />,
]

export const AppProvider = ({children: initial}: AppProviderProps) =>
  providers.reduce(
    (children, parent) => React.cloneElement(parent, {children}),
    initial,
  )
