import { useMemo } from "react"
import { useSelector } from "react-redux"
//---------------------------------------------------------------------------------------
import { Chart } from 'react-google-charts'
import { Paper, Stack, Typography } from '@mui/material'
//---------------------------------------------------------------------------------------


const OrdersInfo = () => {
    const orders = useSelector((state) => state.orders.data)

    const data = useMemo(() => {
        return (
            [
                ["Order Status", "Status"],
                ["Placed", orders.filter((order) => order.status === 'placed').length],
                ["Delivered", orders.filter((order) => order.status === 'delivered').length],
                ["Cancelled", orders.filter((order) => order.status === 'cancelled').length],
                ["Payment received", orders.filter((order) => order.paymentStatus === 'received').length],
                ["Payment pending", orders.filter((order) => order.paymentStatus === 'pending').length],
            ]
        )
    }, [orders])

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