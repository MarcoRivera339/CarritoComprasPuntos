import React, { useState } from 'react'
import { Alert, StatusBar } from 'react-native'
import { Text, View } from 'react-native'
import { TitleComponent } from '../components/TitleComponent'
import { PRIMARY_COLOR } from '../theme/commons/constants'
import { BodyComponent } from '../components/BodyComponent'
import { styles } from '../theme/appTheme'
import { InputComponent } from '../components/InputComponent'
import { TouchableOpacity } from 'react-native'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { ButtonComponent } from '../components/ButtonComponent'
import { User } from '../navigator/StackNavigator'

//interface para el objeto del formulario
interface FormRegister {
    name: string;
    email: string;
    password: string;
}

//interface props del stacknavigator
interface Props {
    users: User[];
    addUser: (user: User) => void; //agregar nuevos usuarios
}
export const RegisterScreen = ({ users, addUser }: Props) => {
    //hook use state
    const [formRegister, setFormRegister] = useState<FormRegister>({
        name: '',
        email: '',
        password: ''
    });

    //hook use navigation
    const navigation = useNavigation();

    //funcion para el cambio de valores del objeto del formulario
    const handleChangeValue = (name: string, value: string): void => {
        setFormRegister({ ...formRegister, [name]: value });
    }

    //funcion para verificar que el usuario no exista
    const verifyUser = (): User | undefined => {
        const existUser = users.find(user => user.email === formRegister.email);
        return existUser;
    }

    //validar que el usuario no vaya vacio
    const handleSendForm = (): void => {
    }

    //funcion para limpiar campos
    const clearFields = () => {
        setFormRegister({
            name: '',
            email: '',
            password: ''
        })
    }

    //funcion para registrar al usuario
    const handleRegister = () => {
        //validar que el usuario no vaya vacio
        if (formRegister.name === '' || formRegister.email === '' || formRegister.password === '') {
            //mensaje alerta
            Alert.alert('Error', 'Todos los campos son obligatorios');

            return; //termina la ejecucion de la funcion
        }

        //validar si existe el ususario
        if (verifyUser()) {
            clearFields();
            Alert.alert('Error', 'El usuario ya se encuentra registrado');
            return;
        }


        //agregar un nuevo usuario
        //crear un objeto
        const newUser: User = {
            id: users.length + 1,
            name: formRegister.name,
            email: formRegister.email,
            password: formRegister.password
        }
        addUser(newUser);
        Alert.alert('Exitoso', 'Usuario registrado correctamente');

        navigation.goBack();//regresar a la pantalla anterior
        console.log(formRegister);
    }

    return (
        <View>
            <StatusBar backgroundColor={PRIMARY_COLOR} />
            <TitleComponent title='Registrate' />
            <BodyComponent>
                <Text style={styles.titlePrincipal}>
                    Bienvenido de nuevo!
                </Text>
                <Text style={styles.titleSecondary}>
                    Realiza tus compras de manera rapida y segura
                </Text>
                <View style={styles.containerInput}>
                    <InputComponent keyboardType='default' placeholder='Nombre' handleChangeValue={handleChangeValue} name='name' />
                    <InputComponent keyboardType='email-address' placeholder='Correo' handleChangeValue={handleChangeValue} name='email' />
                    <InputComponent keyboardType='default' placeholder='Contrasena' handleChangeValue={handleChangeValue} name='password' />
                    <View>
                        <ButtonComponent title='Registrar' handleLogin={handleRegister} />
                        <TouchableOpacity
                            onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Login' }))}>
                            <Text style={styles.textRedirect}>No tienes una cuenta ? Inicia sesion ahora</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </BodyComponent>
        </View>
    )
}
