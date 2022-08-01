import { Container, Grid, Stack, Typography } from "@mui/material"
import { ReactComponent as CRMimage } from "../assets/undraw_cms_re_asu0.svg"

const Home = () => {
    return (
        <Container>
            <Grid container spacing={{ sm: 3 }}>
                <Grid item xs={12} sm={7} >
                    <Stack spacing={2}>
                        <Typography
                            variant='h2'
                            marginTop={{ sm: 18 }}
                        >
                            Manage your contacts efficiently
                        </Typography>

                        <Typography>
                            This CRM tool helps you create, manage, and organize data in a way that drives sales and revenue. You can log sales activities, create tasks, qualify leads, view deals, and more with our multipurpose digital contact book. Say goodbye to clunky spreadsheets and move your business onto a more simple and robust solution.
                        </Typography>
                    </Stack>
                </Grid>

                <Grid item sm={4} p={2}>
                    <CRMimage width="100%" />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Home