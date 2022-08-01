import { useDispatch } from 'react-redux'
//--------------------------------------------------------------------------------------
import { startNewEnquiry } from '../actions/enquiryActions'
import EnquiryForm from './EnquiryForm'
//--------------------------------------------------------------------------------------
import { Stack, Typography } from '@mui/material';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
//--------------------------------------------------------------------------------------

const NewEnquiry = () => {
    const dispatch = useDispatch()

    const handleSubmission = (formData, resetForm, setErrors) => {
        dispatch(startNewEnquiry(formData, resetForm, setErrors))
    }

    return (
        <Stack spacing={3} alignItems='center'>
            <QueryStatsIcon fontSize='large' color='primary' />

            <Typography variant='h4' >
                New Enquiry
            </Typography>

            <EnquiryForm handleSubmission={handleSubmission} />
        </Stack >
    )
}

export default NewEnquiry