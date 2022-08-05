import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom';
//--------------------------------------------------------------------------------------------------------
import { Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
//--------------------------------------------------------------------------------------------------------

const TotalOrders = (props) => {
    const orders = useSelector((state) => state.orders.data)

    return (
        <Card elevation={3}>
            <CardActionArea onClick={() => props.history.push('/user/orders')}>
                <CardContent >
                    <Stack direction='row' spacing={4} justifyContent='center' alignItems='center'>

                        <ShoppingCartCheckoutIcon color='primary' fontSize='large' />

                        <Stack>
                            <Typography gutterBottom fontWeight={300} textAlign='center'>
                                TOTAL ORDERS
                            </Typography>
                            <Typography gutterBottom textAlign='center'>
                                {orders.length}
                            </Typography>
                        </Stack>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default withRouter(TotalOrders)