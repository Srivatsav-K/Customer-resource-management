import { CREATE_CONTACT, GET_CONTACTS, CONTACTS_LOADING_FALSE, CONTACTS_LOADING_TRUE, GET_CONTACT_DETAILS, CLEAR_CONTACT_DETAILS, UPDATE_CONTACT_DETAILS, DELETE_CONTACT } from "../actions/contactActions"

const contactsInitialValue = {
    data: [],
    details: {},
    serverErrors: {},
    loading: false
}

const contactReducer = (state = contactsInitialValue, action) => {
    switch (action.type) {
        case (CONTACTS_LOADING_TRUE): {
            return { ...state, loading: true }
        }
        case (CONTACTS_LOADING_FALSE): {
            return { ...state, loading: false }
        }
        case (GET_CONTACTS): {
            return { ...state, data: [...action.payload], loading: false }
        }
        case (CREATE_CONTACT): {
            return { ...state, data: [...state.data, { ...action.payload }], serverErrors: {} }
        }
        case (GET_CONTACT_DETAILS): {
            return { ...state, details: { ...action.payload } }
        }
        case (CLEAR_CONTACT_DETAILS): {
            return { ...state, details: { ...action.payload } }
        }
        case (UPDATE_CONTACT_DETAILS): {
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
        case (DELETE_CONTACT): {
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

export default contactReducer