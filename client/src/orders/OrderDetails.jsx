import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
//--------------------------------------------------------------------------
import { clearOrderDetails, startDeleteOrder, startGetOrderDetails, startUpdateOrderDetails } from "../actions/orderActions"
import DeleteButton from "../components/DeleteButton"
import OrderForm from "./OrderForm"
//--------------------------------------------------------------------------
import { Grid } from "@mui/material"
//--------------------------------------------------------------------------

const OrderDetails = (props) => {
    const path = props.location.pathname.slice(6)
    const dispatch = useDispatch()

    const [orderDetails, role] = useSelector((state) => [state.orders.details, state.user.data.role])

    const { _id } = orderDetails

    useEffect(() => {
        dispatch(startGetOrderDetails(path))
        return (() => {
            dispatch(clearOrderDetails())
        })
    }, [dispatch, path])

    const handleSubmission = (formData, resetForm) => {
        dispatch(startUpdateOrderDetails(_id, formData, resetForm, props.history))
    }

    const handleDelete = () => {
        dispatch(startDeleteOrder(_id, props.history))
    }


    return (
        <Grid container alignItems='center' direction='column' spacing={2} >
            <Grid item>
                {Object.keys(orderDetails).length > 0 && <OrderForm {...orderDetails} handleSubmission={handleSubmission} />}
            </Grid>

            <Grid item>
                {
                    (role === 'admin') && (
                        <DeleteButton handleDelete={handleDelete} />
                    )
                }
            </Grid>
        </Grid>
    )
}

export default OrderDetails 