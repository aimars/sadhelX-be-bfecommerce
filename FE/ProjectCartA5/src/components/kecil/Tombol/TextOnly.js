import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
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
        borderRadius: 5,
    }),
    text:{
        color: colors.white,
        textAlign: 'center',
        fontSize: 13,
        fontFamily: fonts.primary.bold,
    }
})
