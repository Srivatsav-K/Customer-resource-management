import { useMemo, useState } from "react";
//----------------------------------------------------------------------------------------------------
import TaskItem from "./TaskItem";
//----------------------------------------------------------------------------------------------------
import { Grid, InputAdornment, TextField, Typography } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
//----------------------------------------------------------------------------------------------------

const Trash = ({ tasks }) => {

    const [search, setSearch] = useState('')

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

    return (
        <Grid container spacing={4}>
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

            <Grid item container justifyContent='center'>
                {(filteredData.length > 0) ? (
                    filteredData.map((ele) => {
                        return <TaskItem {...ele} key={ele._id} />
                    })
                ) : (
                    <Typography color='error'>
                        No results found
                    </Typography>
                )}
            </Grid>
        </Grid>
    )
}

export default Trash