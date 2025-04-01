import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { PRIMARY_COLOR } from '../theme/commons/constants';
import { RegisterScreen } from '../screens/RegisterScreen';
import { useState } from 'react';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';

//interface para data de usuario
export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

const Stack = createStackNavigator();

export const StackNavigator = () => {

    //arreglo usuario (data base)
    const users: User[] = [
        { id: 1, name: 'Viviana Flores', email: 'vflores@gmail.com', password: '123' },
        { id: 2, name: 'Marco Rivera', email: 'mrivera@gmail.com', password: '456' }
    ];

    //hook useState para manejar el estado de los usuarios
    const [usersManage, setUsersManage] = useState<User[]>(users);

    //funcion para agregar ususario en el usermanage
    const addUser=(user:User):void=>{
        setUsersManage([...usersManage, user])
    }

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: PRIMARY_COLOR
                }
            }}
        >
            <Stack.Screen name="Login" children={() => <LoginScreen users={usersManage} />} />
            <Stack.Screen name="Register"children={() => <RegisterScreen users={usersManage} addUser={addUser}/>} />
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
}