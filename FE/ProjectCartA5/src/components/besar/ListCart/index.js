//untuk menampilkan list item pada laman shoppping cart

import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { fonts, colors } from '../../../utils'
import { CartCard } from '../../kecil'

const ListCart = ({getListCartLoading, getListCartResult, getListCartError}) => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                {getListCartResult ? (
                    Object.keys(getListCartResult.orders).map((key) => {
                        return (
                            <CartCard 
                                cart={getListCartResult.orders[key]} 
                                cartUtama={getListCartResult} 
                                key={key}
                                id={key}
                            />
                        );
                    })
                ) : getListCartLoading ? (
                    <View style={styles.loading}>
                        <ActivityIndicator color={colors.primary}/>
                    </View>
                ) : getListCartError ? (
                    <Text>{getListCartError}</Text>
                ) : (
                    //Anda belum belaja
                    <View style={styles.containerKosong}>
                        <Text style={styles.cartKosong}>Your Cart is Empty . . .</Text>
                        <Text style={styles.cartKosong}>Please Add a Product First</Text>
                    </View>
                    
                )}
            </View>
        </ScrollView>
    )
}

export default ListCart

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
    },
    loading: {
        flex: 1,
        marginTop: 10,
        marginBottom: 30
    },
    containerKosong: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 250,
    },
    cartKosong: {
        fontFamily: fonts.primary.regular,
        fontSize: 14,
    }
})
