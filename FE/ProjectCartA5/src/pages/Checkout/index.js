import React, { Component } from 'react'
import { Text, StyleSheet, ScrollView, View, Alert } from 'react-native'
import { CardAlamat, Jarak, Pilihan, Tombol } from '../../components';
import { colors, fonts, getData, numberWithCommas, responsiveHeight } from "../../utils";
import { connect } from 'react-redux';
import { getKotaDetail, postOngkir } from '../../actions/RajaOngkirAction'
import { couriers } from '../../data'
import { CardDetailTransProduct } from '../../components'
import { snapTransactions } from '../../actions/PaymentActions'


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
            date: new Date().getTime(),
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
        const { getKotaDetailResult, ongkirResult, snapTransactionsResult } = this.props;

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

        if(snapTransactionsResult && prevProps.snapTransactionsResult !== snapTransactionsResult) {
            // console.log("Hasil : ", snapTransactionsResult);

            const params = {
                url: snapTransactionsResult.redirect_url,
                ongkir: this.state.ongkir,
                estimasi: this.state.estimasi,
                order_id: "TEST-"+this.state.date+"-"+this.state.profile.uid,
            }

            this.props.navigation.navigate('Midtrans', params);
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

    Bayar = () => {

        const { totalHarga, ongkir, profile, date } = this.state;

        const data = {
            transaction_details: {
                order_id: "TEST-"+date+"-"+profile.uid,
                gross_amount: parseInt(totalHarga+ongkir)
            }, 
            credit_card: {
                secure: true,
            },
            customer_details: {
                first_name: profile.nama,
                email: profile.email,
                phone: profile.nohp,
            }
        }

        // console.log("Data : ", data);

        if(!ongkir == 0) {
            this.props.dispatch(snapTransactions(data))
        }else {
            Alert.alert('Error', "Please select the expedition first..!")
        }

    }
    
    render() {
        const { getListCartResult } = this.props;
        const { profile, ekspedisi, totalHarga, totalBerat, alamat, kota, provinsi, ekspedisiSelected, ongkir, estimasi } = this.state;
        //console.log("Profile : ", profile);

        return (
            <View style={styles.pages}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.isi}>
                        <Text style={styles.textBold}>Delevery Address</Text>
                        <CardAlamat profile={profile} alamat={alamat} provinsi={provinsi} kota={kota}/>

                        <Jarak height={20}/>
                        <Text style={styles.textBold}>Products</Text>
                        <View>
                            {getListCartResult ? (
                                Object.keys(getListCartResult.orders).map((key) => {
                                    return (
                                        <CardDetailTransProduct
                                            cart={getListCartResult.orders[key]} 
                                        />
                                    );
                                })
                            ) : (
                                //Anda belum belaja
                                <View style={styles.containerKosong}>
                                    <Text style={styles.cartKosong}>Your Cart is Empty . . .</Text>
                                    <Text style={styles.cartKosong}>Please Add a Product First</Text>
                                </View>
                                
                            )}
                        </View>

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
                </ScrollView>
                <View style={styles.footer}>
                    <View style={styles.subTotal}>
                        <Text style={styles.textBold}>Total :</Text>
                        <Text style={styles.textBold}>Rp. {numberWithCommas(totalHarga + ongkir)}</Text>
                    </View>
                    <Tombol 
                        title="Pay" 
                        type="text" 
                        padding={responsiveHeight(15)}
                        onPress={() => this.Bayar()}
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
    ongkirResult: state.RajaOngkirReducer.ongkirResult,

    getListCartResult: state.CartReducer.getListCartResult,

    snapTransactionsResult: state.PaymentReducer.snapTransactionsResult,
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
    container: {
       // marginVertical: 5,
    },
})
