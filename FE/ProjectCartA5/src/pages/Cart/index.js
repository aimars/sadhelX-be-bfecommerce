import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { dummyPesanans } from '../../data'
import { ListCart, Tombol } from '../../components'
import { colors, fonts, numberWithCommas, responsiveHeight } from '../../utils'


export default class Cart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pesanan: dummyPesanans[0]

        }
    }

    render() {
        //console.log("Parameter : ", this.props.route.params);
        const { pesanan } = this.state
        return (
            <View style={styles.page}>
                <ListCart carts={pesanan.pesanans}/>
                <View style={styles.footer}>
                    <View style={styles.subTotal}>
                        <Text style={styles.textBold}>Sub Total :</Text>
                        <Text style={styles.textBold}>Rp. {numberWithCommas(pesanan.totalHarga)}</Text>
                    </View>
                    <Tombol 
                        title="Check Out" 
                        type="text" 
                        padding={responsiveHeight(15)}
                        onPress={() => this.props.navigation.navigate('Check Out')}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    page:{
        flex: 1,
        backgroundColor: colors.white,
    },
    footer: {
        paddingHorizontal: 30,
        paddingBottom: 30,
        backgroundColor: colors.white,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6.84,
        elevation: 11,
    },
    subTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    textBold: {
        fontSize: 20,
        fontFamily: fonts.primary.bold,
    }
})
