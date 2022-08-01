import axios from "axios"
import { toast } from 'react-toastify'
//--------------------------------------------------------------------------
export const QUOTATIONS_LOADING_TRUE = 'QUOTATIONS_LOADING_TRUE'
export const QUOTATIONS_LOADING_FALSE = 'QUOTATIONS_LOADING_FALSE'
export const GET_QUOTATIONS = 'GET_QUOTATIONS'
export const CREATE_QUOTATION = 'CREATE_QUOTATION'

export const GET_QUOTATION_DETAILS = 'GET_QUOTATION_DETAILS'
export const CLEAR_QUOTATION_DETAILS = 'CLEAR_QUOTATION_DETAILS'
export const DELETE_QUOTATION = 'DELETE_QUOTATION'
//-----------------------------------------------------------------------------
const loadingTrue = () => {
    return { type: QUOTATIONS_LOADING_TRUE }
}
const loadingFalse = () => {
    return { type: QUOTATIONS_LOADING_FALSE }
}
const getQuotations = (data) => {
    return { type: GET_QUOTATIONS, payload: data }
}

const createQuotation = (data) => {
    return { type: CREATE_QUOTATION, payload: data }
}

const getQuotationDetails = (data) => {
    return { type: GET_QUOTATION_DETAILS, payload: data }
}
export const clearQuotationDetails = () => {
    return { type: CLEAR_QUOTATION_DETAILS }
}
const deleteQuotation = (data) => {
    return { type: DELETE_QUOTATION, payload: data }
}
//-------------------------------------------------------------------------------
export const startGetQuotations = (path) => {
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
                    dispatch(getQuotations(result))
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

export const startCreateQuotation = (formData, history, resetForm) => {
    return (
        (dispatch) => {
            dispatch(loadingTrue())
            axios.post('http://localhost:3050/api/quotations', formData, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
                .then((response) => {
                    dispatch(loadingFalse())
                    const result = response.data
                    if (result.errors) {
                        toast.error(serverErrorHelper(result.errors))
                    } else {
                        dispatch(createQuotation(result))
                        resetForm()
                        history.push('/user/quotations')
                        toast.success('quotation created!')
                    }
                })
                .catch((err) => {
                    dispatch(loadingFalse())
                    toast.error(err.message)
                })
        }
    )
}

export const startGetQuotationDetails = (path) => {
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
                        dispatch(getQuotationDetails(result))
                    }
                })
                .catch((err) => {
                    dispatch(loadingFalse())
                    toast.error(err.message)
                })
        }
    )
}


export const startDeleteQuotation = (_id, history) => {
    return (
        (dispatch) => {
            axios.delete(`http://localhost:3050/api/quotations/${_id}`, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
                .then((response) => {
                    const result = response.data
                    if (result.errors) {
                        toast.error(result.errors.message)
                    } else {
                        dispatch(deleteQuotation(result))
                        history.push('/user/quotations')
                        toast.success('Deleted Successfully!')
                    }
                })
                .catch((err) => {
                    toast.error(err.message)
                })
        }
    )
}