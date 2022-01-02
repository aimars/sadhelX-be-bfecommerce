//contoh tampilan home awal, untuk icon cart

import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { colors, fonts, getData, responsiveHeight } from '../../../utils'
import{ Jarak, Tombol } from '../../kecil'
import { getListCart } from '../../../actions/CartAction'

class HeaderComponent extends Component {
    componentDidMount() {
        getData('user').then((res) => {
            if(res) {
                this.props.dispatch(getListCart(res.uid));
            }
        })
    }

    render() {
        const {navigation, getListCartResult} = this.props
        // console.log("Cek:", Object.keys(getListCartResult.orders[key]));
        let totalCart;
        if(getListCartResult) {
            totalCart = Object.keys(getListCartResult.orders).length
        }

        return (
            <View style={styles.container}>
                <View style={styles.wrapperHeader}>
                    <View style={styles.seacrhSection}>
                        <TextInput placeholder="Search . . . ." style={styles.input} />
                    </View>
                    <Jarak width={10} />
                    <Tombol 
                        icon="cart" 
                        padding={15} 
                        onPress={() => navigation.navigate('Shopping Cart')}
                        totalCart={totalCart}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    getListCartResult: state.CartReducer.getListCartResult
})

export default connect(mapStateToProps, null)(HeaderComponent)

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        height: responsiveHeight(125),
    },
    wrapperHeader: {
        marginTop: 15,
        marginHorizontal: 30,
        flexDirection: 'row',
    },
    seacrhSection: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderRadius: 5,
        paddingLeft: 10,
        alignItems: 'center',
    },
    input: {
        fontSize: 16,
        fontFamily: fonts.primary.regular,
    }
})
