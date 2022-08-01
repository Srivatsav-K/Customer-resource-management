import { useDispatch } from 'react-redux'
//--------------------------------------------------------------------------------------
import { startCreateProduct } from '../actions/productActions'
import ProductForm from './ProductForm'
//--------------------------------------------------------------------------------------
import { Stack, Typography } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
//--------------------------------------------------------------------------------------

const AddProduct = () => {
    const dispatch = useDispatch()

    const handleSubmission = (formData, resetForm, setErrors) => {
        dispatch(startCreateProduct(formData, resetForm, setErrors))
    }

    return (
        <Stack spacing={3} alignItems='center'>
            <CategoryIcon fontSize='large' color='primary' />

            <Typography variant='h4' >
                AddProducts
            </Typography>

            <ProductForm handleSubmission={handleSubmission} />
        </Stack >
    )
}

export default AddProduct