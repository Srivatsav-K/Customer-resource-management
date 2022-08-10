import { useCallback } from "react"
import { useSelector } from "react-redux"
//---------------------------------------------------------------------------------------
import { Chart } from 'react-google-charts'
import { Paper, Stack, Typography } from '@mui/material'
//---------------------------------------------------------------------------------------


const OrdersInfo = () => {
    const orders = useSelector((state) => state.orders.data)

    const ordersByStatus = useCallback((orderStatus) => {
        return orders.filter((order) => order.status === orderStatus).length
    }, [orders])

    const ordersByPayment = useCallback((paymentStatus) => {
        return orders.filter((order) => order.paymentStatus === paymentStatus).length
    }, [orders])

    const data = [
        ["Order Status", "Status"],
        ["Placed", ordersByStatus('placed')],
        ["Delivered", ordersByStatus('delivered')],
        ["Cancelled", ordersByStatus('cancelled')],
        ["Payment received", ordersByPayment('received')],
        ["Payment pending", ordersByPayment('pending')],
    ]

    const options = {
        pieSliceText: "label",
        pieHole: 0.4,
        slices: { 0: { color: '#006EFF' }, 1: { color: '#00FF08' }, 2: { color: 'red' }, 3: { color: 'green' }, 4: { color: 'orange' } },
        title: "Orders status",
    };

    return (
        (orders.length === 0) ? (
            <Paper>
                <Stack justifyContent='center' height='50vh'>
                    <Typography textAlign='center'>
                        Create your first order to see details
                    </Typography>
                </Stack>
            </Paper>
        ) : (
            <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height={"50vh"}
            />
        )
    )
}

export default OrdersInfo