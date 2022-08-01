import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import uniqBy from 'lodash/uniqBy'
//--------------------------------------------------------------------------------------
import { Button, Checkbox, FormControl, FormControlLabel, FormHelperText, Grid, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
//--------------------------------------------------------------------------------------

const ClientForm = (props) => {
    const { handleSubmission, name, email, phone, website, sector, gst, address, customer } = props

    const [createSector, setCreateSector] = useState(false)

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

    const toggleCreateSector = () => {
        setCreateSector(!createSector)
    }

    const initialValues = {
        name: name || '',
        email: email || '',
        phone: phone || '',
        website: website || '',
        sector: sector || '',
        gst: gst || '',
        address: address || '',
        customer: customer || false
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Client name is required!')
            .min(3, 'Too short!')
            .trim(),
        email: Yup.string()
            .required('Email is required!')
            .email('Invalid email!')
            .lowercase()
            .trim(),
        phone: Yup.number()
            .required('Phone no is required!'),
        website: Yup.string()
            .url('Invalid URL!'),
        sector: Yup.string()
            .required('Sector is required!')
            .lowercase(),
        gst: Yup.string(),
        address: Yup.string(),
        customer: Yup.boolean()
    })

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (formData, { setErrors, resetForm }) => {
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
                        name='website'
                        label='website'
                        size='small'
                        value={formik.values.website} onChange={formik.handleChange}
                        error={formik.touched.website && Boolean(formik.errors.website)}
                        helperText={formik.touched.website && formik.errors.website}
                    />
                </Grid>

                <Grid item sm={gridSplit} container direction='column' alignItems='center'>
                    <Grid item>
                        {(createSector) ? (

                            <TextField
                                name='sector'
                                label='sector'
                                size='small'
                                value={formik.values.sector} onChange={formik.handleChange}
                                error={formik.touched.sector && Boolean(formik.errors.sector)}
                                helperText={formik.touched.sector && formik.errors.sector}
                            />

                        ) : (

                            <FormControl>
                                <InputLabel id="sector-label">Sector</InputLabel>
                                <Select
                                    name='sector'
                                    inputProps={{ sx: { width: 170 } }}
                                    labelId="sector-label"
                                    size='small'
                                    value={formik.values.sector}
                                    onChange={formik.handleChange}
                                    input={<OutlinedInput label="sector" />}
                                    error={formik.touched.sector && Boolean(formik.errors.sector)}
                                    MenuProps={MenuProps}
                                >
                                    {uniqBy(clients, 'sector').map((ele, i) => {
                                        return <MenuItem key={i} value={ele.sector} >{ele.sector}</MenuItem>
                                    })}

                                </Select>
                                {formik.touched.sector && Boolean(formik.errors.sector) && <FormHelperText error>{formik.errors.sector}</FormHelperText>}
                            </FormControl>
                        )}
                    </Grid>

                    <Grid item>
                        <Button size='small' type='button' onClick={toggleCreateSector}>{(createSector) ? 'Select from list' : 'Add new sector'}</Button>

                    </Grid>
                </Grid>


                <Grid item sm={gridSplit} container justifyContent='center'>
                    <TextField
                        name='gst'
                        label='gst'
                        size='small'
                        value={formik.values.gst} onChange={formik.handleChange}
                        error={formik.touched.gst && Boolean(formik.errors.gst)}
                        helperText={formik.touched.gst && formik.errors.gst}
                    />
                </Grid>

                <Grid item sm={gridSplit} container justifyContent='center'>
                    <TextField
                        name='address'
                        label='address'
                        multiline
                        rows={3}
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        error={formik.touched.address && Boolean(formik.errors.address)}
                        helperText={formik.touched.address && formik.errors.address}
                    />
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

export default ClientForm