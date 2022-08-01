import { useFormik } from "formik"
import * as Yup from 'yup'
//----------------------------------------------------------------------------------------------------
import { Grid, IconButton, TextField, Tooltip } from "@mui/material"
import AddTaskIcon from '@mui/icons-material/AddTask';
import UpdateIcon from '@mui/icons-material/Update';
//----------------------------------------------------------------------------------------------------

const TaskForm = (props) => {
    const { handleSubmission, task } = props

    const formik = useFormik({
        initialValues: {
            task: task || ''
        },
        validationSchema: Yup.object().shape({
            task: Yup.string()
                .required('Task name is required!')
        }),
        onSubmit: (formData, { resetForm, setErrors }) => {
            handleSubmission(formData, resetForm, setErrors)
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={10} >
                    <TextField
                        name='task'
                        label={task ? 'Update Task' : 'Add Task'}
                        value={formik.values.task}
                        onChange={formik.handleChange}
                        error={formik.touched.task && Boolean(formik.errors.task)}
                        helperText={formik.touched.task && formik.errors.task}
                        fullWidth
                        size="small"
                    />
                </Grid>

                <Grid item container justifyContent='center' xs={2} >
                    <Tooltip title={task ? 'Update Task' : 'Add Task'}>
                        <IconButton
                            color="primary"
                            type='submit'
                        >
                            {task ? <UpdateIcon /> : <AddTaskIcon />}
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        </form>
    )
}

export default TaskForm