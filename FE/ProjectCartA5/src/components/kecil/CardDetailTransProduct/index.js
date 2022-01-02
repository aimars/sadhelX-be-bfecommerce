//component tiap item

import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { colors, fonts, numberWithCommas, responsiveHeight, responsiveWidth } from '../../../utils'
import { connect } from 'react-redux'

const CardDetailTransProduct = ({cart}) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri : cart.product.gambar[0]} } style={styles.gambar}/>
            <View>
                <Text style={styles.nama}>{cart.product.nama}</Text>
                <Text style={styles.text}>Rp. {numberWithCommas(cart.product.harga)} x {cart.jumlahOrder}</Text>
                <Text style={styles.text}>Variant : {cart.varian}</Text>
                <Text style={styles.text}>Total Price : Rp. {numberWithCommas(cart.totalHarga)}</Text>
            </View>
        </View>
    )
}

export default connect()(CardDetailTransProduct);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: colors.white,
        shadowColor: '#000',
        textShadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    gambar: {
        width: responsiveWidth(100),
        height: responsiveHeight(100),
        resizeMode: 'contain',
    },
    nama: {
        fontFamily: fonts.primary.bold,
        fontSize: 18,
    },
    text: {
        fontFamily: fonts.primary.regular,
        fontSize: 14,
    },
    textBold: {
        fontFamily: fonts.primary.bold,
        fontSize: 14,
    },
    wrapperPilihan: {
        flexDirection: 'row',
    }
})
