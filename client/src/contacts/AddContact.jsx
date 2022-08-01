import { useDispatch } from 'react-redux'
//--------------------------------------------------------------------------------------
import { startCreateContact } from '../actions/contactActions'
import ContactForm from './ContactForm'
//--------------------------------------------------------------------------------------
import { Stack, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
//--------------------------------------------------------------------------------------

const AddContact = () => {

    const dispatch = useDispatch()

    const handleSubmission = (formData, resetForm, setErrors) => {
        dispatch(startCreateContact(formData, resetForm, setErrors))
    }

    return (
        <Stack spacing={3} alignItems='center'>
            <AccountCircleIcon fontSize='large' color='primary' />

            <Typography variant='h4' >
                Add Contact
            </Typography>

            <ContactForm handleSubmission={handleSubmission} />
        </Stack >
    )
}

export default AddContact