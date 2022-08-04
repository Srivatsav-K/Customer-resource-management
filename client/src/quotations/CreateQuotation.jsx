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
        <Grid container alignItems='center' direction='column'>
            <Grid item >
                <QuotationForm handleSubmission={handleSubmission} />
            </Grid>
        </Grid>
    )
}

export default CreateQuotation