//hanya contoh untuk menampilkan list product yang akan ditambahkan pada keranjang

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { CardProducts } from '../../kecil'

const ListProduct = ({products, navigation}) => {
    return (
        <View style={styles.container}>
            {products.map((product) => {
                return (
                    <CardProducts key={product.id} product={product} navigation={navigation}/>
                )
            })}
        </View>
    )
}

export default ListProduct

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10,
    }
})
