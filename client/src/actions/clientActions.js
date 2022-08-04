import axios from 'axios'
import { toast } from 'react-toastify'
//--------------------------------------------------------------------------
import { startGetContacts } from './contactActions'
import { startGetEnquiries } from './enquiryActions'
import { startGetQuotations } from './quotationActions'
//---------------------------------------------------------------------------------
export const CLIENTS_LOADING_TRUE = 'CLIENTS_LOADING_TRUE'
export const CLIENTS_LOADING_FALSE = 'CLIENTS_LOADING_FALSE'
export const GET_CLIENTS = 'GET_CLIENTS'
export const CREATE_CLIENT = 'CREATE_CLIENT'
export const GET_CLIENT_DETAILS = 'GET_CLIENT_DETAILS'
export const CLEAR_CLIENT_DETAILS = 'CLEAR_CLIENT_DETAILS'
export const UPDATE_CLIENT_DETAILS = 'UPDATE_CLIENT_DETAILS'
export const DELETE_CLIENT = 'DELETE_CLIENT'
//---------------------------------------------------------------------------------
const loadingTrue = () => {
    return { type: CLIENTS_LOADING_TRUE }
}
const loadingFalse = () => {
    return { type: CLIENTS_LOADING_FALSE }
}
const getClients = (data) => {
    return { type: GET_CLIENTS, payload: data }
}
const createClient = (data) => {
    return { type: CREATE_CLIENT, payload: data }
}
const getClientDetails = (data) => {
    return { type: GET_CLIENT_DETAILS, payload: data }
}
export const clearClientDetails = () => {
    return { type: CLEAR_CLIENT_DETAILS }
}
const updateClientDetails = (data) => {
    return { type: UPDATE_CLIENT_DETAILS, payload: data }
}
const deleteClient = (data) => {
    return { type: DELETE_CLIENT, payload: data }
}
//----------------------------------------------------------------------------------- 

export const startGetClients = () => {
    return (
        (dispatch) => {
            dispatch(loadingTrue())
            axios.get('http://localhost:3050/api/clients', {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
                .then((response) => {
                    const result = response.data
                    dispatch(getClients(result))
                })
                .catch((err) => {
                    toast.error(err.message)
                    dispatch(loadingFalse())
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

export const startCreateClient = (formData, resetForm, setErrors) => {
    return (
        (dispatch) => {
            dispatch(loadingTrue())
            axios.post('http://localhost:3050/api/clients', formData, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
                .then((response) => {
                    dispatch(loadingFalse())
                    const result = response.data
                    if (result.errors) {
                        setErrors(serverErrorHelper(result.errors))
                    } else {
                        dispatch(createClient(result))
                        resetForm()
                        toast.success('Client created!')
                    }
                })
                .catch((err) => {
                    toast.error(err.message)
                    dispatch(loadingFalse())
                })
        }
    )
}

export const startGetClientDetails = (path) => {
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
                        dispatch(getClientDetails(result))
                    }
                })
                .catch((err) => {
                    dispatch(loadingFalse())
                    toast.error(err.message)
                })
        }
    )
}

export const startUpdateClientDetails = (_id, formData, setErrors, history) => {
    return (
        (dispatch) => {
            axios.put(`http://localhost:3050/api/clients/${_id}`, formData, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
                .then((response) => {
                    const result = response.data
                    if (result.errors) {
                        setErrors(serverErrorHelper(result.errors))
                    } else {
                        dispatch(updateClientDetails(result))
                        if (history) {
                            toast.success('Updated successfully!')
                            history.push('/user/clients')
                        }

                    }
                })
                .catch((err) => {
                    toast.error(err.message)
                })
        }
    )
}

export const startDeleteClient = (_id, history) => {
    return (
        (dispatch, getState) => {
            axios.delete(`http://localhost:3050/api/clients/${_id}`, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
                .then((response) => {
                    const result = response.data
                    if (result.errors) {
                        toast.error(result.errors.message)
                    } else {
                        dispatch(deleteClient(result))
                        dispatch(startGetContacts())
                        if (getState().user.data.role === 'admin') {
                            dispatch(startGetEnquiries('enquiries/all'))
                            dispatch(startGetQuotations('quotations/all'))
                        } else {
                            dispatch(startGetEnquiries('enquiries'))
                            dispatch(startGetQuotations('quotations'))
                        }
                        history.push('/user/clients')
                        toast.success('Deleted Successfully!')
                    }
                })
                .catch((err) => {
                    toast.error(err.message)
                })
        }
    )
}
