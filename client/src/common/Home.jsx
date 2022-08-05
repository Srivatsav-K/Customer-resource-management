import { Container, Grid, Stack, Typography } from "@mui/material"
import { ReactComponent as CRMimage } from "../assets/undraw_cms_re_asu0.svg"

const Home = () => {
    return (
        <Container>
            <Grid container direction='column'>
                <Grid item container spacing={{ sm: 3 }}>
                    <Grid item xs={12} sm={7} >
                        <Stack spacing={2}>
                            <Typography
                                variant='h2'
                                marginTop={{ sm: 18 }}
                            >
                                Manage your contacts efficiently
                            </Typography>

                            <Typography>
                                This CRM tool helps you create, manage, and organize data in a way that drives sales and revenue. You can log sales activities, create tasks, view deals, create multiple employee accounts and more with our multipurpose digital contact book. Say goodbye to clunky spreadsheets and move your business onto a more simple and robust solution.
                            </Typography>

                            <Typography>
                                This CRM tool also features interactive dashboards and a built in calculator for increased productivity.
                            </Typography>
                        </Stack>
                    </Grid>

                    <Grid item sm={4} p={2}>
                        <CRMimage width="100%" />
                    </Grid>
                </Grid>

                <Grid item container justifyContent='center'>
                    <Typography variant="caption" color='orange' >
                        Note: This tool is initially built for a single organization therefore sign up option appears only if the db is empty. A future update will support multiple orgs.
                    </Typography>
                </Grid>
            </Grid>

        </Container>
    )
}

export default Home