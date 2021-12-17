import { MASUK_CART, GET_LIST_CART, REMOVE_CART } from '../../actions/CartAction'

const initialState = {
    saveCartLoading: false,
    saveCartResult: false,
    saveCartError: false,

    getListCartLoading: false,
    getListCartResult: false,
    getListCartError: false,

    removeCartLoading: false,
    removeCartResult: false,
    removeCartError: false,
};

export default function (state = initialState, action) {
    switch(action.type) {
        case MASUK_CART:
            return{
                ...state,
                saveCartLoading: action.payload.loading,
                saveCartResult: action.payload.data,
                saveCartError: action.payload.errorMassage,
            };
        case GET_LIST_CART:
            return{
                ...state,
                getListCartLoading: action.payload.loading,
                getListCartResult: action.payload.data,
                getListCartError: action.payload.errorMassage,
            };
        case REMOVE_CART:
            return{
                ...state,
                removeCartLoading: action.payload.loading,
                removeCartResult: action.payload.data,
                removeCartError: action.payload.errorMassage,
            };
        default:
            return state;
    }
}
