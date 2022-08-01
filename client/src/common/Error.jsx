import { Button, Stack, Typography } from "@mui/material"
import { ReactComponent as Error404 } from "../assets/illustration_404.svg"


const Error = (props) => {
    const redirectToHome = () => {
        props.history.push('/')
    }

    return (
        <Stack alignItems='center' spacing={7}>
            <Stack alignItems='center'>
                <Typography p={2} sx={{ typography: { xs: 'h4', sm: 'h3' } }} >
                    Sorry, page not found!
                </Typography>

                <Typography p={2} sx={{ color: 'text.secondary' }}>
                    Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
                    sure to check your spelling.
                </Typography>
            </Stack>

            <Error404 width='50%' height='30vh' />

            <Button size="large" variant="contained" onClick={redirectToHome}>
                go to home
            </Button>

        </Stack >
    )
}

export default Error