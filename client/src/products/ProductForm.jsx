import { useSelector } from "react-redux"
import { useFormik } from "formik"
import * as Yup from 'yup'
//--------------------------------------------------------------------------------------
import { Button, Stack, TextField } from "@mui/material"
//--------------------------------------------------------------------------------------

const ProductForm = (props) => {
    const { handleSubmission, title, description, basePrice, show } = props

    const user = useSelector((state) => state.user.data)

    const formik = useFormik({
        initialValues: {
            title: title || '',
            description: description || '',
            basePrice: basePrice || ''
        },
        validationSchema: Yup.object().shape({
            title: Yup.string()
                .required('Product title is required')
                .min(3, 'Poduct title must be at least 3 characters!')
                .lowercase()
                .trim(),
            description: Yup.string()
                .min(3, 'Poduct description must be at least 3 characters!')
                .lowercase()
                .trim(),
            basePrice: Yup.number()
                .required('Base price is required!')
                .min(1, 'Minimiun price is 1')
        }),
        onSubmit: (formData, { resetForm, setErrors }) => {
            handleSubmission(formData, resetForm, setErrors)
        }
    })

    return (

        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3} maxWidth={214}>
                <TextField
                    name='title'
                    label='Title'
                    size='small'
                    InputProps={{ readOnly: (show && user.role === 'employee') }}
                    value={formik.values.title} onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                />

                <TextField
                    name='description'
                    label='Description'
                    size='small'
                    InputProps={{ readOnly: (show && user.role === 'employee') }}
                    value={formik.values.description} onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                />

                <TextField
                    name='basePrice'
                    type='number'
                    label='Base Price'
                    size='small'
                    InputProps={{ readOnly: (show && user.role === 'employee') }}
                    value={formik.values.basePrice} onChange={formik.handleChange}
                    error={formik.touched.basePrice && Boolean(formik.errors.basePrice)}
                    helperText={formik.touched.basePrice && formik.errors.basePrice}
                />

                {show ? (user.role === 'admin' && (
                    <Button type='submit' variant='contained'>
                        Save
                    </Button>
                )) : (
                    <Button type='submit' variant='contained'>
                        Save
                    </Button>
                )}

            </Stack>
        </form>

    )
}

export default ProductForm