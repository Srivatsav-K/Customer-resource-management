import axios from 'axios'
import { toast } from 'react-toastify'
//--------------------------------------------------------------------------------------
export const UPDATE_COMPANY_DETAILS = 'UPDATE_COMPANY_DETAILS'
export const POST_COMPANY_DETAILS = 'POST_COMPANY_DETAILS'
export const GET_COMPANY_DETAILS = 'GET_COMPANY_DETAILS'
//--------------------------------------------------------------------------------------
const getCompanyDetails = (data) => {
    return { type: GET_COMPANY_DETAILS, payload: data }
}
const updateCompanyDetails = (data) => {
    return { type: UPDATE_COMPANY_DETAILS, payload: data }
}
const postCompanyDetails = (data) => {
    return { type: POST_COMPANY_DETAILS, payload: data }
}
//----------------------------------------------------------------------------------------------------------
//helper
const serverErrorHelper = (errors) => {
    const fieldErrors = {}
    for (let key in errors) {
        fieldErrors[key] = errors[key].message
    }
    return fieldErrors
}

export const startEmployeeSignup = (formData, resetForm, setErrors, history) => {
    return (
        (dispatch) => {
            axios.post(`http://localhost:3050/users/employee/signup`, formData, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
                .then((response) => {
                    const result = response.data
                    if (result.errors) {
                        setErrors(serverErrorHelper(result.errors))
                    } else {
                        toast.success(result.message)
                        resetForm()
                    }
                })
                .catch((err) => {
                    toast.error(err.message)
                })
        }
    )
}

export const startGetCompanyDetails = () => {
    return (
        (dispatch) => {
            axios.get('http://localhost:3050/api/company', {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
                .then((response) => {
                    const result = response.data
                    dispatch(getCompanyDetails(result))
                })
                .catch((err) => {
                    toast.error(err.message)
                })
        }
    )
}

export const startPostCompanyDetails = (formData, resetForm, setErrors) => {
    return (
        (dispatch) => {
            axios.post('http://localhost:3050/api/company', formData, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
                .then((response) => {
                    const result = response.data
                    if (result.errors) {
                        setErrors(serverErrorHelper(result.errors))
                    } else {
                        dispatch(postCompanyDetails(result))
                        toast.success('company details updated!')
                    }
                })
                .catch((err) => {
                    toast.error(err.message)
                })
        }
    )
}

export const startUpdateCompanyDetails = (_id, formData, setErrors) => {
    return (
        (dispatch) => {
            axios.put(`http://localhost:3050/api/company/${_id}`, formData, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
                .then((response) => {
                    const result = response.data
                    if (result.errors) {
                        setErrors(serverErrorHelper(result.errors))
                    } else {

                        dispatch(updateCompanyDetails(result))
                        toast.success('Updated successfully!')
                    }
                })
                .catch((err) => {
                    toast.error(err.message)
                })
        }
    )
}




