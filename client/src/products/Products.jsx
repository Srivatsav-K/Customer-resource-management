import { useMemo, useState } from "react";
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'
//--------------------------------------------------------------------------------------
import ProductListing from "./ProductListing";
//--------------------------------------------------------------------------------------
import { Button, Grid, InputAdornment, MenuItem, Stack, TextField, Typography } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
//--------------------------------------------------------------------------------------

const Products = () => {
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')

    const [products, user] = useSelector((state) => [state.products.data, state.user.data])

    const filteredData = useMemo(() => {
        const result = products.filter((ele) => {
            return (
                ele.title.toLowerCase().includes(search.toLowerCase()) ||
                ele.description.toLowerCase().includes(search.toLowerCase()) ||
                ele.basePrice.toString().includes(search)
            )
        }).sort((a, b) => {
            if (sort === 'a-z') {
                if (a.title < b.title) {
                    return -1
                } else if (a.title > b.title) {
                    return 1
                } else {
                    return 0
                }
            } else if (sort === 'z-a') {

                if (a.title < b.title) {
                    return 1
                } else if (a.title > b.title) {
                    return -1
                } else {
                    return 0
                }
            } else if (sort === 'price - low-high') {
                return a.basePrice - b.basePrice
            } else if (sort === 'price - high-low') {
                return b.basePrice - a.basePrice
            } else {
                return null
            }
        })
        return result
    }, [products, search, sort])

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
        <Grid container spacing={4} direction='column' p={3}>
            <Grid item container justifyContent='space-between'>
                <Typography variant='h3' fontWeight='400' color='primary'>Products - {products.length}</Typography>

                {
                    (user.role && user.role === 'admin') && (
                        <Stack justifyContent='center'>
                            <Button component={Link} to='/user/add-product' variant='contained' size='small' >+ Add Product</Button>
                        </Stack>
                    )
                }
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
                        <MenuItem value='a-z'>a-z</MenuItem>
                        <MenuItem value='z-a'>z-a</MenuItem>
                        <MenuItem value='price - low-high'>price - low-high</MenuItem>
                        <MenuItem value='price - high-low'>price - high-low</MenuItem>
                    </TextField>
                </Grid>
            </Grid>

            {
                (products.length === 0) ? (
                    <Typography color='GrayText' textAlign='center' variant="h5">
                        No Products present
                    </Typography>
                ) : (
                    (filteredData.length > 0) ? (
                        <ProductListing products={filteredData} />
                    ) : (
                        <Typography color='error' p={4} >
                            No results found
                        </Typography>
                    )
                )
            }
        </Grid >
    )
}

export default Products 