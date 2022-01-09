import axios from "axios"
import { API_TIMEOUT, URL_MIDTRANS, HEADER_MIDTRANS } from '../utils/constant'
import { dispatchError, dispatchLoading, dispatchSuccess } from '../utils'

export const SNAP_TRANSACTOINS = "SNAP_TRANSACTOINS"

export const snapTransactions = (data) => {
    return (dispatch) => {

        dispatchLoading(dispatch, SNAP_TRANSACTOINS);

        axios({
            method: "POST",
            url: URL_MIDTRANS + 'transactions',
            headers: HEADER_MIDTRANS,
            data: data,
            timeout: API_TIMEOUT
        })
        .then(function (response) {

            dispatchSuccess(dispatch, SNAP_TRANSACTOINS, response.data);

        })
        .catch(function (error) {

            dispatchError(dispatch, SNAP_TRANSACTOINS, error)
            alert(error);

        })
    }
} 