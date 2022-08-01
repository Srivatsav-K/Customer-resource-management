import { CLEAR_QUOTATION_DETAILS, CREATE_QUOTATION, DELETE_QUOTATION, GET_QUOTATIONS, GET_QUOTATION_DETAILS, QUOTATIONS_LOADING_FALSE, QUOTATIONS_LOADING_TRUE } from "../actions/quotationActions"

const quotationsInitialValue = {
    data: [],
    details: {},
    serverErrors: {},
    loading: false
}

const quotationsReducer = (state = quotationsInitialValue, action) => {
    switch (action.type) {
        case (QUOTATIONS_LOADING_TRUE): {
            return { ...state, loading: true }
        }
        case (QUOTATIONS_LOADING_FALSE): {
            return { ...state, loading: false }
        }
        case (GET_QUOTATIONS): {
            return { ...state, data: [...action.payload], loading: false }
        }
        case (CREATE_QUOTATION): {
            return { ...state, data: [...state.data, { ...action.payload }], serverErrors: {} }
        }
        case (GET_QUOTATION_DETAILS): {
            return { ...state, details: { ...action.payload } }
        }
        case (CLEAR_QUOTATION_DETAILS): {
            return { ...state, details: {} }
        }
        case (DELETE_QUOTATION): {
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

export default quotationsReducer