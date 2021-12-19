import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { CardAlamat, Jarak, Pilihan, Tombol } from '../../components';
import { colors, fonts, getData, numberWithCommas, responsiveHeight } from "../../utils";
import { ListCart } from '../../components' //
import { connect } from 'react-redux';
import { getKotaDetail, postOngkir } from '../../actions/RajaOngkirAction'
import { couriers } from '../../data'


class Checkout extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            profile: false,
            ekspedisi: couriers,
            ekspedisiSelected: false,
            ongkir: 0,
            estimasi: '',
            totalHarga: this.props.route.params.totalHarga,
            totalBerat: this.props.route.params.totalBerat,
            kota: '',
            provinsi: '',
            alamat: '',
        }
    }

    componentDidMount() {
        this.getUserData();
    }

    getUserData = () => {
        getData('user').then(res => {
            const data = res
        
            if(data) {
                this.setState({
                    profile: data,
                    alamat: data.alamat,
                })

                this.props.dispatch(getKotaDetail(data.kota));

            }else {
                this.props.navigation.replace('Login')
            }
        })
    }

    componentDidUpdate(prevProps) {
        const { getKotaDetailResult, ongkirResult } = this.props;

        if(getKotaDetailResult && prevProps.getKotaDetailResult !== getKotaDetailResult) {
            this.setState({
                provinsi: getKotaDetailResult.province,
                kota: getKotaDetailResult.type+" "+getKotaDetailResult.city_name,
            })
        }

        if(ongkirResult && prevProps.ongkirResult !== ongkirResult) {
            this.setState({
                ongkir: ongkirResult.cost[0].value,
                estimasi: ongkirResult.cost[0].etd
            })
        }
    }

    ubahEkspedisi = (ekspedisiSelected) => {
        if(ekspedisiSelected) {
            this.setState({
                ekspedisiSelected: ekspedisiSelected
            })

            this.props.dispatch(postOngkir(this.state, ekspedisiSelected))
        }
    }
    
    render() {
        const { profile, ekspedisi, totalHarga, totalBerat, alamat, kota, provinsi, ekspedisiSelected, ongkir, estimasi } = this.state;
        //console.log("Profile : ", profile);

        return (
            <View style={styles.pages}>
                <View style={styles.isi}>
                    <Text style={styles.textBold}>Delevery Address</Text>
                    <CardAlamat profile={profile} alamat={alamat} provinsi={provinsi} kota={kota}/>

                    <Jarak height={20}/>
                    {/* <Text style={styles.textBold}>Products</Text> */}

                    <View style={styles.subTotal}>
                        <Text style={styles.textBold}>Sub Total :</Text>
                        <Text style={styles.textBold}>Rp. {numberWithCommas(totalHarga)}</Text>
                    </View>

                    <Pilihan 
                        label="Choose Expedition" 
                        datas={ekspedisi} 
                        selectedValue={ekspedisiSelected} 
                        onValueChange={(ekspedisiSelected) => this.ubahEkspedisi(ekspedisiSelected)}
                    />
                    <Jarak height={10}/>

                    <Text style={styles.textBold}>Shipping Cost :</Text>
                    <View style={styles.ongkir}>
                        <Text style={styles.text}>For Weight : {totalBerat} kg </Text>
                        <Text style={styles.textBold}>Rp. {numberWithCommas(ongkir)}</Text>
                    </View>
                    <View style={styles.ongkir}>
                        <Text style={styles.text}>Estimated time</Text>
                        <Text style={styles.textBold}>{estimasi} Days</Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    <View style={styles.subTotal}>
                        <Text style={styles.textBold}>Total :</Text>
                        <Text style={styles.textBold}>Rp. {numberWithCommas(totalHarga + ongkir)}</Text>
                    </View>
                    <Tombol 
                        title="Pay" 
                        type="text" 
                        padding={responsiveHeight(15)}
                        onPress={() => this.props.navigation.navigate('Check Out')}
                    />
                 </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    getKotaDetailLoading: state.RajaOngkirReducer.getKotaDetailLoading,
    getKotaDetailResult: state.RajaOngkirReducer.getKotaDetailResult,
    getKotaDetailError: state.RajaOngkirReducer.getKotaDetailError,
    ongkirResult: state.RajaOngkirReducer.ongkirResult
})

export default connect(mapStateToProps, null)(Checkout)

const styles = StyleSheet.create({
    pages: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: 30,
        justifyContent: 'space-between',
    },
    isi: {
        paddingHorizontal: 30
    },
    textBold: {
        fontSize: 18,
        fontFamily: fonts.primary.bold
    },
    subTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    ongkir:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 18,
        fontFamily: fonts.primary.regular
    },
    footer: {
        paddingHorizontal: 30,
        paddingBottom: 30,
        backgroundColor: colors.white,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6.84,
        elevation: 11,
    },
})
