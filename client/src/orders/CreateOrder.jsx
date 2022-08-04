import { useDispatch } from 'react-redux'
//--------------------------------------------------------------------------------------
import { startCreateOrder } from '../actions/orderActions'
import OrderForm from './OrderForm'
//--------------------------------------------------------------------------------------
import { Grid } from '@mui/material'
//--------------------------------------------------------------------------------------

const CreateOrder = (props) => {

    const dispatch = useDispatch()

    const handleSubmission = (formData, resetForm) => {
        dispatch(startCreateOrder(formData, resetForm, props.history))
    }

    return (
        <Grid container direction='column' alignItems='center'>
            <Grid item>
                <OrderForm handleSubmission={handleSubmission} />
            </Grid>
        </Grid>
    )
}

export default CreateOrder