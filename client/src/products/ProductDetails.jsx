import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//--------------------------------------------------------------------------------------
import { clearProductDetails, startGetProductDetails, startUpdateProductDetails } from '../actions/productActions'
import ProductForm from './ProductForm'
//--------------------------------------------------------------------------------------
import { Stack, Typography } from '@mui/material'
import CategoryIcon from '@mui/icons-material/Category';
//--------------------------------------------------------------------------------------

const ProductDetails = (props) => {
    const path = props.location.pathname.slice(6)

    const productDetails = useSelector((state) => state.products.details)
    const { _id } = productDetails

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetProductDetails(path))
        return (() => {
            dispatch(clearProductDetails())
        })
    }, [dispatch, path])

    const handleSubmission = (formData, resetForm, setErrors) => {
        dispatch(startUpdateProductDetails(_id, formData, setErrors, props.history))
    }

    return (
        <Stack spacing={3} alignItems='center'>
            <CategoryIcon fontSize='large' color='primary' />

            <Typography variant='h4' >
                ProductDetails
            </Typography>

            {Object.keys(productDetails).length > 0 && <ProductForm {...productDetails} handleSubmission={handleSubmission} show />}
        </Stack >
    )
}

export default ProductDetails