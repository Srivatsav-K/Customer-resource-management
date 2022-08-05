import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom';
//--------------------------------------------------------------------------------------------------------
import { Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material'
import PaymentsIcon from '@mui/icons-material/Payments';
//--------------------------------------------------------------------------------------------------------

const TotalRevenue = (props) => {
    const orders = useSelector((state) => state.orders.data)

    const totalRevenue = useMemo(() => {
        return (
            orders.filter((ele) => {
                return ele.paymentStatus === 'received'
            }).reduce((prevVal, currentVal) => {
                return prevVal + currentVal.total
            }, 0)
        )
    }, [orders])

    return (
        <Card elevation={3}>
            <CardActionArea onClick={() => props.history.push('/user/orders')}>
                <CardContent>
                    <Stack direction='row' spacing={4} justifyContent='center' alignItems='center'>

                        <PaymentsIcon htmlColor='green' fontSize='large' />

                        <Stack>
                            <Typography gutterBottom fontWeight={300} textAlign='center'>
                                TOTAL REVENUE
                            </Typography>
                            <Typography gutterBottom textAlign='center'>
                                ₹{totalRevenue}
                            </Typography>
                        </Stack>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default withRouter(TotalRevenue)