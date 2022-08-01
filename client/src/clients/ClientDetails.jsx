import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
//--------------------------------------------------------------------------------------------------------
import { clearClientDetails, startDeleteClient, startGetClientDetails, startUpdateClientDetails } from "../actions/clientActions"
import ClientForm from "./ClientForm"
import DeleteButton from "../components/DeleteButton"
//--------------------------------------------------------------------------------------
import { Stack, Typography } from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
//--------------------------------------------------------------------------------------

const ClientDetails = (props) => {

    const [clientDetails, role] = useSelector((state) => [state.clients.details, state.user.data.role])
    const { _id } = clientDetails
    const path = props.location.pathname.slice(6)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetClientDetails(path))
        //unmount
        return (() => {
            dispatch(clearClientDetails())
        })
    }, [dispatch, path])

    const handleSubmission = (formData, resetForm, setErrors) => {
        dispatch(startUpdateClientDetails(_id, formData, setErrors, props.history))
    }

    const handleDelete = () => {
        dispatch(startDeleteClient(_id, props.history))
    }


    return (
        <Stack spacing={3} alignItems='center'>

            <AccountCircleIcon fontSize='large' color='primary' />

            <Typography variant='h4' >
                Client Details
            </Typography>

            {Object.keys(clientDetails).length > 0 && <ClientForm {...clientDetails} handleSubmission={handleSubmission} />}

            {
                (role === 'admin') && (
                    <DeleteButton handleDelete={handleDelete} />
                )
            }

        </Stack >
    )
}

export default ClientDetails