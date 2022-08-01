import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
//--------------------------------------------------------------------------------------
import { clearEnquiryDetails, startDeleteEnquiry, startGetEnquiryDetails, startUpdateEnquiryDetails } from "../actions/enquiryActions"
import EnquiryForm from "./EnquiryForm"
import DeleteButton from '../components/DeleteButton'
//--------------------------------------------------------------------------------------
import { Stack, Typography } from "@mui/material"
import QueryStatsIcon from '@mui/icons-material/QueryStats';
//--------------------------------------------------------------------------------------

const EnquiryDetails = (props) => {
    const path = props.location.pathname.slice(6)

    const dispatch = useDispatch()

    const [enquiryDetails, role] = useSelector((state) => [state.enquiries.details, state.user.data.role])

    const { _id } = enquiryDetails

    useEffect(() => {
        dispatch(startGetEnquiryDetails(path))
        return (() => {
            dispatch(clearEnquiryDetails())
        })
    }, [dispatch, path])

    const handleSubmission = (formData, resetForm, setErrors) => {
        dispatch(startUpdateEnquiryDetails(_id, formData, setErrors, props.history))
    }

    const handleDelete = () => {
        dispatch(startDeleteEnquiry(_id, props.history))
    }

    return (
        <Stack spacing={3} alignItems='center'>
            <QueryStatsIcon fontSize='large' color='primary' />

            <Typography variant='h4' >
                Enquiry Details
            </Typography>

            {Object.keys(enquiryDetails).length > 0 && <EnquiryForm {...enquiryDetails} handleSubmission={handleSubmission} />}

            {
                (role === 'admin') && (
                    <DeleteButton handleDelete={handleDelete} />
                )
            }

        </Stack>
    )
}

export default EnquiryDetails