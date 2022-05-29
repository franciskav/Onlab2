import {NavigationContainerRef} from '@react-navigation/native'
import React from 'react'

export const isReadyRef: React.MutableRefObject<boolean | null> =
  React.createRef()

export const navigationRef: React.RefObject<NavigationContainerRef<any>> =
  React.createRef()

export function resetNavigation() {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.reset({
      index: 0,
      routes: [{name: 'LOGIN'}],
    })
  }
}
