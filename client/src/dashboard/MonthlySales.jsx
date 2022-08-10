import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns'
//---------------------------------------------------------------------------------------
import { Chart } from 'react-google-charts'
import { Card } from '@mui/material';
//---------------------------------------------------------------------------------------

const MonthlySales = () => {
    const orders = useSelector((state) => state.orders.data)

    const getSales = useCallback((month) => {
        const result = orders.filter((order) => {
            return order.paymentStatus === 'received' && format(parseISO(order.date), 'MMM') === month
        }).reduce((p, c) => p + c.total, 0)

        return result
    }, [orders])

    const data = [
        ["Month", "Sales (₹)", { role: "style" }],
        ['Jan', getSales('Jan'), "red"],
        ['Feb', getSales('Feb'), "blue"],
        ['Mar', getSales('Mar'), "violet"],
        ['Apr', getSales('Apr'), "yellow"],
        ['May', getSales('May'), "violet"],
        ['June', getSales('Jun'), "magenta"],
        ['July', getSales('Jul'), "green"],
        ['Aug', getSales('Aug'), "orange"],
        ['Sept', getSales('Sep'), "maroon"],
        ['Oct', getSales('Oct'), "darkBlue"],
        ['Nov', getSales('Nov'), "coral"],
        ['Dec', getSales('Dec'), "default"]
    ]


    const options = {
        vAxis: { title: "Sales (₹)" },
        hAxis: { title: "Month" },
        legend: { position: 'none' }
    };

    return (
        <Card elevation={3}>
            <Chart chartType="ColumnChart" width="100%" height='50vh' data={data} options={options} />
        </Card>
    )
}

export default MonthlySales