import React from 'react'
import { Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { styles } from '../theme/appTheme'

//interfas para las propiedades de los componentes
interface Props {
  title: String;
  handleLogin: () => void;
}

export const ButtonComponent = ({ title, handleLogin }: Props) => {
  return (
    <TouchableOpacity style={styles.containerButton}
      onPress={handleLogin}>
      <Text style={styles.textBotton}>{title}</Text>
    </TouchableOpacity>
  )
}
