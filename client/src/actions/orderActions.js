import axios from "axios"
import { toast } from 'react-toastify'
//--------------------------------------------------------------------------
export const ORDERS_LOADING_TRUE = 'ORDERS_LOADING_TRUE'
export const ORDERS_LOADING_FALSE = 'ORDERS_LOADING_FALSE'
export const GET_ORDERS = 'GET_ORDERS'
export const CREATE_ORDER = 'CREATE_ORDER'

export const GET_ORDER_DETAILS = 'GET_ORDER_DETAILS'
export const CLEAR_ORDER_DETAILS = 'CLEAR_ORDER_DETAILS'
export const DELETE_ORDER = 'DELETE_ORDER'
//-----------------------------------------------------------------------------
const loadingTrue = () => {
    return { type: ORDERS_LOADING_TRUE }
}
const loadingFalse = () => {
    return { type: ORDERS_LOADING_FALSE }
}
const getOrders = (data) => {
    return { type: GET_ORDERS, payload: data }
}

const createOrder = (data) => {
    return { type: CREATE_ORDER, payload: data }
}

const getOrderDetails = (data) => {
    return { type: GET_ORDER_DETAILS, payload: data }
}
export const clearOrderDetails = () => {
    return { type: CLEAR_ORDER_DETAILS }
}
const deleteOrder = (data) => {
    return { type: DELETE_ORDER, payload: data }
}
//-------------------------------------------------------------------------------
export const startGetOrders = (path) => {
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
                    dispatch(getOrders(result))
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

export const startCreateOrder = (formData, history, resetForm) => {
    return (
        (dispatch) => {
            dispatch(loadingTrue())
            axios.post('http://localhost:3050/api/orders', formData, {
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
                        dispatch(createOrder(result))
                        resetForm()
                        history.push('/user/orders')
                        toast.success('order created!')
                    }
                })
                .catch((err) => {
                    dispatch(loadingFalse())
                    toast.error(err.message)
                })
        }
    )
}

export const startGetOrderDetails = (path) => {
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
                        dispatch(getOrderDetails(result))
                    }
                })
                .catch((err) => {
                    dispatch(loadingFalse())
                    toast.error(err.message)
                })
        }
    )
}


export const startDeleteOrder = (_id, history) => {
    return (
        (dispatch) => {
            axios.delete(`http://localhost:3050/api/orders/${_id}`, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
                .then((response) => {
                    const result = response.data
                    if (result.errors) {
                        toast.error(result.errors.message)
                    } else {
                        dispatch(deleteOrder(result))
                        history.push('/user/orders')
                        toast.success('Deleted Successfully!')
                    }
                })
                .catch((err) => {
                    toast.error(err.message)
                })
        }
    )
}