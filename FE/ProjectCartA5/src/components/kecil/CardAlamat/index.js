import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { colors, fonts } from '../../../utils'

const CardAlamat = ({profile, alamat, provinsi, kota}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.alamat}>{profile.nama} - {profile.nohp} </Text>
            <Text style={styles.alamat}>{alamat}</Text>
            <Text style={styles.alamat}>{kota}</Text>
            <Text style={styles.alamat}>Provinsi {provinsi}</Text>
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
