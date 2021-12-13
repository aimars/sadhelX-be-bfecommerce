import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {Inputan, Jarak, Tombol} from '../../components';
import { colors, fonts } from '../../utils';
import {loginUser} from '../../actions/AuthAction';
import {connect} from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  login = () => {
    const {email, password} = this.state;

    if (email && password) {
      //action
      this.props.dispatch(loginUser(email, password));
    } else {
      Alert.alert('Error', 'Email & Password harus diisi');
    }
  };

  componentDidUpdate(prevProps) {
    const {loginResult} = this.props;

    if (loginResult && prevProps.loginResult !== loginResult) {
      this.props.navigation.replace('Home');
    }
  }

  render() {
    const {email, password} = this.state;

    return (
      <View style={styles.pages}>
        <View style={styles.cardLogin}>
          <Inputan
            label="Email"
            value={email}
            onChangeText={(email) => this.setState({email})}
          />
          <Inputan
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={(password) => this.setState({password})}
          />
          <Jarak height={25} />
          <Tombol
            title="Login"
            type="text"
            padding={12}
            onPress={() => this.login()}
          />
        </View>

        <View style={styles.register}>
          <Text style={styles.textBlue}>Belum Punya Akun ?</Text>
          <Text
            style={styles.textBlue}
            onPress={() => this.props.navigation.navigate('Register1')}>
            Klik Untuk Daftar
          </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  loginLoading: state.AuthReducer.loginLoading,
  loginResult: state.AuthReducer.loginResult,
  loginError: state.AuthReducer.loginError,
});

export default connect(mapStateToProps, null)(Login);

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white,
  },
  cardLogin: {
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
    padding: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  register: {
    alignItems: 'center',
    marginTop: 10,
  },
  textBlue: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
    color: colors.primary,
  },
});
