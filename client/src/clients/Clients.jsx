import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
//--------------------------------------------------------------------------------------
import TableComponent from '../components/TableComponent'
//--------------------------------------------------------------------------------------
import { Button, Card, CardContent, Grid, InputAdornment, MenuItem, Stack, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
//--------------------------------------------------------------------------------------

const Clients = () => {
    const [clients, user] = useSelector((state) => [state.clients.data, state.user.data])
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')


    const columns = [
        { heading: 'Name', value: 'name' },
        { heading: 'Phone', value: 'phone' },
        { heading: 'Email', value: 'email' },
        { heading: 'Sector', value: 'sector' },
        { heading: 'Website', value: 'website', type: 'url' },
        { heading: 'GST', value: 'gst' },
        { heading: 'Customer', value: 'customer' },
        { heading: 'Address', value: 'address' },
        { heading: 'Created by', value: 'createdBy.username' },
    ]
    //--------------------------------------------------------------------------------------------
    const handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name
        if (name === 'search') {
            setSearch(value)
        } else if (name === 'sort') {
            setSort(value)
        }
    }

    const filteredData = useMemo(() => {
        const result = clients.filter((ele) => {
            return (
                ele.name.toLowerCase().includes(search.toLowerCase()) ||
                ele.email.toLowerCase().includes(search.toLowerCase()) ||
                ele.sector.toLowerCase().includes(search.toLowerCase()) ||
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
    }, [clients, search, sort, user])
    //-----------------------------------------------------------------------------------------------
    const cardData = [
        { title: 'Total Clients', data: clients.length },
        { title: 'Customers', data: clients.filter((ele) => ele.customer).length },
        { title: 'Non Customers', data: clients.filter((ele) => !ele.customer).length }
    ]

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
                <Typography variant='h3' fontWeight='400' color='primary'>Clients</Typography>

                <Stack justifyContent='center'>
                    <Button href='/user/add-client' variant='contained' size='small' >+ Add Client</Button>
                </Stack>
            </Grid>
            {/* --------------------------------------------------------------------------------------- */}
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
                {(clients.length === 0) ? (
                    <Typography color='GrayText' textAlign='center' variant="h5">
                        No Clients present
                    </Typography>
                ) : (
                    <TableComponent data={filteredData} columns={columns} />
                )}
            </Grid>
        </Grid>
    )
}

export default Clients