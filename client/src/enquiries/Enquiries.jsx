import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
//--------------------------------------------------------------------------------------
import TableComponent from '../components/TableComponent'
//--------------------------------------------------------------------------------------
import { Button, Grid, InputAdornment, MenuItem, Stack, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
//--------------------------------------------------------------------------------------

const Enquiries = () => {
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')

    const enquiries = useSelector((state) => state.enquiries.data)

    const columns = [
        { heading: 'Name', value: 'name' },
        { heading: 'Contact name', value: 'contact.name' },
        { heading: 'Phone', value: 'contact.phone' },
        { heading: 'Requirements', value: 'requirements', type: 'show' },
        { heading: 'Budget', value: 'budget' },
        { heading: 'Competitors', value: 'competitors' },
        { heading: 'Timelines', value: 'estimatedTimelines' },
        { heading: 'Closing Date', value: 'expectedClosingDate', type: 'date' },
        { heading: 'Comments', value: 'comments', type: 'array' },
    ]

    const filteredData = useMemo(() => {
        const result = enquiries.filter((ele) => {
            return (
                ele.name.toLowerCase().includes(search.toLowerCase()) ||
                ele.contact.name.toLowerCase().includes(search.toLowerCase()) ||
                ele.contact.phone.toLowerCase().includes(search.toLowerCase()) ||
                ele.requirements.toLowerCase().includes(search.toLowerCase()) ||
                ele.competitors.toLowerCase().includes(search.toLowerCase()) ||
                ele.estimatedTimelines.toLowerCase().includes(search.toLowerCase()) ||
                ele.budget.toString().includes(search)
            )
        }).sort((a, b) => {
            if (sort === 'Budget - low-high') {
                return a.budget - b.budget
            } else if (sort === 'Budget - high-low') {
                return b.budget - a.budget
            } else {
                return null
            }
        })
        return result
    }, [enquiries, search, sort])

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

            <Grid item container justifyContent='space-between'>
                <Typography variant='h3' fontWeight='400' color='primary'>Enquiries - {enquiries.length}</Typography>

                <Stack justifyContent='center'>
                    <Button component={Link} to='/user/new-enquiry' variant='contained' size='small' >+ New enquiry</Button>
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
                        <MenuItem value='Budget - low-high'>Budget - low-high</MenuItem>
                        <MenuItem value='Budget - high-low'>Budget - high-low</MenuItem>
                    </TextField>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                {(enquiries.length === 0) ? (
                    <Typography color='GrayText' textAlign='center' variant="h5">
                        No Enquiries present
                    </Typography>
                ) : (
                    <TableComponent data={filteredData} columns={columns} />
                )}
            </Grid>
        </Grid>
    )
}

export default Enquiries