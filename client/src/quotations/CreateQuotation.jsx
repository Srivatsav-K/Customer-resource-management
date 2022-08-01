import { useDispatch } from 'react-redux'

//--------------------------------------------------------------------------------------

import { startCreateQuotation } from '../actions/quotationActions'
import QuotationForm from './QuotationForm'

//--------------------------------------------------------------------------------------

import { Grid } from '@mui/material'

//--------------------------------------------------------------------------------------

const CreateQuotation = () => {

    const dispatch = useDispatch()

    const handleSubmission = (data, history, resetForm) => {
        dispatch(startCreateQuotation(data, history, resetForm))
    }

    return (
        <Grid container justifyContent='center'>
            <Grid item xs>
                <QuotationForm handleSubmission={handleSubmission} />
            </Grid>
        </Grid>
    )
}

export default CreateQuotation