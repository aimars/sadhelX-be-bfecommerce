import React, {Component} from 'react';
import { Text, StyleSheet, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, Alert } from 'react-native';
import { colors, fonts } from '../../utils';
import {Inputan, Jarak, Tombol} from '../../components';

export default class Register1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nama: '',
      email: '',
      nohp: '',
      password: '',
    };
  }

  onContinue = () => {
    const {nama, email, nohp, password} = this.state;
    if(nama && email && nohp && password) {
      this.props.navigation.navigate('Register2', this.state);
    }else {
      Alert.alert("Error", "Nama, email, no. handphone, dan password harus diisi")
    }
  }

  render() {
    const {nama, email, nohp, password} = this.state;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.page}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.btnBack}>
              <Tombol
                icon="IconBack"
                onPress={() => this.props.navigation.goBack()}
              />
            </View>

            <View style={styles.ilustrasi}>
              <Jarak height={5} />
              <Text style={styles.title}>Daftar</Text>
              <Text style={styles.title}>Isi Daftar Diri Anda</Text>
            </View>
            <Jarak width={10} />

            <View style={styles.card}>
              <Inputan
                label="Nama"
                value={nama}
                onChangeText={(nama) => this.setState({nama})}
              />
              <Inputan
                label="Email"
                value={email}
                onChangeText={(email) => this.setState({email})}
              />
              <Inputan
                label="No. Handphone"
                keyboardType="number-pad"
                value={nohp}
                onChangeText={(nohp) => this.setState({nohp})}
              />
              <Inputan
                label="Password"
                secureTextEntry
                value={password}
                onChangeText={(password) =>this.setState({password})}
              />
              <Jarak height={25} />
              <Tombol
                title="Continue"
                type="text"
                padding={10}
                onPress={() => this.onContinue()}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 20,
  },
  ilustrasi: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.primary.light,
    color: colors.primary,
  },
  card: {
    backgroundColor: colors.white,
    marginHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    paddingHorizontal: 30,
    paddingBottom: 20,
    paddingTop: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  btnBack: {
    marginLeft: 30,
    position: 'absolute',
  },
});
