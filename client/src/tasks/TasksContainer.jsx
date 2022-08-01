import { useMemo, useState } from "react"
import { useSelector } from "react-redux"
//----------------------------------------------------------------------------------------------------
import Tasks from "./Tasks"
import CompletedTasks from "./CompletedTasks"
import Trash from "./Trash"
//----------------------------------------------------------------------------------------------------
import { Box, Tab, Tabs, Typography } from "@mui/material"
import { TabPanel, TabContext } from '@mui/lab'
//----------------------------------------------------------------------------------------------------

const TasksContainer = () => {
    const [value, setValue] = useState("1")
    const [incompleteTasks, setIncompleteTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])
    const [trashTasks, setTrashTasks] = useState([])

    const tasks = useSelector((state) => state.tasks.data)

    useMemo(() => {
        setIncompleteTasks(tasks.filter(ele => !ele.completed && !ele.trash))
        setCompletedTasks(tasks.filter(ele => ele.completed && !ele.trash))
        setTrashTasks(tasks.filter(ele => ele.trash))
    }, [tasks])


    const handleChange = (e, newValue) => {
        setValue(newValue)
    }

    return (
        <TabContext value={value}>
            <Box sx={{
                borderBottom: 1,
                borderColor: 'divider'
            }}>
                <Tabs variant='fullWidth' value={value} onChange={handleChange} >

                    <Tab label={`Tasks (${incompleteTasks.length})`} value="1" />

                    <Tab label={`Completed (${completedTasks.length})`} value="2" />

                    <Tab label={`Trash (${trashTasks.length})`} value="3" />
                </Tabs>
            </Box>

            <TabPanel value="1">
                <Tasks tasks={incompleteTasks} />
            </TabPanel>

            <TabPanel value="2">
                {(completedTasks.length > 0) ? (
                    <CompletedTasks tasks={completedTasks} />
                ) : (
                    <Typography
                        color='GrayText'
                        textAlign='center'
                        variant="h5"
                    >
                        No tasks present
                    </Typography>
                )}
            </TabPanel>

            <TabPanel value="3">
                {(trashTasks.length > 0) ? (
                    <Trash tasks={trashTasks} />
                ) : (
                    <Typography
                        color='GrayText'
                        textAlign='center'
                        variant="h5"
                    >
                        No tasks present
                    </Typography>
                )}
            </TabPanel>

        </TabContext>
    )
}

export default TasksContainer