import { MASUK_CART } from '../../actions/CartAction'

const initialState = {
    saveCartLoading: false,
    saveCartResult: false,
    saveCartError: false,
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
        default:
            return state;
    }
}
