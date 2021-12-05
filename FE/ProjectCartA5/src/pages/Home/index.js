//untuk percobaan
import React, { Component } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import HeaderComponent from '../../components/besar/HeaderComponent'
import { colors, fonts } from '../../utils'
import { Jarak, ListProduct } from '../../components'
import { dummyProducts } from '../../data'
import { getListProduct } from '../../actions/ProductAction'
import { connect } from 'react-redux'

class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             products: dummyProducts
        };
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.props.dispatch(getListProduct());
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }
    
    render() {
        const { products } = this.state;
        const { navigation } = this.props;
        return (
            <View style={styles.page}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <HeaderComponent navigation={navigation}/>
                    <View style={styles.pilihProduct}>
                        <Text style={styles.label}>Pilih Product</Text>
                        <ListProduct products={products} navigation={navigation}/>
                    </View>
                </ScrollView>
                
            </View>
        );
    }
}

export default connect()(Home)

const styles = StyleSheet.create({
    page: { flex: 1, backgroundColor: colors.white },
    pilihProduct: {
        marginHorizontal: 30,
        marginTop: 10,
    },
    label: {
        fontSize: 18,
        fontFamily: fonts.primary.regular
    }
});
