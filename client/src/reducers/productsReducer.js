import { CLEAR_PRODUCT_DETAILS, CREATE_PRODUCT, DELETE_PRODUCT, GET_PRODUCTS, GET_PRODUCT_DETAILS, PRODUCTS_LOADING_FALSE, PRODUCTS_LOADING_TRUE, UPDATE_PRODUCT_DETAILS } from "../actions/productActions"

const productsInitialValue = {
    data: [],
    details: {},
    serverErrors: {},
    loading: false
}

const productsReducer = (state = productsInitialValue, action) => {
    switch (action.type) {
        case (PRODUCTS_LOADING_TRUE): {
            return { ...state, loading: true }
        }
        case (PRODUCTS_LOADING_FALSE): {
            return { ...state, loading: false }
        }
        case (GET_PRODUCTS): {
            return { ...state, data: [...action.payload], loading: false }
        }
        case (CREATE_PRODUCT): {
            return { ...state, data: [...state.data, { ...action.payload }] }
        }
        case (GET_PRODUCT_DETAILS): {
            return { ...state, details: { ...action.payload } }
        }
        case (CLEAR_PRODUCT_DETAILS): {
            return { ...state, details: {} }
        }
        case (UPDATE_PRODUCT_DETAILS): {
            return ({
                ...state,
                data: state.data.map((ele) => {
                    if (ele._id === action.payload._id) {
                        return { ...ele, ...action.payload }
                    } else {
                        return { ...ele }
                    }
                })
            })
        }
        case (DELETE_PRODUCT): {
            return ({
                ...state,
                data: state.data.filter((ele) => {
                    return ele._id !== action.payload._id
                })
            })
        }
        default: {
            return { ...state }
        }
    }
}

export default productsReducer