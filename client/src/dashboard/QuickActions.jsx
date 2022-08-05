import { withRouter } from 'react-router-dom'
//---------------------------------------------------------------------------------------
import { Card, CardActionArea, CardContent, Paper, Stack, Typography } from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import ContactsIcon from '@mui/icons-material/Contacts';
//---------------------------------------------------------------------------------------

const QuickActions = (props) => {

    return (
        <Paper elevation={3}>
            <Typography gutterBottom fontWeight={300} textAlign='center'>
                QUICK ACTIONS
            </Typography>
            <Stack p={2} spacing={3}>
                <Card>
                    <CardActionArea onClick={() => props.history.push('/user/new-quotation')}>
                        <CardContent>
                            <Stack direction='row' spacing={4} justifyContent='center' alignItems='center'>
                                <ReceiptIcon color='warning' fontSize='large' />
                                <Stack>
                                    <Typography gutterBottom fontWeight={300} textAlign='center'>
                                        NEW QUOTATION
                                    </Typography>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </CardActionArea>
                </Card>

                <Card>
                    <CardActionArea onClick={() => props.history.push('/user/new-order')}>
                        <CardContent>
                            <Stack direction='row' spacing={4} justifyContent='center' alignItems='center'>
                                <RequestQuoteIcon htmlColor='green' fontSize='large' />
                                <Stack>
                                    <Typography gutterBottom fontWeight={300} textAlign='center'>
                                        NEW ORDER
                                    </Typography>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </CardActionArea>
                </Card>

                <Card>
                    <CardActionArea onClick={() => props.history.push('/user/add-client')}>
                        <CardContent>
                            <Stack direction='row' spacing={4} justifyContent='center' alignItems='center'>
                                <ContactsIcon color='primary' fontSize='large' />
                                <Stack>
                                    <Typography gutterBottom fontWeight={300} textAlign='center'>
                                        NEW CLIENT
                                    </Typography>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Stack>
        </Paper>

    )
}

export default withRouter(QuickActions)