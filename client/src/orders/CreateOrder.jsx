import { useDispatch } from 'react-redux'
//--------------------------------------------------------------------------------------
import { startCreateOrder } from '../actions/orderActions'
import OrderForm from './OrderForm'
//--------------------------------------------------------------------------------------
import { Grid } from '@mui/material'
//--------------------------------------------------------------------------------------

const CreateOrder = () => {

    const dispatch = useDispatch()

    const handleSubmission = (data, history, resetForm) => {
        dispatch(startCreateOrder(data, history, resetForm))
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