import React, { useMemo, useState } from "react"
import { useDispatch } from "react-redux"
//----------------------------------------------------------------------------------------------------
import TaskForm from "./TaskForm"
import TaskItem from "./TaskItem"
import { startPostTask } from "../actions/taskActions"
//----------------------------------------------------------------------------------------------------
import { Divider, Grid, InputAdornment, TextField, Typography } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
//----------------------------------------------------------------------------------------------------


const Tasks = ({ tasks }) => {
    const [search, setSearch] = useState('')

    const dispatch = useDispatch()

    const filteredData = useMemo(() => {
        return (
            tasks.filter(ele => {
                return ele.task.toLowerCase().includes(search.toLowerCase())
            })
        )
    }, [tasks, search])

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSubmission = (formData, resetForm, setErrors) => {
        dispatch(startPostTask(formData, resetForm, setErrors))
    }

    return (
        <Grid container spacing={4}>

            <Grid item xs={12}>
                <TaskForm handleSubmission={handleSubmission} />
            </Grid>

            <Grid item container direction='column' spacing={2} xs={12}>
                {(tasks.length > 0) ? (
                    <>
                        <Grid item container justifyContent='center'>
                            <TextField
                                type="text"
                                name='search'
                                value={search}
                                onChange={handleChange}
                                placeholder='Search '
                                size='small'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <SearchIcon />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>

                        <Grid item >
                            {(filteredData.length > 0) ? (
                                filteredData.map((ele) => {
                                    return (
                                        <React.Fragment key={ele._id}>
                                            <TaskItem {...ele} />
                                            <Divider />
                                        </React.Fragment>
                                    )
                                })
                            ) : (
                                <Typography color='error' textAlign='center' >
                                    No results found
                                </Typography>
                            )}
                        </Grid>
                    </>
                ) : (
                    <Grid>
                        <Typography
                            color='GrayText'
                            textAlign='center'
                            variant="h5"
                        >
                            No tasks present
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </Grid>
    )
}

export default Tasks