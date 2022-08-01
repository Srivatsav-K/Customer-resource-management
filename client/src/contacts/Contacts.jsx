import { useMemo, useState } from "react"
import { useSelector } from "react-redux"
//--------------------------------------------------------------------------------------
import TableComponent from "../components/TableComponent"
//--------------------------------------------------------------------------------------
import { Button, Card, CardContent, Grid, InputAdornment, MenuItem, Stack, TextField, Typography } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
//--------------------------------------------------------------------------------------

const Contacts = () => {
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')

    const [contacts, user] = useSelector((state) => [state.contacts.data, state.user.data])

    const columns = [
        { heading: 'Name', value: 'name' },
        { heading: 'Phone', value: 'phone' },
        { heading: 'Email', value: 'email' },
        { heading: 'Designation', value: 'designation' },
        { heading: 'Website', value: 'website', type: 'url' },
        { heading: 'Client', value: 'client.name' },
        { heading: 'CreatedBy', value: 'createdBy.username' }
    ]

    const cardData = [
        { title: 'Total Contacts', data: contacts.length },
        { title: 'Customers', data: contacts.filter((ele) => ele.customer).length },
        { title: 'Non Customers', data: contacts.filter((ele) => !ele.customer).length }
    ]

    const filteredData = useMemo(() => {
        const result = contacts.filter((ele) => {
            return (
                ele.name.toLowerCase().includes(search.toLowerCase()) ||
                ele.email.toLowerCase().includes(search.toLowerCase()) ||
                ele.designation.toLowerCase().includes(search.toLowerCase()) ||
                ele.client.name.toLowerCase().includes(search.toLowerCase()) ||
                ele.phone.includes(search)
            )
        }).filter((ele) => {
            if (sort === 'customer') {
                return ele.customer
            } else if (sort === 'created by me') {
                return ele.createdBy._id === user._id
            } else {
                return ele
            }
        })
        return result
    }, [contacts, search, sort, user])

    const handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name
        if (name === 'search') {
            setSearch(value)
        } else if (name === 'sort') {
            setSort(value)
        }
    }


    return (


        <Grid container spacing={3}>

            <Grid item xs={12} container justifyContent='space-around' spacing={2} >
                {cardData.map((ele, i) => {
                    return (
                        <Grid item xs={12} md={cardData.length} key={i} >
                            <Card sx={{ color: 'rgb(4, 41, 122)' }}>
                                <CardContent>
                                    <Typography
                                        variant='h5'
                                        fontWeight={900}
                                        textAlign='center'
                                    >
                                        {ele.data}
                                    </Typography>
                                    <Typography
                                        variant='subtitle1'
                                        textAlign='center'
                                    >
                                        {ele.title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>

            <Grid item container justifyContent='space-between'>
                <Typography variant='h3' fontWeight='400' color='primary'>Contacts</Typography>

                <Stack justifyContent='center'>
                    <Button href='/user/add-contact' variant='contained' size='small' >+ Add Contact</Button>
                </Stack>
            </Grid>

            <Grid item container spacing={2}>
                <Grid item xs={12} sm={9} >
                    <TextField
                        type="text"
                        name='search'
                        value={search}
                        onChange={handleChange}
                        placeholder='Search '
                        size='small'
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <TextField
                        name='sort'
                        select
                        value={sort}
                        onChange={handleChange}
                        label='Sort by'
                        fullWidth
                        size='small'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <SortIcon />
                                </InputAdornment>
                            )
                        }}
                    >
                        <MenuItem value='' >Default</MenuItem>
                        <MenuItem value="customer">Customer</MenuItem>
                        <MenuItem value="created by me">Created By me</MenuItem>
                    </TextField>
                </Grid>
            </Grid>
            {/* --------------------------------------------------------------------------------------- */}

            <Grid item xs={12}>
                <TableComponent data={filteredData} columns={columns} />
            </Grid>
        </Grid>

    )
}

export default Contacts