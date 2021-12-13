import FIREBASE from '../config/FIREBASE'
import { dispatchError, dispatchLoading, dispatchSuccess } from '../utils'

export const MASUK_CART = "MASUK_CART";
export const GET_LIST_CART = "GET_LIST_CART";

export const masukCart = (data) => {
    return (dispatch) => {
        dispatchLoading(dispatch, MASUK_CART);
        
        //Cek apakah data cart user (Customer) sudah ada atau tidak
        FIREBASE.database()
            .ref('carts/'+data.uid)
            .once('value', (querySnapshot) => {

                //console.log("Cek Cart Customer ada atau tidak", querySnapshot.val());

                if(querySnapshot.val()) {

                    //Update Cart utama
                    const cartUtama = querySnapshot.val()
                    const hargaBaru = parseInt(data.jumlah) * parseInt(data.product.harga)
                    const beratBaru = parseInt(data.jumlah) * parseFloat(data.product.berat)

                    FIREBASE.database()
                        .ref('carts')
                        .child(data.uid)
                        .update({
                            totalHarga: cartUtama.totalHarga + hargaBaru,
                            totalBerat: cartUtama.totalHarga + beratBaru
                        })
                        .then((response) => {
                            //simpan ke Detail Keranjang
                            dispatch(masukCartDetail(data));
                        })
                        .catch((error) => {
                            dispatchError(dispatch, MASUK_CART, error);
                            alert(error);
                        });

                }else {
                    //Simpan Cart Utama
                    const cartUtama = {
                        user: data.uid, 
                        tanggal: new Date().toDateString(),
                        totalHarga: parseInt(data.jumlah) * parseInt(data.product.harga),
                        totalBerat: parseInt(data.jumlah) * parseFloat(data.product.berat)
                    }

                    FIREBASE.database()
                        .ref('carts')
                        .child(data.uid)
                        .set(cartUtama)
                        .then((response) => {

                            //console.log("Simpan cart utama", response);

                            //simpan ke Detail Keranjang
                            dispatch(masukCartDetail(data));
                        })
                        .catch((error) => {
                            dispatchError(dispatch, MASUK_CART, error);
                            alert(error);
                        });
                }
            })
            .catch((error) => {
                dispatchError(dispatch, MASUK_CART, error);
                alert(error);
            })
    }
}

export const masukCartDetail = (data) => {
    return (dispatch) => {
        const orders = {
            product: data.product,
            jumlahOrder: data.jumlah,
            totalHarga: parseInt(data.jumlah) * parseInt(data.product.harga),
            totalBerat: parseInt(data.jumlah) * parseFloat(data.product.berat),
            varian: data.varian
        };

        FIREBASE.database()
            .ref('carts/'+data.uid)
            .child('orders')
            .push(orders)
            .then((response) => {

                //console.log("Simpan cart detail", response);

                dispatchSuccess(dispatch, MASUK_CART, response ? response : []);
            })
            .catch((error) => {
                dispatchError(dispatch, MASUK_CART, error);
                alert(error);
            })
    }
}

export const getListCart = (id) => {
    return (dispatch) => {
        dispatchLoading(dispatch, GET_LIST_CART);

        FIREBASE.database()
        .ref('carts/'+id)
        .once('value', (querySnapshot) => {

            //console.log("Data : ", querySnapshot.val());
            
            //Hasil
            let data = querySnapshot.val();
        
            dispatchSuccess(dispatch, GET_LIST_CART, data);
        })
        .catch((error) => {
            dispatchError(dispatch, GET_LIST_CART, error);
            alert(error);
        });
    }
}