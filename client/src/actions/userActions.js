import axios from 'axios'
import { toast } from 'react-toastify'
//--------------------------------------------------------------------------------------
export const USER_LOADING_TRUE = 'USER_LOADING_TRUE'
export const USER_LOADING_FALSE = 'USER_LOADING_FALSE'
export const IS_NEW = 'IS_NEW'
export const LOGIN_ERRORS = 'LOGIN_ERROR'
export const SIGNUP_ERRORS = 'SIGNUP_ERRORS'
export const LOG_OUT = 'LOG_OUT'
export const USER_DATA = "USER_DATA"
//--------------------------------------------------------------------------------------
const loadingTrue = () => {
    return { type: USER_LOADING_TRUE }
}
const loadingFalse = () => {
    return { type: USER_LOADING_FALSE }
}
const userIsNew = (status) => {
    return { type: IS_NEW, payload: status }
}
const loginErrors = (err) => {
    return { type: LOGIN_ERRORS, payload: err }
}
const signupErrors = (err) => {
    return { type: SIGNUP_ERRORS, payload: err }
}

export const userData = (data) => {
    return { type: USER_DATA, payload: data }
}

export const userLoggedOut = () => {
    return { type: LOG_OUT }
}
//--------------------------------------------------------------------------------------

//helper
const serverErrorHelper = (errors) => {
    const fieldErrors = {}
    for (let key in errors) {
        fieldErrors[key] = errors[key].message
    }
    return fieldErrors
}

//check if the user is new or old
export const startUserIsNew = () => {
    return (
        (dispatch, getState) => {
            axios.get(`${process.env.REACT_APP_BASE_URL}users/status`)
                .then((response) => {
                    const result = response.data.status
                    dispatch(userIsNew(result))
                })
                .catch((err) => {
                    toast.error(err.message)
                })
        }
    )
}

export const startGetUserData = (token, history) => {
    return (
        (dispatch) => {
            axios.get('http://localhost:3050/users/account', {
                headers: {
                    'x-auth': token || localStorage.getItem('token')
                }
            })
                .then((response) => {
                    const result = response.data
                    if (result.errors) {
                        console.log(result.errors, history)
                        toast.error(result.errors.message)
                        dispatch(userLoggedOut())
                        history.push('/')
                        localStorage.clear()
                    } else {
                        dispatch(userData(result))
                    }
                })
                .catch((err) => {
                    toast.error(err.message)
                    dispatch(userLoggedOut())
                    history.push('/')
                    localStorage.clear()
                })
        }
    )
}

export const startLogin = (formData, resetForm, props) => {
    return (
        (dispatch) => {
            dispatch(loadingTrue())
            axios.post(`${process.env.REACT_APP_BASE_URL}users/login`, formData)
                .then((response) => {
                    const result = response.data
                    if (result.errors) {
                        dispatch(loginErrors(result))
                    } else {
                        const token = result.token
                        dispatch(startGetUserData(token))

                        localStorage.setItem('token', token)
                        props.history.push('/user/dashboard')
                        toast.success('login success')
                        resetForm()
                    }
                })
                .catch((err) => {
                    toast.error(err.message)
                    dispatch(loadingFalse())
                })
        }
    )
}

export const startSignup = (formData, resetForm, setErrors, history) => {
    return (
        (dispatch, getState) => {
            dispatch(loadingTrue())
            // axios.post(`${process.env.REACT_APP_BASE_URL}/users/admin/signup`, formData)
            axios.post(`http://localhost:3050/users/admin/signup`, formData)
                .then((response) => {
                    const result = response.data
                    dispatch(loadingFalse())

                    if (result.errorMessage) {
                        dispatch(signupErrors(result))
                    } else if (result.errors) {
                        setErrors(serverErrorHelper(result.errors))
                    } else {
                        toast.success(result.message)
                        dispatch(userIsNew(false))
                        resetForm()
                        history.push('/login')
                    }
                })
                .catch((err) => {
                    //alert(err)
                    toast.error(err.message)
                    dispatch(loadingFalse())
                })
        }
    )
}


export const startUpdateAccDetails = (formData, setErrors) => {
    return (
        (dispatch) => {
            axios.put(`http://localhost:3050/users/update-account`, formData, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
                .then((response) => {
                    const result = response.data
                    if (result.errors) {
                        setErrors(serverErrorHelper(result.errors))
                    } else {
                        dispatch(userData(result))
                        toast.success('Updated successfully')
                    }
                })
                .catch((err) => {
                    toast.error(err.message)
                })
        }
    )
}

export const startChangePassword = (formData, setErrors, handleDialogClose) => {
    return (
        (dispatch) => {
            axios.put(`http://localhost:3050/users/change-password`, formData, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
                .then((response) => {
                    const result = response.data
                    if (result.error) {
                        setErrors({ password: result.error })
                    } else if (result.errors) {
                        toast.error(result.errors)
                    } else {
                        toast.success(result.message)
                        handleDialogClose()
                    }
                })
                .catch((err) => {
                    toast.error(err.message)
                })
        }
    )
}

