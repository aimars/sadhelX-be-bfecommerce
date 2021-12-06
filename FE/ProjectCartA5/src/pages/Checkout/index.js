import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { CardAlamat, Jarak, Pilihan, Tombol } from '../../components';
import { colors, fonts, numberWithCommas, responsiveHeight } from "../../utils";
import { dummyProfile, dummyPesanans } from "../../data";
import { ListCart } from '../../components' //


export default class Checkout extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            profile: dummyProfile,
            pesanan: dummyPesanans[0],
            ekspedisi: []
        }
    }
    
    render() {
        const { profile, pesanan, ekspedisi } = this.state
        return (
            <View style={styles.pages}>
                <View style={styles.isi}>
                    <Text style={styles.textBold}>Delevery Address</Text>
                    <CardAlamat profile={profile}/>

                    <Jarak height={20}/>
                    <Text style={styles.textBold}>Products</Text>

                    <View style={styles.subTotal}>
                        <Text style={styles.textBold}>Sub Total :</Text>
                        <Text style={styles.textBold}>Rp. {numberWithCommas(pesanan.totalHarga)}</Text>
                    </View>

                    <Pilihan label="Choose Expedition" datas={ekspedisi}/>
                    <Jarak height={10}/>

                    <Text style={styles.textBold}>Shipping Cost :</Text>
                    <View style={styles.ongkir}>
                        <Text style={styles.text}>For Weight : {pesanan.berat} kg </Text>
                        <Text style={styles.textBold}>Rp. {numberWithCommas(20000)}</Text>
                    </View>
                    <View style={styles.ongkir}>
                        <Text style={styles.text}>Estimated time</Text>
                        <Text style={styles.textBold}>2-3 Days</Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    <View style={styles.subTotal}>
                        <Text style={styles.textBold}>Total :</Text>
                        <Text style={styles.textBold}>Rp. {numberWithCommas(pesanan.totalHarga + 20000)}</Text>
                    </View>
                    <Tombol 
                        title="Pay" 
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
    pages: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: 30,
        justifyContent: 'space-between',
    },
    isi: {
        paddingHorizontal: 30
    },
    textBold: {
        fontSize: 18,
        fontFamily: fonts.primary.bold
    },
    subTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    ongkir:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 18,
        fontFamily: fonts.primary.regular
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
})
