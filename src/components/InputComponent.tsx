import React from 'react'
import { Keyboard, KeyboardTypeOptions, TextInput } from 'react-native'
import { styles } from '../theme/appTheme'
interface Props {
    keyboardType: KeyboardTypeOptions;
    placeholder: string;
    handleChangeValue: (name: string, value: string) => void;
    name: string;
    isPassword?: boolean; //propiedad opcional

}

export const InputComponent = ({ keyboardType, placeholder, handleChangeValue, name, isPassword=false }: Props) => {

    return (
        <TextInput
            placeholder={placeholder}
            keyboardType={keyboardType}
            onChangeText={(value) => handleChangeValue(name, value)}
            secureTextEntry={isPassword}
            style={styles.input}
        />
    )
}
