import { useDispatch, useSelector } from 'react-redux';
//--------------------------------------------------------------------------------------
import SignupForm from '../components/SignupForm';
import { startSignup } from '../actions/userActions';
//--------------------------------------------------------------------------------------
import { Stack, Paper, Typography, LinearProgress } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
//--------------------------------------------------------------------------------------

const Signup = (props) => {

    const user = useSelector((state) => {
        return state.user
    })

    const dispatch = useDispatch()

    const handleSubmission = (formData, resetForm, setErrors) => {
        dispatch(startSignup(formData, resetForm, setErrors, props.history, 'initial'))
    }

    return (
        <Stack alignItems='center' p={2}>
            <Paper>
                {user.loading && <LinearProgress />}

                <Stack p={6} spacing={3} alignItems='center'>
                    <AccountCircleIcon fontSize='large' color='primary' />

                    <Typography
                        variant='h5'
                    >
                        Signup
                    </Typography>

                    <SignupForm handleSubmission={handleSubmission} />

                </Stack>
            </Paper>
        </Stack>
    )
}

export default Signup