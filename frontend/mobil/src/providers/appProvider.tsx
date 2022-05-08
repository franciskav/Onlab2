import React from 'react'
import {BottomModalProvider} from '../components/bottomModel'

interface AppProviderProps {
  children: React.ReactElement
}

const providers: React.ReactElement[] = [<BottomModalProvider />]

export const AppProvider = ({children: initial}: AppProviderProps) =>
  providers.reduce(
    (children, parent) => React.cloneElement(parent, {children}),
    initial,
  )
