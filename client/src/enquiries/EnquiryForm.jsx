import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
//--------------------------------------------------------------------------------------
import DropDown from '../components/DropDown'
//--------------------------------------------------------------------------------------
import { Button, FormHelperText, Grid, IconButton, MenuItem, Paper, Stack, TextField } from '@mui/material'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
//--------------------------------------------------------------------------------------

const EnquiryForm = (props) => {
    const { handleSubmission, name, contact, requirements, budget, competitors, estimatedTimelines, expectedClosingDate, status, comments: serverComments } = props
    const [comments, setComments] = useState(serverComments || [])
    const contacts = useSelector((state) => state.contacts.data)

    const gridSplit = 6

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required!'),
        contact: Yup.string()
            .required('Contact is required!'),
        requirements: Yup.string()
            .required('Requirements are needed!'),
        budget: Yup.number()
            .required('Budget is required!')
            .min(1),
        competitors: Yup.string()
            .required(),
        estimatedTimelines: Yup.string()
            .required(),
        expectedClosingDate: Yup.date()
            .required('Required!'),
        status: Yup.string()
            .required('Status is required!'),
    })

    const formik = useFormik({
        initialValues: {
            name: name || '',
            contact: (contact && contact._id) || '',
            requirements: requirements || '',
            budget: budget || '',
            competitors: competitors || '',
            estimatedTimelines: estimatedTimelines || '',
            expectedClosingDate: (expectedClosingDate && expectedClosingDate.slice(0, 10)) || '',
            status: status || 'inprocess',
        },
        validationSchema: validationSchema,
        onSubmit: (formData, { setErrors, resetForm }) => {
            handleSubmission({ ...formData, comments }, resetForm, setErrors)
        }
    })

    //comments
    const handleAddComment = () => {
        setComments([...comments, { body: '' }])
    }

    const handleChange = (e, index) => {
        const value = e.target.value
        const result = comments.map((ele, i) => {
            if (index === i) {
                return { ...ele, body: value }
            } else {
                return { ...ele }
            }
        })
        setComments(result)
    }

    const handleCommentRemove = (index) => {
        const result = comments.filter((ele, i) => {
            return index !== i
        })
        setComments(result)
    }

    return (
        <form onSubmit={formik.handleSubmit}>

            <Grid container rowSpacing={3} p={5} alignItems='center' justifyContent='center' direction={{ xs: 'column', md: 'row' }} >

                <Grid item sm={gridSplit} container justifyContent='center' >
                    <TextField
                        name='name'
                        label='name'
                        size='small'
                        value={formik.values.name} onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                </Grid>

                <Grid item sm={gridSplit} container justifyContent='center' >
                    <DropDown
                        name='contact'
                        label='contact'
                        value={formik.values.contact}
                        onChange={formik.handleChange}
                        error={formik.touched.contact && Boolean(formik.errors.contact)}
                        helperText={formik.touched.contact && formik.errors.contact}
                    >
                        {contacts.map((ele) => {
                            return (
                                <MenuItem value={ele._id} key={ele._id} >{ele.name}</MenuItem>
                            )
                        })}
                    </DropDown>
                </Grid>

                <Grid item sm={gridSplit} container justifyContent='center' >
                    <TextField
                        name='budget'
                        type='number'
                        label='budget'
                        size='small'
                        value={formik.values.budget} onChange={formik.handleChange}
                        error={formik.touched.budget && Boolean(formik.errors.budget)}
                        helperText={formik.touched.budget && formik.errors.budget}
                    />
                </Grid>

                <Grid item sm={gridSplit} container justifyContent='center' >
                    <TextField
                        name='requirements'
                        label='requirements'
                        multiline
                        rows={3}
                        value={formik.values.requirements}
                        onChange={formik.handleChange}
                        error={formik.touched.requirements && Boolean(formik.errors.requirements)}
                        helperText={formik.touched.requirements && formik.errors.requirements}
                    />
                </Grid>

                <Grid item sm={gridSplit} container justifyContent='center' >
                    <TextField
                        name='competitors'
                        label='competitors'
                        size='small'
                        value={formik.values.competitors} onChange={formik.handleChange}
                        error={formik.touched.competitors && Boolean(formik.errors.competitors)}
                        helperText={formik.touched.competitors && formik.errors.competitors}
                    />
                </Grid>

                <Grid item sm={gridSplit} container justifyContent='center' >
                    <TextField
                        name='estimatedTimelines'
                        label='estimatedTimelines'
                        size='small'
                        value={formik.values.estimatedTimelines} onChange={formik.handleChange}
                        error={formik.touched.estimatedTimelines && Boolean(formik.errors.estimatedTimelines)}
                        helperText={formik.touched.estimatedTimelines && formik.errors.estimatedTimelines}
                    />
                </Grid>

                <Grid item sm={gridSplit} container justifyContent='center' >
                    <TextField
                        name='status'
                        label='status'
                        size='small'
                        select
                        value={formik.values.status} onChange={formik.handleChange}
                        error={formik.touched.status && Boolean(formik.errors.status)}
                        helperText={formik.touched.status && formik.errors.status}
                    >
                        <MenuItem value="inprocess">inprocess</MenuItem>
                        <MenuItem value="orderplaced">orderplaced</MenuItem>
                        <MenuItem value="not interested">not interested</MenuItem>
                    </TextField>
                </Grid>

                <Grid item sm={gridSplit} container direction='column' alignItems='center' >
                    <FormHelperText>Expected Closing Date</FormHelperText>
                    <input value={formik.values.expectedClosingDate} type='date' onChange={formik.handleChange} name='expectedClosingDate' placeholder='expectedClosingDate' />
                    {formik.touched.expectedClosingDate && Boolean(formik.errors.expectedClosingDate) && <FormHelperText error>{formik.errors.expectedClosingDate}</FormHelperText>}
                </Grid>

                <Grid item sm={gridSplit} container direction='column' alignItems='center' >
                    {comments.map((comment, index) => {
                        return (
                            <Paper key={index}>
                                <TextField label={`Comment ${index + 1}`} size='small' value={comment.body} onChange={(e) => handleChange(e, index)} ></TextField>
                                <IconButton size='small' type='button' onClick={() => handleCommentRemove(index)}>
                                    <RemoveCircleOutlineOutlinedIcon color='error' />
                                </IconButton>
                            </Paper>
                        )
                    })}

                    <Button onClick={handleAddComment} type='button'>+ Add Comment</Button>

                </Grid>

            </Grid>
            <Stack alignItems='center'>
                <Button type="submit" variant='contained' >Save</Button>
            </Stack>
        </form>
    )
}

export default EnquiryForm