//hanya contoh untuk membuat card produk
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Tombol } from '..'
import { colors, fonts, responsiveWidth } from '../../../utils'

const CardProducts = ({product, navigation}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.card}>
                <Image source={{uri: product.gambar[0]}} style={styles.gambar}/>
                <Text style={styles.text}>{product.nama}</Text>
            </TouchableOpacity>

            <Tombol type="text" title="Detail" padding={5} onPress={() =>
            navigation.navigate('Product Detail', { product })}/>
            
        </View>
    )
}

export default CardProducts

const styles = StyleSheet.create({
    container:{
        marginBottom: 25,
    },
    card: {
        backgroundColor: colors.white,
        width: responsiveWidth(150),
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    gambar: {
        width: 124,
        height: 124,
    },
    text: {
        fontFamily: fonts.primary.bold,
        fontSize: 15,
        textAlign: 'center',
    },
})
