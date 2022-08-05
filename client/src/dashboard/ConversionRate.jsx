import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom';
import uniqBy from 'lodash/uniqBy'
//---------------------------------------------------------------------------------------
import { Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material'
import AutorenewIcon from '@mui/icons-material/Autorenew';
//---------------------------------------------------------------------------------------

const ConversionRate = (props) => {
    const [orders, enquiries] = useSelector((state) => [state.orders.data, state.enquiries.data])

    const conversionRate = useMemo(() => {
        if (enquiries.length === 0) {
            return 0
        } else {
            return (uniqBy(orders, 'enquiry').length / enquiries.length) * 100
        }
    }, [orders, enquiries])

    return (
        <Card elevation={3} >
            <CardActionArea onClick={() => props.history.push('/user/enquiries')}>
                <CardContent>
                    <Stack direction='row' spacing={4} justifyContent='center' alignItems='center'>

                        <AutorenewIcon color='secondary' fontSize='large' />

                        <Stack>
                            <Typography gutterBottom fontWeight={300} textAlign='center'>
                                CONVERSION RATE
                            </Typography>
                            <Typography gutterBottom textAlign='center'>
                                {conversionRate} %
                            </Typography>
                        </Stack>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default withRouter(ConversionRate)