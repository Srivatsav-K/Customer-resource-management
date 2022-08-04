import { Grid } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { clearQuotationDetails, startDeleteQuotation, startGetQuotationDetails } from "../actions/quotationActions"
import DeleteButton from "../components/DeleteButton"
import QuotationForm from "./QuotationForm"

const QuotationDetails = (props) => {
    const path = props.location.pathname.slice(6)
    const dispatch = useDispatch()

    const [quotationDetails, role] = useSelector((state) => [state.quotations.details, state.user.data.role])

    const { _id } = quotationDetails

    useEffect(() => {
        dispatch(startGetQuotationDetails(path))
        return (() => {
            dispatch(clearQuotationDetails())
        })
    }, [dispatch, path])

    const handleSubmission = () => {
        toast.error('Quotations cant be updated!')
    }

    const handleDelete = () => {
        dispatch(startDeleteQuotation(_id, props.history))
    }


    return (
        <Grid container alignItems='center' direction='column' spacing={2} >
            <Grid item>
                {Object.keys(quotationDetails).length > 0 && <QuotationForm {...quotationDetails} handleSubmission={handleSubmission} />}
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

export default QuotationDetails 