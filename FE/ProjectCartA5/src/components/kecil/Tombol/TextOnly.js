import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { colors, fonts } from '../../../utils'

const TextOnly = ({padding, title, onPress}) => {

    return (
        <TouchableOpacity style={styles.container(padding)} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

export default TextOnly

const styles = StyleSheet.create({
    container: (padding) =>({
        backgroundColor: colors.primary,
        padding: padding,
        borderRadius: 10,
    }),
    text:{
        color: colors.white,
        textAlign: 'center',
        fontSize: 20,
        fontFamily: fonts.primary.bold,
    }
})
