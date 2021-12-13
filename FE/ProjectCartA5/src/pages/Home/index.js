//untuk percobaan
import React, { Component } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import HeaderComponent from '../../components/besar/HeaderComponent'
import { colors, fonts } from '../../utils'
import { ListProduct } from '../../components'
import { getListProduct } from '../../actions/ProductAction'
import { connect } from 'react-redux'
import { Tombol, Jarak } from '../../components/kecil'

class Home extends Component {

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.props.dispatch(getListProduct());
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }
    
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.page}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <HeaderComponent navigation={navigation}/>
                    <View style={styles.pilihProduct}>
                        <Text style={styles.label}>Pilih Product</Text>
                        <ListProduct navigation={navigation}/>
                    </View>
                    
                    <View style={styles.footer}>
                        <Tombol 
                            type="text" 
                            title="SignIn / SignOut" 
                            padding={10} 
                            onPress={() => navigation.navigate('Login')}/>
                    </View>
                    
                </ScrollView>
                
            </View>
        );
    }
}

export default connect()(Home)

const styles = StyleSheet.create({
    page: { 
        flex: 1,
        backgroundColor: colors.white 
    },
    pilihProduct: {
        marginHorizontal: 30,
        marginTop: 10,
    },
    label: {
        fontSize: 18,
        fontFamily: fonts.primary.regular
    },
    footer: {
        paddingHorizontal: 30,
        paddingBottom: 30,
    },
});
