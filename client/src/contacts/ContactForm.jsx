import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
//--------------------------------------------------------------------------------------
import { Button, Checkbox, FormControl, FormControlLabel, FormHelperText, Grid, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
//--------------------------------------------------------------------------------------

const ContactForm = (props) => {
    const { handleSubmission, name, email, phone, alternatePhone, designation, website, client, customer } = props

    const clients = useSelector((state) => state.clients.data)

    const gridSplit = 6
    const ITEM_HEIGHT = 30;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 170,
            },
        },
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Contact name is required!')
            .min(3, 'Too short!')
            .trim(),
        email: Yup.string()
            .required('Email is required!')
            .email('Invalid email!')
            .lowercase()
            .trim(),
        phone: Yup.number()
            .required('Phone no is required!'),
        alternatePhone: Yup.number(),
        designation: Yup.string(),
        website: Yup.string()
            .url('Invalid URL!'),
        client: Yup.string()
            .required('Client is required!')
            .lowercase(),
        customer: Yup.boolean()
    })

    const formik = useFormik({
        initialValues: {
            name: name || '',
            email: email || '',
            phone: phone || '',
            alternatePhone: alternatePhone || '',
            designation: designation || '',
            website: website || '',
            client: (client && client._id) || '',
            customer: customer || false
        },
        validationSchema: validationSchema,
        onSubmit: (formData, { resetForm, setErrors }) => {
            handleSubmission(formData, resetForm, setErrors)
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>

            <Grid container rowSpacing={3} p={5} alignItems='center' justifyContent='center' direction={{ xs: 'column', md: 'row' }} >

                <Grid item sm={gridSplit} container justifyContent='center' >
                    <TextField
                        name='name'
                        label='name'
                        size='small'
                        value={formik.values.name} onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                </Grid>

                <Grid item sm={gridSplit} container justifyContent='center'>
                    <TextField
                        name='email'
                        label='email'
                        size='small'
                        value={formik.values.email} onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                </Grid>

                <Grid item sm={gridSplit} container justifyContent='center'>
                    <TextField
                        name='phone'
                        type='number'
                        label='phone'
                        size='small'
                        value={formik.values.phone} onChange={formik.handleChange}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                    />
                </Grid>

                <Grid item sm={gridSplit} container justifyContent='center'>
                    <TextField
                        name='alternatePhone'
                        type='number'
                        label='alternatePhone'
                        size='small'
                        value={formik.values.alternatePhone} onChange={formik.handleChange}
                        error={formik.touched.alternatePhone && Boolean(formik.errors.alternatePhone)}
                        helperText={formik.touched.alternatePhone && formik.errors.alternatePhone}
                    />
                </Grid>

                <Grid item sm={gridSplit} container justifyContent='center'>
                    <TextField
                        name='designation'
                        label='designation'
                        size='small'
                        value={formik.values.designation} onChange={formik.handleChange}
                        error={formik.touched.designation && Boolean(formik.errors.designation)}
                        helperText={formik.touched.designation && formik.errors.designation}
                    />
                </Grid>

                <Grid item sm={gridSplit} container justifyContent='center'>
                    <TextField
                        name='website'
                        label='website'
                        size='small'
                        value={formik.values.website} onChange={formik.handleChange}
                        error={formik.touched.website && Boolean(formik.errors.website)}
                        helperText={formik.touched.website && formik.errors.website}
                    />
                </Grid>

                <Grid item sm={gridSplit} container justifyContent='center'>
                    <FormControl>
                        <InputLabel id="client-label">client</InputLabel>
                        <Select
                            name='client'
                            inputProps={{ sx: { width: 170 } }}
                            labelId="client-label"
                            size='small'
                            value={formik.values.client}
                            onChange={formik.handleChange}
                            input={<OutlinedInput label="client" />}
                            error={formik.touched.client && Boolean(formik.errors.client)}
                            MenuProps={MenuProps}
                        >
                            {clients.map((ele) => {
                                return <MenuItem value={ele._id} key={ele._id} >{ele.name}</MenuItem>
                            })}

                        </Select>
                        {formik.touched.client && Boolean(formik.errors.client) && <FormHelperText error>{formik.errors.client}</FormHelperText>}
                    </FormControl>
                </Grid>

                <Grid item sm={gridSplit} container justifyContent='center'>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name='customer'
                                checked={formik.values.customer}
                                onChange={formik.handleChange}
                            />
                        }
                        label="Customer"
                    />
                </Grid>

                <Grid item sm={gridSplit} container justifyContent='center'>
                    <Button type="submit" variant='contained' > Save </Button>
                </Grid>

            </Grid>

        </form>
    )
}

export default ContactForm