import { CLEAR_ORDER_DETAILS, CREATE_ORDER, DELETE_ORDER, GET_ORDERS, GET_ORDER_DETAILS, ORDERS_LOADING_FALSE, ORDERS_LOADING_TRUE, UPDATE_ORDER_DETAILS } from "../actions/orderActions"

const ordersInitialValue = {
    data: [],
    details: {},
    serverErrors: {},
    loading: false
}

const ordersReducer = (state = ordersInitialValue, action) => {
    switch (action.type) {
        case (ORDERS_LOADING_TRUE): {
            return { ...state, loading: true }
        }
        case (ORDERS_LOADING_FALSE): {
            return { ...state, loading: false }
        }
        case (GET_ORDERS): {
            return { ...state, data: [...action.payload], loading: false }
        }
        case (CREATE_ORDER): {
            return { ...state, data: [...state.data, { ...action.payload }], serverErrors: {} }
        }
        case (GET_ORDER_DETAILS): {
            return { ...state, details: { ...action.payload } }
        }
        case (CLEAR_ORDER_DETAILS): {
            return { ...state, details: {} }
        }
        case (UPDATE_ORDER_DETAILS): {
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
        case (DELETE_ORDER): {
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

export default ordersReducer