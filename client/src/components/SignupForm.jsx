import { useState } from "react"
import { useSelector } from "react-redux"
import { useFormik } from 'formik'
import * as Yup from 'yup'
//--------------------------------------------------------------------------------------
import { Stack, TextField, Button, IconButton, FormHelperText, InputAdornment } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
//--------------------------------------------------------------------------------------

const SignupForm = (props) => {
    const { handleSubmission } = props

    const [visible, setVisible] = useState(false)

    const user = useSelector((state) => {
        return state.user
    })

    //validation
    const lowercaseRegex = /(?=.*[a-z])/
    const uppercaseRegex = /(?=.*[A-Z])/
    const numericRegex = /(?=.*[0-9])/
    const specialCharacterRegex = /(?=.*[*.!@$%^&_-])/

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required!')
            .min(3, 'Too short!')
            .max(64, 'Too long!')
            .trim(),
        email: Yup.string()
            .required('Email is required!')
            .email('Invalid email!')
            .lowercase()
            .trim(),
        password: Yup.string()
            .required('Password is required!')
            .matches(lowercaseRegex, 'one lowercase required!')
            .matches(uppercaseRegex, 'one uppercase required!')
            .min(8, 'Too short!')
            .max(128, 'Too long!')
            .matches(numericRegex, 'one number required!')
            .matches(specialCharacterRegex, 'one special character required!')
            .trim(),
        confirmPassword: Yup.string()
            .required('Retype your password!')
            .oneOf([Yup.ref('password')], 'Passwords dont match!')
    })

    //formik
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: validationSchema,
        onSubmit: (formData, { resetForm, setErrors }) => {
            handleSubmission(formData, resetForm, setErrors)
        }
    })

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3} minWidth={{ sm: '300px', xl: '400px' }} maxWidth={{ sm: '300px', xl: '400px' }} alignItems='center' >
                <TextField
                    name='username'
                    label='username'
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                    fullWidth
                    InputProps={
                        {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonOutlineTwoToneIcon />
                                </InputAdornment>
                            )
                        }
                    }

                />

                <TextField
                    name='email'
                    label='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    fullWidth
                    InputProps={
                        {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailOutlinedIcon />
                                </InputAdornment>
                            )
                        }
                    }

                />

                <TextField
                    name='password'
                    label='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    fullWidth
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
                    name='confirmPassword'
                    label='confirm password'
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    fullWidth
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

                {(user.signupErrors) && (user.signupErrors.errorMessage) && (
                    <FormHelperText error>{user.signupErrors.errorMessage}</FormHelperText>
                )}

                <Button type='submit' variant='contained'>
                    Signup
                </Button>

            </Stack>
        </form>
    )
}

export default SignupForm