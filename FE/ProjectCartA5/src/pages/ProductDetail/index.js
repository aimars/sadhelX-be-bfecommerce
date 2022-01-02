//hanya contoh untuk memasukan ke dalam keranjang
import React, {Component} from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { colors, responsiveHeight, fonts, heightMobileUI, numberWithCommas, responsiveWidth, getData } from '../../utils'
import { Inputan, Jarak, Pilihan, Tombol } from '../../components'
import { RFValue } from 'react-native-responsive-fontsize';
import { connect } from 'react-redux'
import { getDetailProduct } from '../../actions/ProductAction';
import { masukCart } from '../../actions/CartAction';


class ProductDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            product: this.props.route.params.product,
            jumlah: '',
            varian: '',
            uid: '',
        }
    }

    // componentDidMount() {
    //     const { product } = this.state;
    //     this.props.dispatch(getDetailProduct(product));
    // }

    componentDidUpdate(prevProps) {
        const { saveCartResult } = this.props

        if(saveCartResult && prevProps.saveCartResult !== saveCartResult){
            this.props.navigation.navigate("Shopping Cart")
        }
    }

    addToCart = () => {
        const { jumlah, varian } = this.state;

        getData('user').then((res) => {
            if(res) {
                //ambil user uid simpan uid local storage ke state
                this.setState({
                    uid: res.uid
                })

                //validasi form product
                if(jumlah && varian) {
                    //hubungkan ke action (CartAction/masukCart)
                    this.props.dispatch(masukCart(this.state));
                }else {
                    Alert.alert('Error', 'Quantity and Variant cannot be empty, please enter again..!');
                }
            } else {
                Alert.alert('Error', 'Silahkan Login Terlebih Dahulu');
                this.props.navigation.replace("Login") //untuk mengembalikan ke halaman login
            }
        })
    }

    render() {
        const { navigation, saveCartLoading } = this.props;
        const { product, jumlah, varian } = this.state;
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
                            value={jumlah}
                            onChangeText={(jumlah) => this.setState({jumlah})}
                            keyboardType="number-pad"
                        />
                        <Pilihan 
                            label="Variant"
                            width={responsiveWidth(350)} 
                            height={responsiveHeight(45)}
                            fontSize={13}
                            datas={product.varian}
                            selectedValue={varian}
                            onValueChange={(varian) => this.setState({varian})}
                        />
                    </View>
                    <Jarak height={180}/>
                    
                    {/* cek kondisi stok */}
                    <Tombol 
                        title="Add to Cart"
                        type="text"
                        padding={responsiveHeight(17)}
                        fontSize={18}
                        onPress={() => this.addToCart()}
                        //loading={saveCartLoading}
                    />
                </View>
            </View>
        </View>
        );
    }
}

const mapStateToProps = (state) => ({
    //getDetailProductResult: state.ProductReducer.getDetailProductResult
    saveCartLoading: state.CartReducer.saveCartLoading,
    saveCartResult: state.CartReducer.saveCartResult,
    saveCartError: state.CartReducer.saveCartError,
})

export default connect(mapStateToProps, null)(ProductDetail)

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
