import React from 'react'

interface AppProviderProps {
  children: React.ReactElement
}

const providers: React.ReactElement[] = []

export const AppProvider = ({children: initial}: AppProviderProps) =>
  providers.reduce(
    (children, parent) => React.cloneElement(parent, {children}),
    initial,
  )
