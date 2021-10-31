import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import CartCard from '../../kecil/CartCard'

const ListCart = ({carts}) => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                {carts.map((cart => {
                    return <CartCard cart={cart} key={cart.id}/>
                }))}
            </View>
        </ScrollView>
    )
}

export default ListCart

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
    }
})
