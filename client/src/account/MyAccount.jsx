import { useFormik } from 'formik'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
//--------------------------------------------------------------------------------------
import { startChangePassword, startUpdateAccDetails } from '../actions/userActions'
//--------------------------------------------------------------------------------------
import { Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, Stack, TextField } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
//--------------------------------------------------------------------------------------

const MyAccount = (props) => {
    const { username, email } = props

    const [open, setOpen] = useState(false)
    const [visible, setVisible] = useState(false)


    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            username: username || '',
            email: email || '',
        },
        onSubmit: (formData, { setErrors }) => {
            dispatch(startUpdateAccDetails(formData, setErrors))
        }
    })

    //*****************************forgot password***********************************************************************

    //validation
    const lowercaseRegex = /(?=.*[a-z])/
    const uppercaseRegex = /(?=.*[A-Z])/
    const numericRegex = /(?=.*[0-9])/
    const specialCharacterRegex = /(?=.*[*.!@$%^&_-])/

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password is required!'),
        newPassword: Yup.string()
            .required('Password is required!')
            .matches(lowercaseRegex, 'one lowercase required!')
            .matches(uppercaseRegex, 'one uppercase required!')
            .min(8, 'Too short!')
            .max(128, 'Too long!')
            .matches(numericRegex, 'one number required!')
            .matches(specialCharacterRegex, 'one special character required!')
            .trim(),
    })

    const handleDialogClose = () => {
        setOpen(false)
    }

    const formikPassword = useFormik({
        initialValues: {
            password: '',
            newPassword: ''
        },
        validationSchema: validationSchema,
        onSubmit: (formData, { setErrors }) => {
            dispatch(startChangePassword(formData, setErrors, handleDialogClose))
        }

    })

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const handleDialogOpen = () => {
        setOpen(true)
    }

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Grid container alignItems='center' p={3} spacing={3} direction='column'>
                    <Grid item>
                        <TextField
                            name='username'
                            label='username'
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            name='email'
                            label='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </Grid>

                    <Grid item>
                        <Button variant='contained' type='submit' >
                            Save
                        </Button>
                    </Grid>

                </Grid>
            </form>

            <Stack alignItems='center'>
                <Grid item>
                    <Button type='button' onClick={handleDialogOpen} >
                        Change password
                    </Button>
                </Grid>
            </Stack>

            <Dialog open={open} onClose={handleDialogClose} >
                <DialogTitle textAlign='center' gutterBottom>
                    Change Password
                </DialogTitle>

                <DialogContent >
                    <form onSubmit={formikPassword.handleSubmit}>
                        <Stack spacing={3}>
                            <TextField
                                sx={{ mt: 2 }}
                                name='password'
                                label='Current password'
                                value={formikPassword.values.password}
                                onChange={formikPassword.handleChange}
                                error={formikPassword.touched.password && Boolean(formikPassword.errors.password)}
                                helperText={formikPassword.touched.password && formikPassword.errors.password}
                                type={visible ? 'text' : 'password'}
                                InputProps={
                                    {
                                        endAdornment: (
                                            <IconButton onClick={toggleVisibility}>
                                                {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        )
                                    }
                                }
                            />
                            <TextField
                                name='newPassword'
                                label='New Password'
                                value={formikPassword.values.newPassword}
                                onChange={formikPassword.handleChange}
                                error={formikPassword.touched.newPassword && Boolean(formikPassword.errors.newPassword)}
                                helperText={formikPassword.touched.newPassword && formikPassword.errors.newPassword}
                                type={visible ? 'text' : 'password'}
                                InputProps={
                                    {
                                        endAdornment: (
                                            <IconButton onClick={toggleVisibility}>
                                                {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        )
                                    }
                                }
                            />

                            <Button type='submit' variant='contained'>
                                Change
                            </Button>

                        </Stack>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default MyAccount