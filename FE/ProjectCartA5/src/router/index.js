import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Cart } from '../pages';
import { HeaderComponent } from '../components';

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
        </Stack.Navigator>
    )
}

export default Router
