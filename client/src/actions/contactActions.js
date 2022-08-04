import axios from "axios"
import { toast } from 'react-toastify'
//--------------------------------------------------------------------------
import { startGetEnquiries } from "./enquiryActions"
import { startGetQuotations } from "./quotationActions"
//--------------------------------------------------------------------------
export const CONTACTS_LOADING_TRUE = 'CONTACTS_LOADING_TRUE'
export const CONTACTS_LOADING_FALSE = 'CONTACTS_LOADING_FALSE'
export const GET_CONTACTS = 'GET_CONTACTS'
export const CREATE_CONTACT = 'CREATE_CONTACT'

export const GET_CONTACT_DETAILS = 'GET_CONTACT_DETAILS'
export const CLEAR_CONTACT_DETAILS = 'CLEAR_CONTACT_DETAILS'
export const UPDATE_CONTACT_DETAILS = 'UPDATE_CONTACT_DETAILS'
export const DELETE_CONTACT = 'DELETE_CONTACT'
//-----------------------------------------------------------------------------
const loadingTrue = () => {
    return { type: CONTACTS_LOADING_TRUE }
}
const loadingFalse = () => {
    return { type: CONTACTS_LOADING_FALSE }
}
const getContacts = (data) => {
    return { type: GET_CONTACTS, payload: data }
}
const createContact = (data) => {
    return { type: CREATE_CONTACT, payload: data }
}

const getContactDetails = (data) => {
    return { type: GET_CONTACT_DETAILS, payload: data }
}
export const clearContactDetails = () => {
    return { type: CLEAR_CONTACT_DETAILS }
}
const updateContactDetails = (data) => {
    return { type: UPDATE_CONTACT_DETAILS, payload: data }
}
const deleteContact = (data) => {
    return { type: DELETE_CONTACT, payload: data }
}
//-------------------------------------------------------------------------------
export const startGetContacts = () => {
    return (
        (dispatch) => {
            dispatch(loadingTrue())
            axios.get('http://localhost:3050/api/contacts', {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
                .then((response) => {
                    const result = response.data
                    dispatch(getContacts(result))
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

export const startCreateContact = (formData, resetForm, setErrors) => {
    return (
        (dispatch) => {
            dispatch(loadingTrue())
            axios.post('http://localhost:3050/api/contacts', formData, {
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
                        dispatch(createContact(result))
                        resetForm()
                        toast.success('contact created!')
                    }
                })
                .catch((err) => {
                    dispatch(loadingFalse())
                    toast.error(err.message)
                })
        }
    )
}

export const startGetContactDetails = (path) => {
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
                        dispatch(getContactDetails(result))
                    }
                })
                .catch((err) => {
                    dispatch(loadingFalse())
                    toast.error(err.message)
                })
        }
    )
}

export const startUpdateContactDetails = (_id, formData, setErrors, history) => {
    return (
        (dispatch) => {
            axios.put(`http://localhost:3050/api/contacts/${_id}`, formData, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
                .then((response) => {
                    const result = response.data
                    if (result.errors) {
                        setErrors(serverErrorHelper(result.errors))
                    } else {
                        dispatch(updateContactDetails(result))
                        if (history) {
                            toast.success('Updated successfully!')
                            history.push('/user/contacts')
                        }
                    }
                })
                .catch((err) => {
                    toast.error(err.message)
                })
        }
    )
}

export const startDeleteContact = (_id, history) => {
    return (
        (dispatch, getState) => {
            axios.delete(`http://localhost:3050/api/contacts/${_id}`, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
                .then((response) => {
                    const result = response.data
                    if (result.errors) {
                        toast.error(result.errors.message)
                    } else {
                        dispatch(deleteContact(result))
                        if (getState().user.data.role === 'admin') {
                            dispatch(startGetEnquiries('enquiries/all'))
                            dispatch(startGetQuotations('quotations/all'))
                        } else {
                            dispatch(startGetEnquiries('enquiries'))
                            dispatch(startGetQuotations('quotations'))
                        }
                        history.push('/user/contacts')
                        toast.success('Deleted Successfully!')
                    }
                })
                .catch((err) => {
                    toast.error(err.message)
                })
        }
    )
}