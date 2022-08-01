import { useDispatch } from 'react-redux'
import { startCreateClient } from '../actions/clientActions'
//--------------------------------------------------------------------------------------
import ClientForm from './ClientForm'
//--------------------------------------------------------------------------------------
import { Stack, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
//--------------------------------------------------------------------------------------

const AddClient = () => {
    const dispatch = useDispatch()

    const handleSubmission = (formData, resetForm, setErrors) => {
        dispatch(startCreateClient(formData, resetForm, setErrors))
    }


    return (
        <Stack spacing={3} alignItems='center'>
            <AccountCircleIcon fontSize='large' color='primary' />

            <Typography variant='h4' >
                Add Client
            </Typography>

            <ClientForm handleSubmission={handleSubmission} />
        </Stack >
    )
}

export default AddClient