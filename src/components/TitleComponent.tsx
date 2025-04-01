import React from 'react'
import { Text, useWindowDimensions, View } from 'react-native'
import { styles } from '../theme/appTheme';

//Props: propiedades que se envia de un componente a otro
//interface para definir las propiedades que se van a recibir
interface Props {
    title: string;
}

export const TitleComponent = ({ title }: Props) => {
    //console.log(props.title);
    const {height}=useWindowDimensions();
    return (
        <View style={{height:height*0.12}}>
            <Text style={styles.title}>
                {title}
            </Text>
        </View>
    )
}