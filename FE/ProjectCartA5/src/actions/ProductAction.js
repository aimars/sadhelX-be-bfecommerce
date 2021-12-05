//contoh integrate product

import FIREBASE from '../config/FIREBASE'
import { dispatchError, dispatchLoading, dispatchSuccess } from '../utils'

export const GET_LIST_PRODUCT = 'GET_LIST_PRODUCT';
export const GET_DETAIL_PRODUCT = 'GET_DETAIL_PRODUCT';

export const getListProduct = () => {
    return (dispatch) => {
        dispatchLoading(dispatch, GET_LIST_PRODUCT);

        FIREBASE.database()
        .ref('products')
        .once('value', (querySnapshot) => {
            //Hasil
            //console.log("Data : ", querySnapshot.val());
            //console.log("Masuk : ");
            let data = querySnapshot.val();
        
            dispatchSuccess(dispatch, GET_LIST_PRODUCT, data);
        })
        .catch((error) => {
            dispatchError(dispatch, GET_LIST_PRODUCT, error);
            alert(error);
        });
    }
}

export const getDetailProduct = (id) => {
    return (dispatch) => {
        dispatchLoading(dispatch, GET_DETAIL_PRODUCT);

        FIREBASE.database()
        .ref('products/'+id)
        .once('value', (querySnapshot) => {
            //Hasil
            console.log("Data : ", querySnapshot.val());
            let data = querySnapshot.val();
        
            dispatchSuccess(dispatch, GET_DETAIL_PRODUCT, data);
        })
        .catch((error) => {
            dispatchError(dispatch, GET_DETAIL_PRODUCT, error);
            alert(error);
        });
    }
}