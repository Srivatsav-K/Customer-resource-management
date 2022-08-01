import { useState } from 'react';
import { useDispatch } from 'react-redux';
//----------------------------------------------------------------------------------------------------
import TaskForm from './TaskForm';
import { startDeleteTask, startUpdateTask } from '../actions/taskActions';
//----------------------------------------------------------------------------------------------------
import { Grid, IconButton, Tooltip, Typography } from '@mui/material'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
//----------------------------------------------------------------------------------------------------

const TaskItem = (props) => {
    const { _id, task, completed, trash } = props

    const [edit, setEdit] = useState(false)

    const dispatch = useDispatch()

    const toggleEdit = () => {
        setEdit(!edit)
    }

    const handleComplete = () => {
        dispatch(startUpdateTask(_id, { completed: (completed ? false : true) }))
    }

    const handleTrash = () => {
        dispatch(startUpdateTask(_id, { trash: (trash ? false : true) }))
    }

    const undoDelete = () => {
        dispatch(startUpdateTask(_id, { trash: false }))
    }

    const handleDeletePermanently = () => {
        dispatch(startDeleteTask(_id))
    }

    const handleSubmission = (formData, resetForm, setErrors) => {
        dispatch(startUpdateTask(_id, formData, resetForm, setErrors, toggleEdit))
    }

    return (
        <Grid container spacing={1} alignItems='center'>

            {(edit) ? (
                <>
                    <Grid item xs={11}>
                        {task && <TaskForm handleSubmission={handleSubmission} task={task} />}
                    </Grid>

                    <Grid item xs={1}>
                        <Tooltip title='cancel'>
                            <IconButton onClick={toggleEdit} color='error'>
                                <CancelIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>

                </>
            ) : (
                <>
                    <Grid item xs>
                        <Tooltip title={(completed) ? ('Mark incomplete') : ('Mark complete')}>
                            <IconButton onClick={handleComplete} color='primary' >
                                {(completed) ? (<CheckCircleIcon />) : (<RadioButtonUncheckedIcon />)}
                            </IconButton>
                        </Tooltip>
                    </Grid>

                    <Grid item xs={8}>
                        <Typography>
                            {task}
                        </Typography>
                    </Grid>

                    {(trash) ? (
                        <>
                            <Grid item xs={1}>
                                <Tooltip title='Undo delete'>
                                    <IconButton onClick={undoDelete} color='success'>
                                        <UnarchiveIcon />
                                    </IconButton>
                                </Tooltip>
                            </Grid>

                            <Grid item xs={1}>
                                <Tooltip title='Delete permanently'>
                                    <IconButton onClick={handleDeletePermanently} color='error'>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </Grid>

                        </>
                    ) : (
                        <>
                            <Grid item xs={1}>
                                <Tooltip title='Edit'>
                                    <IconButton onClick={toggleEdit} color='secondary'>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                            </Grid>

                            <Grid item xs={1}>
                                <Tooltip title='Move to trash'>
                                    <IconButton onClick={handleTrash} color='error'>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </>
                    )}
                </>
            )}
        </Grid>
    )
}

export default TaskItem