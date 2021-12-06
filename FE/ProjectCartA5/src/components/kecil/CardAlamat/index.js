import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { colors, fonts } from '../../../utils'

const CardAlamat = ({profile}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.alamat}>{profile.nama} - {profile.noHP} </Text>
            <Text style={styles.alamat}>{profile.alamat}</Text>
            <Text style={styles.alamat}>Kota/Kab. {profile.kota}</Text>
            <Text style={styles.alamat}>Provinsi {profile.provinsi}</Text>
            <TouchableOpacity>
                <Text style={styles.ubahAlamat}>Change Address</Text>
            </TouchableOpacity>
        </View> 
    )
}

export default CardAlamat

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.white,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    alamat:{
        fontFamily: fonts.primary.regular,
        fontSize: 14,
    },
    ubahAlamat: {
        fontFamily: fonts.primary.bold,
        fontSize: 14,
        color: colors.primary,
        textAlign: 'right'
    }
})
