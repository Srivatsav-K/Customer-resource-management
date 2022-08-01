import { CREATE_CLIENT, GET_CLIENTS, CLIENTS_LOADING_FALSE, CLIENTS_LOADING_TRUE, UPDATE_CLIENT_DETAILS, DELETE_CLIENT, GET_CLIENT_DETAILS, CLEAR_CLIENT_DETAILS } from "../actions/clientActions"

const clientsInitialValue = {
    data: [],
    details: {},
    serverErrors: {},
    loading: false
}

const clientsReducer = (state = clientsInitialValue, action) => {
    switch (action.type) {
        case (CLIENTS_LOADING_TRUE): {
            return { ...state, loading: true }
        }
        case (CLIENTS_LOADING_FALSE): {
            return { ...state, loading: false }
        }
        case (GET_CLIENTS): {
            return { ...state, data: [...action.payload], loading: false }
        }
        case (CREATE_CLIENT): {
            return { ...state, data: [...state.data, { ...action.payload }] }
        }
        case (GET_CLIENT_DETAILS): {
            return { ...state, details: { ...action.payload } }
        }
        case (CLEAR_CLIENT_DETAILS): {
            return { ...state, details: {} }
        }
        case (UPDATE_CLIENT_DETAILS): {
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
        case (DELETE_CLIENT): {
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

export default clientsReducer