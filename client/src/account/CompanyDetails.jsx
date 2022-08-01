import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
//--------------------------------------------------------------------------------------
import { startPostCompanyDetails, startUpdateCompanyDetails } from '../actions/accountActions'
//--------------------------------------------------------------------------------------
import { Button, Grid, Stack, TextField } from '@mui/material'
//--------------------------------------------------------------------------------------

const CompanyDetails = () => {

    const companyDetails = useSelector((state) => state.account.companyDetails)
    const { _id, name, phone, email, website, gst, pan, address } = companyDetails
    const gridSplit = 6

    const dispatch = useDispatch()


    const formik = useFormik({
        initialValues: {
            name: name || '',
            phone: phone || '',
            email: email || '',
            website: website || '',
            gst: gst || '',
            pan: pan || '',
            address: address || ''
        },
        validationSchema: Yup.object().shape({
            name: Yup.string()
                .required('Name is required!')
                .min(3, 'Name must be of at least 3 characters')
                .trim(),
            phone: Yup.number()
                .required('Phone is required!')
                .positive(),
            email: Yup.string()
                .required('Email required!')
                .email('Invalid email!'),
            website: Yup.string()
                .url(),
            gst: Yup.string(),
            pan: Yup.string(),
            address: Yup.string()
        }),
        onSubmit: (formData, { resetForm, setErrors }) => {
            (Object.keys(companyDetails).length > 0) ? (
                dispatch(startUpdateCompanyDetails(_id, formData, setErrors))
            ) : (
                dispatch(startPostCompanyDetails(formData, resetForm, setErrors))
            )
        }
    })


    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container rowSpacing={3} p={5} alignItems='center' justifyContent='center' direction={{ xs: 'column', md: 'row' }} >

                <Grid item sm={gridSplit} container justifyContent='center' >
                    <TextField
                        variant='filled'
                        size='small'
                        name='name'
                        label='name'
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}

                    />
                </Grid>

                <Grid item sm={gridSplit} container justifyContent='center' >
                    <TextField
                        variant='filled'
                        type='number'
                        size='small'
                        name='phone'
                        label='phone'
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}

                    />
                </Grid>

                <Grid item sm={gridSplit} container justifyContent='center' >
                    <TextField
                        size='small'
                        variant='filled'
                        name='email'
                        label='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}

                    />
                </Grid>

                <Grid item sm={gridSplit} container justifyContent='center' >
                    <TextField
                        variant='filled'
                        size='small'
                        name='website'
                        label='website'
                        value={formik.values.website}
                        onChange={formik.handleChange}
                        error={formik.touched.website && Boolean(formik.errors.website)}
                        helperText={formik.touched.website && formik.errors.website}

                    />
                </Grid>


                <Grid item sm={gridSplit} container justifyContent='center' >
                    <TextField
                        variant='filled'
                        size='small'
                        name='gst'
                        label='gst'
                        value={formik.values.gst}
                        onChange={formik.handleChange}
                        error={formik.touched.gst && Boolean(formik.errors.gst)}
                        helperText={formik.touched.gst && formik.errors.gst}

                    />
                </Grid>

                <Grid item sm={gridSplit} container justifyContent='center' >
                    <TextField
                        variant='filled'
                        size='small'
                        name='pan'
                        label='pan'
                        value={formik.values.pan}
                        onChange={formik.handleChange}
                        error={formik.touched.pan && Boolean(formik.errors.pan)}
                        helperText={formik.touched.pan && formik.errors.pan}

                    />
                </Grid>

                <Grid item sm={gridSplit} container justifyContent='center' >
                    <TextField
                        name='address'
                        label='address'
                        multiline
                        rows={4}
                        variant='filled'
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        error={formik.touched.address && Boolean(formik.errors.address)}
                        helperText={formik.touched.address && formik.errors.address}
                    />
                </Grid>

            </Grid>

            <Stack alignItems='center'>
                <Button variant='contained' type='submit'>
                    Save
                </Button>
            </Stack>
        </form>
    )
}

export default CompanyDetails