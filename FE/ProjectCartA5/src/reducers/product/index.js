//contoh action untuk product
import { GET_LIST_PRODUCT, GET_DETAIL_PRODUCT } from '../../actions/ProductAction'

const initialState = {
    getListProductLoading: false,
    getListProductResult: false,
    getListProductError: false,

    getDetailProductLoading: false,
    getDetailProducttResult: false,
    getDetailProductError: false,
};

export default function (state = initialState, action) {
    switch(action.type) {
        case GET_LIST_PRODUCT:
            return{
                ...state,
                getListProductLoading: action.payload.loading,
                getListProductResult: action.payload.data,
                getListProductError: action.payload.errorMassage,
            };
        case GET_DETAIL_PRODUCT:
            return{
                ...state,
                getDetailProductLoading: action.payload.loading,
                getDetailProductResult: action.payload.data,
                getDetailProductError: action.payload.errorMassage,
            };
        default:
            return state;
    }
}
