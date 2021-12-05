//integrate product

import FIREBASE from '../config/FIREBASE'
import { dispatchError, dispatchLoading, dispatchSuccess } from '../utils'

export const GET_LIST_PRODUCT = 'GET_LIST_PRODUCT';

export const getListProduct = () => {
    return (dispatch) => {
        dispatchLoading(dispatch, GET_LIST_PRODUCT);

        FIREBASE.database()
        .ref('products')
        .once('value', (querySnapshot) => {
            //Hasil
            //console.log("Data : ", querySnapshot.val());
            let data = querySnapshot.val() ? querySnapshot.val() : [];
        
            dispatchSuccess(dispatch, GET_LIST_PRODUCT, data);
        })
        .catch((error) => {
            dispatchError(dispatch, GET_LIST_PRODUCT, error);
            alert(error);
        });
    }
}