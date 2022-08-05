import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, TextField, MenuItem, Box, InputAdornment, IconButton } from '@mui/material'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';


const ItemsTable = (props) => {
    const {
        items,
        handleAddLineitem,
        products,
        handleChange,
        handleRemove,
        subTotal,
        gstRate,
        handleGstRateChange,
        gstAmount,
        totalAmount
    } = props

    return (
        <Box>
            <Button type='button' size='small' onClick={handleAddLineitem}>Add line item</Button>

            <TableContainer component={Paper}>

                <Table >
                    <TableHead>
                        <TableRow sx={{ backgroundColor: 'primary.light' }}>
                            <TableCell sx={{ color: 'white' }} align='left'>S.No</TableCell>
                            <TableCell sx={{ color: 'white' }}>Product</TableCell>
                            <TableCell sx={{ color: 'white' }} align='right'>Quantity</TableCell>
                            <TableCell sx={{ color: 'white' }} align='right'>Unit Price</TableCell>
                            <TableCell sx={{ color: 'white' }} align='right'>Amount</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>

                        {items.map((ele, i) => {
                            return (
                                <TableRow key={i}>


                                    <TableCell>
                                        <IconButton type='button' size='small' onClick={() => handleRemove(i)}>
                                            <RemoveCircleIcon color='error' />
                                        </IconButton>

                                        {i + 1}
                                    </TableCell>

                                    <TableCell>
                                        <TextField
                                            label='Product'
                                            required
                                            name='product'
                                            value={ele.product}
                                            onChange={(e) => handleChange(e, i)}
                                            select
                                            variant='standard'
                                            fullWidth
                                        >
                                            {products.map((product) => {
                                                return (
                                                    (product._id) ? (
                                                        <MenuItem value={product._id} key={product._id}> {product.title} </MenuItem>
                                                    ) : (
                                                        <MenuItem value='Deleted'>Deleted</MenuItem>
                                                    )
                                                )
                                            })}
                                        </TextField>
                                    </TableCell>

                                    <TableCell align='right'>
                                        <TextField
                                            required
                                            name='quantity'
                                            type='number'
                                            value={ele.quantity}
                                            onChange={(e) => handleChange(e, i)}
                                            variant='standard'
                                            size='small'
                                            InputProps={{ sx: { maxWidth: '50px' }, inputProps: { min: 1 } }}
                                        />
                                    </TableCell>

                                    <TableCell align='right'>
                                        <TextField
                                            required
                                            name='finalPrice'
                                            type='number'
                                            value={ele.finalPrice}
                                            onChange={(e) => handleChange(e, i)}
                                            variant='standard'
                                            size='small'
                                            InputProps={{
                                                sx: {
                                                    maxWidth: '100px',
                                                },
                                                inputProps: { min: 0 },
                                                startAdornment: (
                                                    <InputAdornment position='start'>
                                                        ₹
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </TableCell>

                                    <TableCell align='right'>
                                        <TextField
                                            required
                                            name='amount'
                                            type='number'
                                            value={ele.amount}
                                            readOnly
                                            variant='standard'
                                            size='small'
                                            InputProps={{
                                                sx: {
                                                    maxWidth: '100px'
                                                },
                                                inputProps: { min: 0 },
                                                startAdornment: (
                                                    <InputAdornment position='start'>
                                                        ₹
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            )
                        })}

                        <TableRow>

                            <TableCell rowSpan={3} colSpan={2} />

                            <TableCell colSpan={2}>Subtotal</TableCell>

                            <TableCell align='center'>₹ {subTotal}</TableCell>

                        </TableRow>

                        <TableRow>
                            <TableCell>GST</TableCell>

                            <TableCell align='center'>
                                <TextField size='small'
                                    required
                                    type='number'
                                    value={gstRate}
                                    onChange={handleGstRateChange}
                                    variant='standard'
                                    InputProps={{
                                        sx: {
                                            maxWidth: '55px'
                                        },
                                        inputProps: { min: 0 },
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                %
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </TableCell>

                            <TableCell align='center'>₹ {gstAmount}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>

                            <TableCell align="center">₹ {totalAmount}</TableCell>
                        </TableRow>

                    </TableBody>

                </Table>

            </TableContainer>
        </Box>
    )
}

export default ItemsTable