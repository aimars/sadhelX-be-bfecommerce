import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { IconBack, IconBlackCart } from '../../../assets'
import { colors } from '../../../utils'
import TextOnly from './TextOnly'

const Tombol = (props) => {

    const Icon = () => {
        if(icon === "cart") {
            return <IconBlackCart />
        } else if(icon === "IconBack") {
            return <IconBack />
        }

        return <IconBlackCart />
    }

    const {icon, totalCart, padding, type, onPress} = props;
    if(type === "text") {
        return <TextOnly {...props} />
    }

    return (
        <TouchableOpacity style={styles.container(padding)} onPress={onPress}>
            <Icon />

           {totalCart && (
               <View style={styles.notif}>
                   <Text style={styles.textNotif}>{totalCart}</Text>
               </View>
           )}
        </TouchableOpacity>
    )
}

export default Tombol

const styles = StyleSheet.create({
    container: (padding) =>({
        backgroundColor: colors.white,
        padding: padding,
        borderRadius: 5,
    }),
    notif: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'red',
        borderRadius: 3,
        padding: 3,
    },
    textNotif: {
        fontSize: 8,
        color: colors.white,
    }
})
