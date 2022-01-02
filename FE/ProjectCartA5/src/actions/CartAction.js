import FIREBASE from '../config/FIREBASE'
import { dispatchError, dispatchLoading, dispatchSuccess } from '../utils'

export const MASUK_CART = "MASUK_CART";
export const GET_LIST_CART = "GET_LIST_CART";
export const REMOVE_CART = "REMOVE_CART";

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
                    const beratBaru = parseFloat(data.jumlah) * parseFloat(data.product.berat)

                    FIREBASE.database()
                        .ref('carts')
                        .child(data.uid)
                        .update({
                            totalHarga: cartUtama.totalHarga + hargaBaru,
                            totalBerat: cartUtama.totalBerat + beratBaru
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
                        totalBerat: parseFloat(data.jumlah) * parseFloat(data.product.berat)
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
            totalBerat: parseFloat(data.jumlah) * parseFloat(data.product.berat),
            varian: data.varian
        };

        //pengecekan orderID

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

export const removeCart = (id, cartUtama, cart) => {
    return(dispatch) => {
        dispatchLoading(dispatch, REMOVE_CART);

        const totalHargaBaru = cartUtama.totalHarga - cart.totalHarga;
        const totalBeratBaru = cartUtama.totalBerat - cart.totalBerat;

        if(totalHargaBaru === 0) {
            //hapus cart utama & detail
            FIREBASE.database()
                .ref('carts')
                .child(cartUtama.user)
                .remove()
                .then((response) => {
                    dispatchSuccess(dispatch, REMOVE_CART, "Cart Deleted Successfully")
                }).catch((error) => {
                    dispatchError(dispatch, REMOVE_CART, error);
                    alert(error);
                })
        }else {
            //update total harga dan berat cart utama
            FIREBASE.database()
                .ref('carts')
                .child(cartUtama.user)
                .update({
                    totalHarga: totalHargaBaru,
                    totalBerat: totalBeratBaru
                })
                .then((response) => {
                    //hapus order/cart detail
                    dispatch(removeCartDetail(id, cartUtama));
                }).catch((error) => {
                    dispatchError(dispatch, REMOVE_CART, error);
                    alert(error);
                })
        }
    }
}

export const removeCartDetail = (id, cartUtama) => {
    return (dispatch) => {
        FIREBASE.database()
            .ref('carts/'+cartUtama.user)
            .child('orders')
            .child(id)
            .remove()
            .then((response) => {
                dispatchSuccess(dispatch, REMOVE_CART, "Cart Deleted Successfully")
            }).catch((error) => {
                dispatchError(dispatch, REMOVE_CART, error);
                alert(error);
            })
    }
}