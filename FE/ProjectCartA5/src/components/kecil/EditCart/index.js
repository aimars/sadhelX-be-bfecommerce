import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Inputan, Pilihan } from '../../kecil'
import { responsiveHeight, responsiveWidth } from '../../../utils'

const EditCart = ({jumlah, varian, selectedVarian}) => {
    return (
        <View >
             <Inputan label="Quantity" value={jumlah}
                onChangeText={(jumlah) => this.setState({jumlah})}
                keyboardType="number-pad"
            />

            <Pilihan 
                label="Variant" 
                width={responsiveWidth(166)}
                height={responsiveHeight(43)} 
                fontSize={14} 
                datas={varian}
                selectedValue={selectedVarian}
            />
        </View>
    )
}

export default EditCart

const styles = StyleSheet.create({})
