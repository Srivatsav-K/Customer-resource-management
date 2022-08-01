import { useMemo, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import moment from 'moment'

//----------------------------------------------------------------------------------------------------

import ContactInfo from './ContactInfo'
import ItemsTable from './ItemsTable'

//----------------------------------------------------------------------------------------------------

import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Button, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material'

//----------------------------------------------------------------------------------------------------

const QuotationForm = (props) => {
    const { handleSubmission, title, date: quoteDate, expiryDate: quoteExpiry, enquiry, client, items: quoteItems } = props


    const [date, setDate] = useState((quoteDate && quoteDate.slice(0, 10)) || moment().format('L'))
    const [expiryDate, setExpiryDate] = useState((quoteExpiry && quoteExpiry.slice(0, 10)) || null)
    const [items, setItems] = useState(quoteItems || [])
    const [gstRate, setGstRate] = useState(5)

    const [user, company, enquiries, clients, products] = useSelector((state) => [state.user.data, state.account.companyDetails, state.enquiries.data, state.clients.data, state.products.data])

    const subTotal = useMemo(() => {
        return items.reduce((prevVal, currentVal) => {
            return prevVal + currentVal.amount
        }, 0)
    }, [items])

    const gstAmount = useMemo(() => {
        return (Number(((gstRate / 100) * subTotal).toFixed(2)))
    }, [subTotal, gstRate])

    const totalAmount = useMemo(() => {
        return subTotal + gstAmount
    }, [subTotal, gstAmount])

    const formik = useFormik({
        initialValues: {
            title: title || '',
            enquiry: enquiry || '',
            client: (client && client._id) || ''
        },
        onSubmit: (formData, { resetForm }) => {
            if (items.length === 0) {
                toast.error('Items cannot be empty')
            } else {
                const data = { ...formData, items, date, expiryDate, gstRate, subTotal, gstAmount, total: totalAmount }
                handleSubmission(data, props.history, resetForm)
            }
        }
    })

    const clientDetails = useMemo(() => {
        return clients.find((ele) => ele._id === formik.values.client)
    }, [clients, formik.values.client])

    const handleDateChange = (e) => {
        setDate(e.format('L'))
    }

    const handleExpiryDateChange = (e) => {
        setExpiryDate(e.format('L'))
    }

    // Table -------------------------------------------------------------------------
    const handleAddLineitem = () => {
        setItems([...items, { product: '', finalPrice: 0, quantity: 1, amount: 0 }])
    }

    const basePrice = (value) => {
        return products.find((product) => product._id === value).basePrice
    }

    const handleChange = (e, index) => {
        const result = items.map((lineItem, i) => {
            if (i === index) {
                const name = e.target.name
                const value = e.target.value
                if (name === 'product') {
                    return {
                        ...lineItem,
                        product: value, finalPrice: basePrice(value),
                        amount: basePrice(value)
                    }
                } else if (name === 'finalPrice') {
                    return {
                        ...lineItem,
                        finalPrice: value,
                        amount: value * lineItem.quantity
                    }
                } else if (name === 'quantity') {
                    return {
                        ...lineItem,
                        quantity: value,
                        amount: value * lineItem.finalPrice
                    }
                } else {
                    return null
                }
            } else {
                return { ...lineItem }
            }
        })
        setItems(result)
    }

    const handleRemove = (index) => {
        const result = items.filter((item, i) => {
            return i !== index
        })
        setItems(result)
    }

    const handleGstRateChange = (e) => {
        setGstRate(e.target.value)
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <Paper>
                <Stack spacing={4} minWidth='50vw' p={6} >

                    {/* Row 1 */}
                    <Stack direction='row' justifyContent='space-between'>
                        {/* enquiry & company info */}
                        <Stack spacing={1}>
                            <TextField
                                name='title'
                                required
                                variant='standard'
                                label='quotation title'
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                error={formik.touched.title && Boolean(formik.errors.title)}
                                helperText={formik.touched.title && formik.errors.title}
                            />
                            <ContactInfo source={company} user={user} />
                        </Stack>

                        <Typography color='GrayText' sx={{ overflowX: 'scroll' }} variant='h3'>Quotation</Typography>
                    </Stack>


                    {/* Row 2 */}
                    <Stack direction='row' justifyContent='space-between'>
                        {/* Client & contact info */}
                        <Stack spacing={2}>
                            <Stack spacing={2} alignItems='center'>
                                <Stack direction='row'>
                                    <Typography gutterBottom p={1}>Enquiry:</Typography>
                                    <TextField
                                        select
                                        required
                                        name='enquiry'
                                        value={formik.values.enquiry}
                                        onChange={formik.handleChange}
                                        variant='standard'
                                        size='small'
                                        error={formik.touched.enquiry && Boolean(formik.errors.enquiry)}
                                        helperText={formik.touched.enquiry && formik.errors.enquiry}
                                        InputProps={{ sx: { width: { xs: '20vw', lg: '10vw' } } }}
                                    >
                                        {enquiries.map((ele) => {
                                            return (
                                                <MenuItem value={ele._id} key={ele._id}> {ele.name} </MenuItem>
                                            )
                                        })}
                                    </TextField>
                                </Stack>

                                <Stack direction='row'>
                                    <Typography gutterBottom p={1} >To: </Typography>

                                    <TextField
                                        select
                                        required
                                        name='client'
                                        value={formik.values.client}
                                        onChange={formik.handleChange}
                                        variant='standard'
                                        size='small'
                                        error={formik.touched.client && Boolean(formik.errors.client)}
                                        helperText={formik.touched.client && formik.errors.client}
                                        InputProps={{ sx: { width: { xs: '20vw', lg: '10vw' } } }}
                                    >
                                        {clients.map((ele) => {
                                            return (
                                                <MenuItem value={ele._id} key={ele._id}> {ele.name} </MenuItem>
                                            )
                                        })}
                                    </TextField>
                                </Stack>

                            </Stack>


                            {clientDetails && <ContactInfo source={clientDetails} />}
                        </Stack>

                        {/* Dates */}
                        <Stack spacing={1} >
                            <DatePicker
                                inputFormat="DD-MM-YYYY"
                                label='Date'
                                value={date}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField size='small' required variant='standard'  {...params} />}
                            />

                            <DatePicker
                                inputFormat="DD-MM-YYYY"
                                label='Expiry date'
                                value={expiryDate}
                                onChange={handleExpiryDateChange}
                                minDate={moment()}
                                renderInput={(params) => <TextField size='small' error={false} required variant='standard'  {...params} />}
                            />
                        </Stack>
                    </Stack>


                    <ItemsTable
                        items={items}
                        handleAddLineitem={handleAddLineitem}
                        products={products}
                        handleChange={handleChange}
                        handleRemove={handleRemove}
                        subTotal={subTotal}
                        gstRate={gstRate}
                        handleGstRateChange={handleGstRateChange}
                        gstAmount={gstAmount}
                        totalAmount={totalAmount}
                    />


                </Stack>

                <Stack alignItems='center' p={3}>
                    <Button type='submit' variant='contained'>Save</Button>
                </Stack>
            </Paper>

        </form >
    )
}

export default withRouter(QuotationForm)