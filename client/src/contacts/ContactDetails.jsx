import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//--------------------------------------------------------------------------------------
import { clearContactDetails, startDeleteContact, startGetContactDetails, startUpdateContactDetails } from '../actions/contactActions'
import DeleteButton from '../components/DeleteButton'
import ContactForm from './ContactForm'
//--------------------------------------------------------------------------------------
import { Stack, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
//--------------------------------------------------------------------------------------

const ContactDetails = (props) => {
    const path = props.location.pathname.slice(6)
    const [contactDetails, role] = useSelector((state) => [state.contacts.details, state.user.data.role])
    const { _id } = contactDetails
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetContactDetails(path))
        return (() => {
            dispatch(clearContactDetails())
        })
    }, [dispatch, path])

    const handleSubmission = (formData, resetForm, setErrors) => {
        dispatch(startUpdateContactDetails(_id, formData, setErrors, props.history))
    }

    const handleDelete = () => {
        dispatch(startDeleteContact(_id, props.history))
    }

    return (
        <Stack spacing={3} alignItems='center'>
            <AccountCircleIcon fontSize='large' color='primary' />

            <Typography variant='h4' >
                Contact Details
            </Typography>

            {Object.keys(contactDetails).length > 0 && <ContactForm {...contactDetails} handleSubmission={handleSubmission} />}

            {
                (role === 'admin') && (
                    <DeleteButton handleDelete={handleDelete} />
                )
            }
        </Stack>
    )
}

export default ContactDetails