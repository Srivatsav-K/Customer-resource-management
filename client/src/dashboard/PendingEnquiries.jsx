import { useMemo } from 'react';
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
//---------------------------------------------------------------------------------------
import { Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material'
import PendingIcon from '@mui/icons-material/Pending';
//---------------------------------------------------------------------------------------

const PendingEnquiries = (props) => {
    const enquiries = useSelector((state) => state.enquiries.data)

    const pendingEnquiries = useMemo(() => {
        return enquiries.filter((ele) => {
            return ele.status === 'inprocess'
        })
    }, [enquiries])

    return (
        <Card elevation={3}>
            <CardActionArea onClick={() => props.history.push('/user/enquiries')}>
                <CardContent>
                    <Stack direction='row' spacing={4} justifyContent='center' alignItems='center'>

                        <PendingIcon color='warning' fontSize='large' />

                        <Stack>
                            <Typography gutterBottom fontWeight={300} textAlign='center'>
                                PENDING ENQUIRIES
                            </Typography>
                            <Typography gutterBottom textAlign='center'>
                                {pendingEnquiries.length} out of {enquiries.length}
                            </Typography>
                        </Stack>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default withRouter(PendingEnquiries)