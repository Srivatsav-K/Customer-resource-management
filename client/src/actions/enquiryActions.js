import axios from "axios"
import { toast } from 'react-toastify'
//---------------------------------------------------------------------------------------
export const ENQUIRIES_LOADING_TRUE = 'ENQUIRIES_LOADING_TRUE'
export const ENQUIRIES_LOADING_FALSE = 'ENQUIRIES_LOADING_FALSE'
export const GET_ENQUIRIES = 'GET_ENQUIRIES'
export const NEW_ENQUIRY = 'NEW_ENQUIRY'
export const GET_ENQUIRY_DETAILS = 'GET_ENQUIRY_DETAILS'
export const CLEAR_ENQUIRY_DETAILS = 'CLEAR_ENQUIRY_DETAILS'
export const UPDATE_ENQUIRY_DETAILS = 'UPDATE_ENQUIRY_DETAILS'
export const DELETE_ENQUIRY = 'DELETE_ENQUIRY'
//----------------------------------------------------------------------------------------
const loadingTrue = () => {
    return { type: ENQUIRIES_LOADING_TRUE }
}
const loadingFalse = () => {
    return { type: ENQUIRIES_LOADING_FALSE }
}
const getEnquiries = (data) => {
    return { type: GET_ENQUIRIES, payload: data }
}
const newEnquiry = (data) => {
    return { type: NEW_ENQUIRY, payload: data }
}
const getEnquiryDetails = (data) => {
    return { type: GET_ENQUIRY_DETAILS, payload: data }
}
export const clearEnquiryDetails = () => {
    return { type: CLEAR_ENQUIRY_DETAILS }
}
const updateEnquiryDetails = (data) => {
    return { type: UPDATE_ENQUIRY_DETAILS, payload: data }
}
const deleteEnquiry = (data) => {
    return { type: DELETE_ENQUIRY, payload: data }
}
//-----------------------------------------------------------------------------------------
export const startGetEnquiries = (path) => {
    return (
        (dispatch) => {
            dispatch(loadingTrue())
            axios.get(`http://localhost:3050/api/${path}`, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
                .then((response) => {
                    const result = response.data
                    dispatch(getEnquiries(result))
                })
                .catch((err) => {
                    dispatch(loadingFalse())
                    toast.error(err.message)
                })
        }
    )
}

//helper
const serverErrorHelper = (errors) => {
    const fieldErrors = {}
    for (let key in errors) {
        fieldErrors[key] = errors[key].message
    }
    return fieldErrors
}
//edit
export const startNewEnquiry = (formData, resetForm, setErrors) => {
    return (
        (dispatch) => {
            dispatch(loadingTrue())
            axios.post('http://localhost:3050/api/enquiries', formData, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
                .then((response) => {
                    const result = response.data
                    if (result.errors) {
                        setErrors(serverErrorHelper(result.errors))
                    } else {
                        dispatch(newEnquiry(result))
                        resetForm()
                        toast.success('enquiry created!')
                    }
                })
                .catch((err) => {
                    toast.error(err.message)
                    dispatch(loadingFalse())
                })
        }
    )
}

export const startGetEnquiryDetails = (path) => {
    return (
        (dispatch) => {
            dispatch(loadingTrue())
            axios.get(`http://localhost:3050/api/${path}`, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
                .then((response) => {
                    dispatch(loadingFalse())
                    const result = response.data
                    if (result.errors) {
                        toast.error(result.errors)
                    } else {
                        dispatch(getEnquiryDetails(result))
                    }
                })
                .catch((err) => {
                    dispatch(loadingFalse())
                    toast.error(err.message)
                })
        }
    )
}

export const startUpdateEnquiryDetails = (_id, formData, setErrors, history) => {
    return (
        (dispatch) => {
            axios.put(`http://localhost:3050/api/enquiries/${_id}`, formData, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
                .then((response) => {
                    const result = response.data
                    if (result.errors) {
                        setErrors(serverErrorHelper(result.errors))
                    } else {
                        dispatch(updateEnquiryDetails(result))
                        toast.success('Updated successfully!')
                        history.push('/user/enquiries')
                    }
                })
                .catch((err) => {
                    toast.error(err.message)
                })
        }
    )
}

export const startDeleteEnquiry = (_id, history) => {
    return (
        (dispatch) => {
            axios.delete(`http://localhost:3050/api/enquiries/${_id}`, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
                .then((response) => {
                    const result = response.data
                    if (result.errors) {
                        toast.error(result.errors.message)
                    } else {
                        dispatch(deleteEnquiry(result))
                        history.push('/user/enquiries')
                        toast.success('Deleted Successfully!')
                    }
                })
                .catch((err) => {
                    toast.error(err.message)
                })
        }
    )
}