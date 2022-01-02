//component tiap item

import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Jarak, Pilihan } from '../../kecil'
import { IconRemove } from '../../../assets'
import { colors, fonts, numberWithCommas, responsiveHeight, responsiveWidth } from '../../../utils'
import Inputan from '../Inputan'
import { connect } from 'react-redux'
import { removeCart } from '../../../actions/CartAction'

const CartCard = ({cart, cartUtama, id, dispatch, navigation}) => {


    const hapusCart = () => {
        dispatch(removeCart(id, cartUtama, cart))
    }
    return (
        <View style={styles.container}>
            <Image source={{ uri : cart.product.gambar[0]} } style={styles.gambar}/>
            <View>
                <Text style={styles.nama}>
                    {cart.product.nama}
                </Text>
                <Text style={styles.text}>Rp. {numberWithCommas(cart.product.harga)}</Text>
                <Text style={styles.text}>Stock : {cart.product.stok}</Text>
                <Jarak height={14} />

                <Text style={styles.text}>Quantity : {cart.jumlahOrder}</Text>
                <Text style={styles.text}>Variant : {cart.varian}</Text>
                <Text style={styles.text}>Total Price : Rp. {numberWithCommas(cart.totalHarga)}</Text>
                <TouchableOpacity >
                    <Text style={styles.editCart}>Edit</Text>
                </TouchableOpacity>
                

                {/* <View >
                    <Inputan label="Quantity" value={cart.jumlahOrder}
                        onChangeText={(jumlah) => this.setState({jumlah})}
                        keyboardType="number-pad"
                    />
                    <Pilihan 
                        label="Variant" 
                        width={responsiveWidth(166)}
                        height={responsiveHeight(43)} 
                        fontSize={14} 
                        datas={cart.product.varian}
                    />
                </View> */}
            </View>
            

            <TouchableOpacity style={styles.remove} onPress={() => hapusCart()}>
                <IconRemove />
            </TouchableOpacity>
        </View>
    )
}

export default connect()(CartCard);

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
    },
    editCart: {
        fontFamily: fonts.primary.bold,
        fontSize: 16,
        color: colors.primary,
    }
})
