import { GET_LIST_PRODUCT } from '../../actions/ProductAction'

const initialState = {
    getListProductLoading: false,
    getListProductResult: false,
    getListProductError: false,
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
        default:
            return state;
    }
}
