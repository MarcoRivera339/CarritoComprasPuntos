import React from 'react'
import { FlatList, Modal, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import { Car, Product } from '../HomeScreen';
import { styles } from '../../../theme/appTheme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PRIMARY_COLOR } from '../../../theme/commons/constants';

//interface para recibir las propiedades del componente
interface Props {
    isVisible: boolean;
    car: Car[];
    setShowModal: () => void;
    setCar: (car: Car[]) => void; //funcion para actualizar el carrito
}


export const ModalCar = ({ isVisible, car, setShowModal, setCar }: Props) => {
    //hook useWindowDimensions para obtener el tamaño de la pantalla
    const { width } = useWindowDimensions();

    //funcion para calcular el total del carrito
    const totalPay = (): number => {
        //crear un acumulador
        let total: number = 0;
        //recorrer arreglo carrito
        car.forEach(product => {
            //total=total+product.total;
            total += product.total;
        })
        return total;
    }

    //funcion para realizar la compra
    const handleBuy=()=>{
        //cerrar el modal
        setShowModal();
        //reiniciar el carrito
        setCar([]);
    }

    return (
        <Modal visible={isVisible} animationType='fade' transparent={true}>
            <View style={styles.containerModal}>
                <View style={{
                    ...styles.contentModal,
                    width: width * 0.80
                }}>
                    <View style={styles.headerModal}>
                        <Text style={styles.titleModal}>Mis Productos</Text>
                        <View style={styles.containerIcon}>
                            <Icon name='cancel'
                                size={20}
                                color={PRIMARY_COLOR}
                                onPress={setShowModal}
                            />
                        </View>
                    </View>
                    <View style={styles.headerTeable}>
                        <Text style={styles.textHeaderTable}>Producto</Text>
                        <View style={styles.headerDescription}>
                            <Text style={{
                                ...styles.textHeaderTable,
                                marginHorizontal: 10
                            }}>Precio</Text>
                            <Text style={styles.textHeaderTable}>Cantidad</Text>
                            <Text style={{
                                ...styles.textHeaderTable,
                                marginHorizontal: 10
                            }}>Total</Text>
                        </View>
                    </View>
                    <FlatList
                        data={car}
                        renderItem={({ item }) =>
                            <View style={styles.headerTeable}>
                                <Text>{item.name}</Text>
                                <View style={styles.headerDescription}>
                                    <Text style={{ marginHorizontal: 10 }}>$ {item.price.toFixed(2)}</Text>
                                    <Text style={{ paddingHorizontal: 27 }}>{item.quantity}</Text>
                                    <Text style={{ marginHorizontal: 10 }}>$ {item.total.toFixed(2)}</Text>
                                </View>
                            </View>}
                        keyExtractor={item => item.id.toString()} />
                        <View style={styles.containerTotal}>
                            <Text style={styles.textTotal}>Total Pagar: $ {totalPay().toFixed(2)}</Text>
                        </View>
                        <TouchableOpacity style={styles.buttonAddCar}
                        onPress={handleBuy}>
                            <Text style={styles.buttonTextAddCar}>Comprar</Text>
                        </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
