import { SNAP_TRANSACTOINS } from "../../actions/PaymentActions";

const initialState = {
    snapTransactionsLoading: false,
    snapTransactionsResult: false,
    snapTransactionsError: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case  SNAP_TRANSACTOINS:
            return {
                ...state,
                snapTransactionsLoading: action.payload.loading,
                snapTransactionsResult: action.payload.data,
                snapTransactionsError: action.payload.errorMessage,
            };
        default:
            return state;
    }
}