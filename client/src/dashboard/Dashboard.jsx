import { useSelector } from "react-redux"
//---------------------------------------------------------------------------------------
import PendingEnquiries from "./PendingEnquiries"
import ConversionRate from "./ConversionRate"
import TotalRevenue from "./TotalRevenue"
import MonthlySales from "./MonthlySales"
import QuickActions from "./QuickActions"
import LeaderBoard from "./LeaderBoard"
import TotalOrders from "./TotalOrders"
import OrdersInfo from "./OrdersInfo"
import TopTasks from "./TopTasks"
//---------------------------------------------------------------------------------------
import { Grid } from "@mui/material"
//---------------------------------------------------------------------------------------

const Dashboard = () => {

    const user = useSelector((state) => state.user.data)

    return (
        <Grid container direction='column' spacing={3}>

            <Grid container item spacing={3} justifyContent='center'>
                <Grid item xs={12} sm={6} md={3} xl={2} >
                    <TotalRevenue />
                </Grid>

                <Grid item xs={12} sm={6} md={3} xl={2} >
                    <TotalOrders />
                </Grid>

                <Grid item xs={12} sm={6} md={3} xl={2}>
                    <PendingEnquiries />
                </Grid>

                <Grid item xs={12} sm={6} md={3} xl={2}>
                    <ConversionRate />
                </Grid>
            </Grid>

            <Grid item container justifyContent='center' spacing={2} >
                <Grid item xs={12} lg={(user.role && user.role === 'admin') ? 8 : 12}>
                    <MonthlySales />
                </Grid>

                {
                    (user.role && user.role === 'admin') && (

                        <Grid item xs={12} lg={4}>
                            <LeaderBoard />
                        </Grid>
                    )
                }
            </Grid>

            <Grid item container spacing={2}>
                <Grid item xs={12} md={6} lg={3} >
                    <TopTasks />
                </Grid>

                <Grid item xs={12} md={6} lg={5} >
                    <OrdersInfo />
                </Grid>

                <Grid item xs={12} lg={4} >
                    <QuickActions />
                </Grid>
            </Grid>
        </Grid>

    )
}

export default Dashboard