import React, {useState} from 'react'
import { Picker } from '@react-native-picker/picker'
import { StyleSheet, Text, View } from 'react-native'
import { colors, fonts, responsiveHeight } from '../../../utils'

const Pilihan = ({label, datas, width, height, fontSize, selectedValue, onValueChange}) => {

    return (
        <View style={styles.container}>
            <Text style={styles.label(fontSize)}>{label}</Text>
            <View style={styles.wrapperPicker}>
                <Picker 
                    selectedValue={selectedValue}
                    style={styles.picker(width, height, fontSize)}
                    onValueChange={onValueChange}>
                    <Picker.Item label="--Choose--" value="" />
                    {datas.map((item, index) => {
                        return <Picker.Item label={item} value={item} key={index} />
                    })}
                </Picker>
            </View>
        </View>
    ) 
}

export default Pilihan

const styles = StyleSheet.create({
    container: {
        marginTop: 1,
    },
    label: (fontSize) => ({
        fontSize: fontSize ? fontSize : 14,
        fontFamily: fonts.primary.bold,
    }),
    picker: (width, height, fontSize) => ({
        fontSize: fontSize ? fontSize : 14,
        fontFamily: fonts.primary.regular,
        width: width,
        height: height ? height : responsiveHeight(35),
        marginTop: -10,
        marginBottom: 5,
    }),
    wrapperPicker: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.border,
    }
})
