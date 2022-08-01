import { LOG_OUT, IS_NEW, SIGNUP_ERRORS, LOGIN_ERRORS, USER_DATA, USER_LOADING_FALSE, USER_LOADING_TRUE } from "../actions/userActions"

const userInitialState = {
    data: {},
    loginErrors: {},
    signupErrors: {},
    isLoggedIn: false,
    loading: false,
    isNew: false, // to show/hide signup
}

const userReducer = (state = userInitialState, action) => {
    switch (action.type) {
        case (USER_LOADING_TRUE): {
            return { ...state, loading: true }
        }
        case (USER_LOADING_FALSE): {
            return { ...state, loading: false }
        }
        case (IS_NEW): {
            return { ...state, isNew: action.payload }
        }
        case (USER_DATA): {
            return { ...state, data: { ...action.payload }, isLoggedIn: true, loading: false, loginErrors: {}, signupErrors: {} }
        }
        case (LOG_OUT): {
            return { ...state, isLoggedIn: false, data: {} }
        }
        case (LOGIN_ERRORS): {
            return { ...state, loginErrors: { ...action.payload }, loading: false }
        }
        case (SIGNUP_ERRORS): {
            return { ...state, signupErrors: { ...action.payload } }
        }
        default: {
            return { ...state }
        }
    }
}

export default userReducer