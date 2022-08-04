import { useMemo, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
//----------------------------------------------------------------------------------------------------
import ContactInfo from '../components/ContactInfo'
import ItemsTable from '../components/ItemsTable'
import DropDown from '../components/DropDown'
//----------------------------------------------------------------------------------------------------
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Button, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material'
//----------------------------------------------------------------------------------------------------

const OrderForm = (props) => {
    const {
        handleSubmission,
        title,
        enquiry,
        client,
        contact,
        status,
        paymentStatus,
        date: quoteDate,
        expiryDate: quoteExpiry,
        expectedDeliveryDate: orderDeliveryDate,
        items: quoteItems
    } = props


    const [date, setDate] = useState(quoteDate || Date.now())
    const [expiryDate, setExpiryDate] = useState(quoteExpiry || null)
    const [expectedDeliveryDate, setExpectedDeliveryDate] = useState(orderDeliveryDate || null)
    const [items, setItems] = useState(quoteItems || [])
    const [gstRate, setGstRate] = useState(5)

    const [user, company, enquiries, clients, contacts, products] = useSelector((state) => [
        state.user.data,
        state.account.companyDetails,
        state.enquiries.data,
        state.clients.data,
        state.contacts.data,
        state.products.data
    ])

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
            contact: (contact && contact._id) || '',
            client: (client && client._id) || '',
            status: status || 'placed',
            paymentStatus: paymentStatus || 'pending'
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

    const contactDetails = useMemo(() => {
        return contacts.find((ele) => ele._id === formik.values.contact)
    }, [contacts, formik.values.contact])

    const clientDetails = useMemo(() => {
        return clients.find((ele) => ele._id === formik.values.client)
    }, [clients, formik.values.client])

    const handleDateChange = (e) => {
        setDate(e)
    }
    const handleExpiryDateChange = (e) => {
        setExpiryDate(e)
    }
    const handleDeliveryDateChange = (e) => {
        setExpectedDeliveryDate(e)
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
                                label='order title'
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                error={formik.touched.title && Boolean(formik.errors.title)}
                                helperText={formik.touched.title && formik.errors.title}
                            />
                            <ContactInfo source={company} user={user} />
                        </Stack>

                        <Typography color='GrayText' variant='h3'>Order</Typography>
                    </Stack>


                    {/* Row 2 */}
                    <Stack direction='row' justifyContent='space-between'>
                        {/* Client & contact info */}
                        <Stack spacing={2}>
                            <DropDown
                                name='enquiry'
                                label='Enquiry'
                                size='small'
                                value={formik.values.enquiry}
                                onChange={formik.handleChange}
                                error={formik.touched.enquiry && Boolean(formik.errors.enquiry)}
                                helperText={formik.touched.enquiry && formik.errors.enquiry}
                                required
                            >
                                {enquiries.map((ele) => {
                                    return (
                                        <MenuItem value={ele._id} key={ele._id}> {ele.name} </MenuItem>
                                    )
                                })}
                            </DropDown>

                            <DropDown
                                name='contact'
                                label='Contact'
                                size='small'
                                value={formik.values.contact}
                                onChange={formik.handleChange}
                                error={formik.touched.contact && Boolean(formik.errors.contact)}
                                required
                            >
                                {contacts.map((ele) => {
                                    return (
                                        <MenuItem value={ele._id} key={ele._id}> {ele.name} </MenuItem>
                                    )
                                })}
                            </DropDown>

                            <DropDown
                                required
                                label='Client'
                                name='client'
                                size='small'
                                value={formik.values.client}
                                onChange={formik.handleChange}
                                error={formik.touched.client && Boolean(formik.errors.client)}
                                helperText={formik.touched.client && formik.errors.client}
                            >
                                {clients.map((ele) => {
                                    return (
                                        <MenuItem value={ele._id} key={ele._id}> {ele.name} </MenuItem>
                                    )
                                })}
                            </DropDown>

                            <Stack>
                                {contactDetails && <ContactInfo source={{ name: contactDetails.name }} />}
                                {clientDetails && <ContactInfo source={clientDetails} />}
                            </Stack>
                        </Stack>

                        {/* Dates & status */}
                        <Stack spacing={1} >
                            <DatePicker
                                inputFormat="dd-MM-yyyy"
                                label='Date'
                                value={date}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField size='small' required variant='standard'  {...params} />}
                            />

                            <DatePicker
                                inputFormat="dd-MM-yyyy"
                                label='Expiry date'
                                value={expiryDate}
                                onChange={handleExpiryDateChange}
                                minDate={Date.now()}
                                renderInput={(params) => <TextField size='small' error={false} required variant='standard'  {...params} />}
                            />

                            <DatePicker
                                inputFormat="dd-MM-yyyy"
                                label='Delivery date'
                                value={expectedDeliveryDate}
                                onChange={handleDeliveryDateChange}
                                minDate={Date.now()}
                                renderInput={(params) => <TextField size='small' error={false} required variant='standard'  {...params} />}
                            />

                            <TextField
                                name='status'
                                label='order status'
                                select
                                size='small'
                                variant='standard'
                                value={formik.values.status}
                                onChange={formik.handleChange}
                                required
                                error={formik.touched.status && Boolean(formik.errors.status)}
                                helperText={formik.touched.status && formik.errors.status}
                            >
                                <MenuItem value='placed'>placed</MenuItem>
                                <MenuItem value='delivered'>delivered</MenuItem>
                                <MenuItem value='cancelled'>cancelled</MenuItem>
                            </TextField>

                            <TextField
                                name='paymentStatus'
                                label='payment status'
                                select
                                size='small'
                                variant='standard'
                                value={formik.values.paymentStatus}
                                onChange={formik.handleChange}
                                required
                                error={formik.touched.paymentStatus && Boolean(formik.errors.paymentStatus)}
                                helperText={formik.touched.paymentStatus && formik.errors.paymentStatus}
                            >
                                <MenuItem value='pending'>pending</MenuItem>
                                <MenuItem value='received'>received</MenuItem>
                            </TextField>

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

export default withRouter(OrderForm)