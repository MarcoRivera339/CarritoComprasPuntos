import React, { useState } from 'react'
import { Alert, StatusBar, Text, Touchable, TouchableOpacity, View } from 'react-native'
import { TitleComponent } from '../components/TitleComponent';
import { PRIMARY_COLOR } from '../theme/commons/constants';
import { BodyComponent } from '../components/BodyComponent';
import { styles } from '../theme/appTheme';
import { InputComponent } from '../components/InputComponent';
import { ButtonComponent } from '../components/ButtonComponent';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { User } from '../navigator/StackNavigator';

//interface para el objeto del formulario
interface FormLogin {
    email: String;
    password: String;
}

//interface props del stacknavigator
interface Props {
    users: User[];
}

export const LoginScreen = ({ users }: Props) => {
    //hook use state
    const [formLogin, setFormLogin] = useState<FormLogin>({
        email: '',
        password: ''
    });
    //hook estado de la contrasenia
    const [hiddenPassword, sethiddenPassword] = useState<boolean>(true)

    //hook useNavigation
    const navigation = useNavigation();

    //funcion para el cambio de valores del objeto del formulario
    const handleChangeValue = (name: string, value: string): void => {
        //actualiza el estado del formulario
        setFormLogin({ ...formLogin, [name]: value });
    }

    //funcion para validar si existe el usuario
    const verifyUser = (): User | undefined => {
        const existUser = users.find(user => user.email === formLogin.email && user.password === formLogin.password);
        return existUser;
    }

    //funcion para iniciar sesion
    const handleSendForm = (): void => {
        //validar que el usuario no vaya vacio
        if (formLogin.email == '' || formLogin.password == '') {
            //mensaje alerta
            Alert.alert('Error', 'Todos los campos son obligatorios');
            return; //me saca de la funcion para que siga con las otras lineas
        }
        //validar si extiste el usuario
        if (!verifyUser()) {
            Alert.alert('ERROR', 'Usiario y contrasenia incorrectos');
            return;
        }
        //inicio de sesion exitoso
        navigation.dispatch(CommonActions.navigate({ name: 'Home' }));
        //  console.log(formLogin);
    }

    return (
        <View>
            <StatusBar backgroundColor={PRIMARY_COLOR} />
            <TitleComponent title='iniciar sesion' />
            <BodyComponent>
                <Text style={styles.titlePrincipal}>
                    Bienvenido de nuevo!
                </Text>
                <Text style={styles.titleSecondary}>
                    Realiza tus compras de manera rapida y segura
                </Text>
                <View style={styles.containerInput}>
                    <InputComponent keyboardType='email-address' placeholder='Correo' handleChangeValue={handleChangeValue} name='email' />
                    <InputComponent keyboardType='default' placeholder='Contrasena' handleChangeValue={handleChangeValue} name='password' isPassword={hiddenPassword} />
                    <Icon name={(hiddenPassword) ? 'visibility' : 'visibility-off'} size={20} color={PRIMARY_COLOR} style={styles.icon} onPress={() => sethiddenPassword(!hiddenPassword)} />
                    <ButtonComponent title='Iniciar' handleLogin={handleSendForm} />
                    <TouchableOpacity
                        onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Register' }))}>
                        <Text style={styles.textRedirect}>No tienes una cuenta ? Registrate ahora</Text>
                    </TouchableOpacity>
                </View>
            </BodyComponent>
        </View>
    )
}
