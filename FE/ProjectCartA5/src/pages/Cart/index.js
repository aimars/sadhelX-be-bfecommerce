import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { dummyPesanans } from '../../data'
import { ListCart, Tombol } from '../../components'
import { colors, fonts, getData, numberWithCommas, responsiveHeight } from '../../utils'
import { connect } from 'react-redux'
import { getListCart } from '../../actions/CartAction'


class Cart extends Component {

    componentDidMount() {
        getData('user').then((res) => {
            if(res) {
                //sudah login
                this.props.dispatch(getListCart(res.uid));
            }else {
                //belum login
                this.props.navigation.replace("Login");
            }
        })
    }

    render() {
        const { getListCartResult } = this.props;
        
        //console.log("Data Cart : ", this.props.getListCartResult);
        return (
            <View style={styles.page}>
                <ListCart {...this.props}/>
                <View style={styles.footer}>
                    <View style={styles.subTotal}>
                        <Text style={styles.textBold}>Sub Total :</Text>
                        <Text style={styles.textBold}>Rp. {getListCartResult ? numberWithCommas(getListCartResult.totalHarga) : 0}</Text>
                    </View> 

                    {getListCartResult ? (
                        <Tombol 
                            title="Check Out" 
                            type="text" 
                            padding={responsiveHeight(15)}
                            onPress={() => this.props.navigation.navigate('Check Out')}
                        />
                    ) : (
                        <Tombol 
                            title="Check Out" 
                            type="text" 
                            padding={responsiveHeight(15)}
                            disabled={true}
                        />
                    )}
                    
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    getListCartLoading: state.CartReducer.getListCartLoading,
    getListCartResult: state.CartReducer.getListCartResult,
    getListCartError: state.CartReducer.getListCartError,
})

export default connect(mapStateToProps, null)(Cart)

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
