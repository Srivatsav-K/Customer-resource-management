import { useMemo } from 'react'
import { useSelector } from 'react-redux'
//---------------------------------------------------------------------------------------
import { Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
//---------------------------------------------------------------------------------------

const LeaderBoard = () => {
    const orders = useSelector((state) => state.orders.data)

    const sortBySales = useMemo(() => {
        return orders.filter((order) => order.paymentStatus === 'received').sort((a, b) => b.total - a.total)
    }, [orders])

    return (
        (orders.length === 0) ? (
            <Paper>
                <Stack justifyContent='center' height='50vh'>
                    <Typography textAlign='center'>
                        Create your first order to see top sales
                    </Typography>
                </Stack>
            </Paper>
        ) : (
            <TableContainer component={Paper} sx={{ height: '50vh' }}>

                <Table  >
                    <TableHead>
                        <TableRow sx={{ backgroundColor: 'yellow' }}>
                            <TableCell >
                                S.No
                            </TableCell>
                            <TableCell >
                                Name
                            </TableCell>
                            <TableCell >
                                Amount
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {sortBySales.map((sale, i) => {
                            return (
                                <TableRow key={sale._id}>
                                    <TableCell>{i + 1}</TableCell>
                                    <TableCell>{sale.user.username}</TableCell>
                                    <TableCell>₹ {sale.total}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        )

    )
}

export default LeaderBoard