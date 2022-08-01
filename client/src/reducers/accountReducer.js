import { GET_COMPANY_DETAILS, POST_COMPANY_DETAILS, UPDATE_COMPANY_DETAILS } from "../actions/accountActions"

const companyInitialState = {
    companyDetails: {},
}

const accountReducer = (state = companyInitialState, action) => {
    switch (action.type) {
        case (GET_COMPANY_DETAILS): {
            return { ...state, companyDetails: { ...action.payload[0] } }
        }
        case (POST_COMPANY_DETAILS): {
            return { ...state, companyDetails: { ...action.payload } }
        }
        case (UPDATE_COMPANY_DETAILS): {
            return { ...state, companyDetails: { ...action.payload } }
        }
        default: {
            return { ...state }
        }
    }
}

export default accountReducer