import { useDispatch } from 'react-redux'

//--------------------------------------------------------------------------------------

import { startCreateQuotation } from '../actions/quotationActions'
import QuotationForm from './QuotationForm'

//--------------------------------------------------------------------------------------

import { Grid } from '@mui/material'

//--------------------------------------------------------------------------------------

const CreateQuotation = (props) => {

    const dispatch = useDispatch()

    const handleSubmission = (formData, resetForm) => {
        dispatch(startCreateQuotation(formData, resetForm, props.history))
    }

    return (
        <Grid container alignItems='center' direction='column'>
            <Grid item >
                <QuotationForm handleSubmission={handleSubmission} />
            </Grid>
        </Grid>
    )
}

export default CreateQuotation