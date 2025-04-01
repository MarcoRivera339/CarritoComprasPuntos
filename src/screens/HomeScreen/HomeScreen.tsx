import React, { useState } from 'react'
import { FlatList, FlatListComponent, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../theme/commons/constants'
import { TitleComponent } from '../../components/TitleComponent'
import { BodyComponent } from '../../components/BodyComponent'
import { CardProduct } from './components/CardProduct'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { styles } from '../../theme/appTheme';
import { ModalCar } from './components/ModalCar'

//interface para los objetos productos
export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    pathImage: string;

}
//interface para los objetos carrito
export interface Car {
    id: number;
    name: String;
    price: number;
    quantity: number;
    total: number;
}

export const HomeScreen = () => {
    //arreglo de productos
    const products: Product[] = [
        { id: 1, name: 'F. azucar', price: 2.30, stock: 10, pathImage: 'https://tienda.propieta.ec/wp-content/uploads/2021/03/azucar-blanca.jpg' },
        { id: 2, name: 'F. arroz', price: 1.50, stock: 5, pathImage: 'https://www.supermaxi.com/wp-content/uploads/2024/08/items2Figm2F1000x10002F7861042539889-1-1.jpg' },
        { id: 3, name: 'F. papas', price: 1.00, stock: 10, pathImage: 'https://www.supermercadosantamaria.com/documents/10180/10504/44270_G.jpg' },
        { id: 4, name: 'F. fideo', price: 0.80, stock: 10, pathImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfyu0O-qOMpWDxFoPPdmVzt6Wdf1MyGgx8WQ&s' },
        { id: 5, name: 'F. sal', price: 0.50, stock: 10, pathImage: 'https://www.supermaxi.com/wp-content/uploads/2024/08/items2Figm2F1000x10002F7861057500188-1.jpg' },
        { id: 6, name: 'F. azucar', price: 2.30, stock: 10, pathImage: 'https://tienda.propieta.ec/wp-content/uploads/2021/03/azucar-blanca.jpg' },
        { id: 7, name: 'F. arroz', price: 1.50, stock: 10, pathImage: 'https://www.supermaxi.com/wp-content/uploads/2024/08/items2Figm2F1000x10002F7861042539889-1-1.jpg' },
        { id: 8, name: 'F. papas', price: 1.00, stock: 10, pathImage: 'https://www.supermercadosantamaria.com/documents/10180/10504/44270_G.jpg' },
        { id: 9, name: 'F. fideo', price: 0.80, stock: 10, pathImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfyu0O-qOMpWDxFoPPdmVzt6Wdf1MyGgx8WQ&s' },
        { id: 10, name: 'F. sal', price: 0.50, stock: 0, pathImage: 'https://www.supermaxi.com/wp-content/uploads/2024/08/items2Figm2F1000x10002F7861057500188-1.jpg' }
    ];

    //hook usestate para gestionar el estado de los productos
    const [productsState, seTproductsState] = useState<Product[]>(products);
    //hook usestate para gestionar el carrito de compras
    const [car, setCar] = useState<Car[]>([]);
    //hook usestate para gestionar el estado del modal
    const [showModal, setShowModal] = useState<boolean>(false)

    //funcion para actualizar el stock de un producto
    const updateStockProduct = (idProduct: number, quantity: number) => {
        const newProducts = productsState.map(product => product.id === idProduct
            ? { ...product, stock: product.stock - quantity }
            : product);



        //actualizar el estado de productsState
        seTproductsState(newProducts);
        //llamar  la funcion para agregar el producto al carrito
        addProductCar(idProduct, quantity);
    }
    //funcion para agregar al carrito
    const addProductCar = (idProduct: number, quantity: number) => {
        const product = productsState.find(product => product.id === idProduct);
        // Si el producto no existe, salir de la función
        if (!product) return;
        setCar((prevCar) => {
            // Buscar si el producto ya está en el carrito
            const existingProductIndex = prevCar.findIndex(item => item.id === idProduct);
            if (existingProductIndex !== -1) {
                // Si el producto ya está en el carrito, actualizar la cantidad y total
                const updatedCar = [...prevCar];
                updatedCar[existingProductIndex] = {
                    ...updatedCar[existingProductIndex],
                    quantity: updatedCar[existingProductIndex].quantity + quantity,
                    total: (updatedCar[existingProductIndex].quantity + quantity) * product.price
                };
                return updatedCar;
            } else {
                // Si el producto no está en el carrito, agregarlo
                return [
                    ...prevCar,
                    {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: quantity,
                        total: product.price * quantity
                    }
                ];
            }
        });
    };

    return (
        <View>
            <StatusBar backgroundColor={PRIMARY_COLOR} />
            <View style={styles.headerHome}>
                <TitleComponent title='Productos' />
                <View style={{
                    ...styles.containerIcon,
                    paddingHorizontal: 30
                }}>
                    <Text style={styles.textIconCar} >{car.length}</Text>
                    <TouchableOpacity
                        disabled={car.length === 0} // Deshabilitar si el carrito está vacío
                        onPress={() => setShowModal(!showModal)}
                    >
                        <Icon
                            name='shopping-cart'
                            size={30}
                            color={car.length === 0 ? 'gray' : SECONDARY_COLOR} // Cambiar color si está deshabilitado
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <BodyComponent>
                <FlatList
                    data={productsState}
                    renderItem={({ item }) => <CardProduct product={item} updateStockProduct={updateStockProduct} />}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }} />
            </BodyComponent>
            <ModalCar isVisible={showModal} car={car} setShowModal={() => setShowModal(!setShowModal)} setCar={setCar} />
        </View>

    )
}
