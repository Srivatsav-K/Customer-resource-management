import { CLEAR_ENQUIRY_DETAILS, DELETE_ENQUIRY, ENQUIRIES_LOADING_FALSE, ENQUIRIES_LOADING_TRUE, GET_ENQUIRIES, GET_ENQUIRY_DETAILS, NEW_ENQUIRY, UPDATE_ENQUIRY_DETAILS } from "../actions/enquiryActions"

const enquiriesInitialState = {
    data: [],
    details: {},
    serverErrors: {},
    loading: false
}

const enquiriesReducer = (state = enquiriesInitialState, action) => {
    switch (action.type) {
        case (ENQUIRIES_LOADING_TRUE): {
            return { ...state, loading: true }
        }
        case (ENQUIRIES_LOADING_FALSE): {
            return { ...state, loading: false }
        }
        case (GET_ENQUIRIES): {
            return { ...state, data: [...action.payload], loading: false }
        }
        case (NEW_ENQUIRY): {
            return { ...state, data: [...state.data, { ...action.payload }] }
        }
        case (GET_ENQUIRY_DETAILS): {
            return { ...state, details: { ...action.payload } }
        }
        case (CLEAR_ENQUIRY_DETAILS): {
            return { ...state, details: {} }
        }
        case (UPDATE_ENQUIRY_DETAILS): {
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
        case (DELETE_ENQUIRY): {
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

export default enquiriesReducer