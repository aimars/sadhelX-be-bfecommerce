//hanya contoh untuk memasukan ke dalam keranjang
import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, responsiveHeight, fonts, heightMobileUI, numberWithCommas, responsiveWidth } from '../../utils'
import { Inputan, Jarak, Pilihan, Tombol } from '../../components'
import { RFValue } from 'react-native-responsive-fontsize';


export default class ProductDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            product: this.props.route.params.product,
        }
    }
    
    render() {
        const { navigation } = this.props;
        const { product } = this.state
        return (
        <View style={styles.page}>
            <View style={styles.button}>
                <Tombol icon="IconBack" padding={7} onPress={() => navigation.goBack()}/>
            </View>

            <View style={styles.container}>
                <View style={styles.desc}>
                    <Text style={styles.nama}>{product.nama}</Text>
                    <Text style={styles.text}>Price : Rp. {numberWithCommas(product.harga)}</Text>
                    <Text style={styles.text}>Stock : {product.stok}</Text>

                    <View style={styles.wrapperInput}>
                        <Inputan 
                            label="Quantity" 
                            width={responsiveWidth(166)} 
                            height={responsiveHeight(33)}
                            fontSize={13}
                        />
                        <Pilihan 
                            label="Color"
                            width={responsiveWidth(350)} 
                            height={responsiveHeight(45)}
                            fontSize={13}
                            datas={product.warna}
                        />
                    </View>
                    <Jarak height={180}/>
                    <Tombol 
                        title="Add to Cart"
                        type="text"
                        padding={responsiveHeight(17)}
                        fontSize={18}
                    />
                </View>
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: colors.primary
    },
    container: {
        position: 'absolute',
        bottom: 0,
        height: responsiveHeight(495),
        width: '100%',
        backgroundColor: colors.white,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40
    },
    button:{
        position: 'absolute',
        marginTop: 30,
        marginLeft: 30,
    },
    desc:{
        marginHorizontal: 30
    },
    nama:{
        marginTop: 10,
        fontFamily: fonts.primary.bold,
        fontSize: RFValue(24, heightMobileUI),
    },
    text: {
        fontFamily: fonts.primary.regular,
        fontSize: RFValue(20, heightMobileUI),
    },
    wrapperInput: {
        justifyContent: 'space-between'
    }
});
