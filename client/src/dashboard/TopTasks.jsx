import { useMemo } from 'react'
import { useSelector } from 'react-redux'
//--------------------------------------------------------------------------------------------------------
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
//--------------------------------------------------------------------------------------------------------

const TopTasks = () => {
    const tasks = useSelector((state) => state.tasks.data)

    const incompleteTasks = useMemo(() => {
        return tasks.filter((task) => !task.completed && !task.trash)
    }, [tasks])

    return (
        <TableContainer component={Paper} sx={{ height: '50vh' }}>
            <Table  >
                <TableHead>
                    <TableRow sx={{ backgroundColor: 'brown' }}>
                        <TableCell sx={{ color: 'white' }}>
                            Tasks
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {incompleteTasks.map((task) => {
                        return (
                            <TableRow key={task._id}>
                                <TableCell sx={{ maxWidth: 100, wordWrap: 'break-word' }} >{task.task}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TopTasks