import React, {createContext, useCallback, useContext, useState} from 'react'
import {
  Dimensions,
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native'
import Modal from 'react-native-modal'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {Colors} from '../constants/colors'
import {Icons} from '../constants/icons'
import {margins} from '../constants/margins'
import {Divider} from './divider'

interface ModalState {
  content: () => React.ReactNode
  customHeader?: (title?: string) => React.ReactNode
  headerText?: string
}

export type ShowModalProps = ModalState & {
  style?: StyleProp<ViewStyle>
}

interface ModalContextProps {
  showModal: (props: ShowModalProps) => void
  closeModal: () => void
}

const ModalProviderContext = createContext<ModalContextProps>({
  showModal: () => {},
  closeModal: () => {},
})

const initialState: ModalState = {
  content: () => <View />,
}

export const BottomModalProvider: React.FC = ({children}) => {
  const [style, setStyle] = useState<StyleProp<ViewStyle> | undefined>()
  const [content, setContent] = useState<ModalState>({content: () => <View />})
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const safeAreaInsets = useSafeAreaInsets()

  const showModal = useCallback((props: ShowModalProps) => {
    setContent(props)
    setStyle(props.style)
    setIsVisible(true)
  }, [])

  const closeModal = () => {
    setContent(initialState)
    setIsVisible(false)
  }

  const renderHeader = () => {
    if (content.customHeader) {
      return content.customHeader(content.headerText)
    } else if (content.headerText) {
      return (
        <View style={[margins.mtBig, margins.mrBig, margins.mlBig]}>
          <View style={styles.row}>
            <Text style={styles.flex1}>{content.headerText}</Text>
            <Pressable onPress={closeModal} hitSlop={10}>
              {/* TODO: fix icon */}
              <Image source={Icons.checkBox} />
            </Pressable>
          </View>
          <Divider style={[margins.mtMedium, margins.mbMedium]} />
        </View>
      )
    }
    return <View />
  }

  return (
    <ModalProviderContext.Provider value={{showModal, closeModal}}>
      {children}
      <Modal
        swipeDirection={['down']}
        style={styles.modal}
        onSwipeComplete={closeModal}
        onBackdropPress={closeModal}
        onDismiss={closeModal}
        isVisible={isVisible}>
        <View
          style={[
            styles.modalContainer,
            {paddingBottom: safeAreaInsets.bottom},
            style,
          ]}>
          {renderHeader()}
          {content.content()}
        </View>
      </Modal>
    </ModalProviderContext.Provider>
  )
}

export const useBottomModal = () => {
  return useContext(ModalProviderContext)
}

const styles = StyleSheet.create({
  modal: {justifyContent: 'flex-end', margin: 0},
  modalContainer: {
    elevation: 5,
    shadowColor: Colors.shadow,
    shadowRadius: 10,
    shadowOffset: {
      height: -3,
      width: -3,
    },
    maxHeight: Dimensions.get('screen').height * 0.8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Colors.background,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
})
