import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {colors, fonts} from '../../../utils';

const Inputan = ({width, height, fontSize, label, value, secureTextEntry, keyboardType}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label(fontSize)}>{label} : </Text>
      <TextInput style={styles.input(width, height, fontSize)}  value={value} secureTextEntry={secureTextEntry} keyboardType={keyboardType} />
    </View>
  );
};

export default Inputan;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row' ,
    alignItems: 'center'
  },
  label: (fontSize) => ({
    fontSize: fontSize ? fontSize : 14,
    fontFamily: fonts.primary.bold,
  }),
  input: (width, height, fontSize) => ({
    fontSize: fontSize ? fontSize : 14,
    fontFamily: fonts.primary.regular,
    width: width,
    height: height,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.border,
    paddingVertical: 1,
    paddingHorizontal: 10,
  }),
});
