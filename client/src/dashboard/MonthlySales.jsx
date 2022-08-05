import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns'
//---------------------------------------------------------------------------------------
import { Chart } from 'react-google-charts'
import { Card } from '@mui/material';
//---------------------------------------------------------------------------------------

const MonthlySales = () => {
    const orders = useSelector((state) => state.orders.data)

    const data = useMemo(() => {
        return (
            [
                ["Month", "Sales (₹)", { role: "style" }],
                ['Jan', orders.filter((order) => format(parseISO(order.date), 'MMM') === 'Jan').reduce((p, c) => p + c.total, 0), "red"],
                ['Feb', orders.filter((order) => format(parseISO(order.date), 'MMM') === 'Feb').reduce((p, c) => p + c.total, 0), "blue"],
                ['Mar', orders.filter((order) => format(parseISO(order.date), 'MMM') === 'Mar').reduce((p, c) => p + c.total, 0), "violet"],
                ['Apr', orders.filter((order) => format(parseISO(order.date), 'MMM') === 'Apr').reduce((p, c) => p + c.total, 0), "yellow"],
                ['May', orders.filter((order) => format(parseISO(order.date), 'MMM') === 'May').reduce((p, c) => p + c.total, 0), "violet"],
                ['June', orders.filter((order) => format(parseISO(order.date), 'MMM') === 'Jun').reduce((p, c) => p + c.total, 0), "magenta"],
                ['July', orders.filter((order) => format(parseISO(order.date), 'MMM') === 'Jul').reduce((p, c) => p + c.total, 0), "green"],
                ['Aug', orders.filter((order) => format(parseISO(order.date), 'MMM') === 'Aug').reduce((p, c) => p + c.total, 0), "orange"],
                ['Sept', orders.filter((order) => format(parseISO(order.date), 'MMM') === 'Sept').reduce((p, c) => p + c.total, 0), "maroon"],
                ['Oct', orders.filter((order) => format(parseISO(order.date), 'MMM') === 'Oct').reduce((p, c) => p + c.total, 0), "darkBlue"],
                ['Nov', orders.filter((order) => format(parseISO(order.date), 'MMM') === 'Nov').reduce((p, c) => p + c.total, 0), "coral"],
                ['Dec', orders.filter((order) => format(parseISO(order.date), 'MMM') === 'Dec').reduce((p, c) => p + c.total, 0), "default"]
            ]
        )
    }, [orders])

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