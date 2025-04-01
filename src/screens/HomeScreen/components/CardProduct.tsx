import React, { useState } from 'react'
import { Image, Text, View } from 'react-native'
import { Product } from '../HomeScreen';
import { styles } from '../../../theme/appTheme';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { PRIMARY_COLOR } from '../../../theme/commons/constants';
import { ModalProduct } from './ModalProduct';

//interface para las propiedades del componente
interface Props {
    product: Product;
    updateStockProduct:(idProduct: number, quantity: number)=>void;
}

export const CardProduct = ({ product,updateStockProduct }: Props) => {
    //hook use state
    const [showModal, setshowModal] = useState<boolean>(false);
    return (
        <View>
        <View style={styles.containerCard}>
            <Image source={{
                uri: product.pathImage
            }}
                style={styles.imageProduct} />
            <View>
                <Text style={styles.titleProdcut}>{product.name}</Text>
                <Text>Precio: $ {product.price.toFixed(2)}</Text>
            </View>
            <View style={styles.containerIcon}>
                <Icon name='add-shopping-cart' size={30} color={PRIMARY_COLOR} onPress={()=>setshowModal(!showModal)}/>
            </View>
        </View>
        <ModalProduct isVisible={showModal} setShowModal={()=>setshowModal(!showModal)} product={product} updateStockProduct={updateStockProduct} />
        </View>
    )
}
