//untuk percobaan
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import HeaderComponent from '../../components/besar/HeaderComponent'
import { colors } from '../../utils'
import { Jarak } from '../../components'

export default class Home extends Component {
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.page}>
                <HeaderComponent/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: { flex: 1, backgroundColor: colors.white }
});
