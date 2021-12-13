import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Cart, ProductDetail, Checkout, Login, Register1, Register2 } from '../pages';
//import { HeaderComponent } from '../components';

const Stack = createNativeStackNavigator();

const Router = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Home"
                component={Home} 
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name="Shopping Cart" 
                component={Cart}
            />
            <Stack.Screen 
                name="Check Out" 
                component={Checkout}
            />
            <Stack.Screen 
                name="Product Detail" 
                component={ProductDetail}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Register1"
                component={Register1}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Register2"
                component={Register2}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}

export default Router
