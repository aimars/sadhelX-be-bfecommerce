import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Jarak, Pilihan } from '../../kecil'
import { IconRemove } from '../../../assets'
import { colors, fonts, numberWithCommas, responsiveHeight, responsiveWidth } from '../../../utils'
import {  } from 'react-native-gesture-handler'

const CartCard = ({cart}) => {
    this.state = {
        quantity: [cart.jumlahPesan],
        warna: [cart.warna],
    };

    const {quantity, warna} = this.state; 

    return (
        <View style={styles.container}>
            <Image source={cart.product.gambar[0]} style={styles.gambar}/>
            <View style={styles.desc}>
                <Text style={styles.nama}>{cart.product.nama}</Text>
                <Text style={styles.text}>Rp. {numberWithCommas(cart.product.harga)}</Text>
                <Text style={styles.text}>Stock : {cart.product.stok}</Text>
                <Jarak height={14} />
                <Text style={styles.textBold}>Quantity : {quantity}</Text>

                <View style={styles.wrapperPilihan}>
                    <Pilihan 
                        label="Warna" 
                        width={responsiveWidth(166)}
                        height={responsiveHeight(43)} 
                        fontSize={14} 
                        datas={warna}
                    />
                </View>
            </View>

            <TouchableOpacity style={styles.remove}>
                <IconRemove />
            </TouchableOpacity>
        </View>
    )
}

export default CartCard

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 15,
        backgroundColor: colors.white,
        shadowColor: '#000',
        textShadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginHorizontal: 30,
        borderRadius: 10,
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    gambar: {
        width: responsiveWidth(100),
        height: responsiveHeight(100),
        resizeMode: 'contain',
    },
    remove: {
        flex: 1,
        alignItems: 'flex-end',
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
