import { useState } from "react";
//--------------------------------------------------------------------------------------
import { Button, Dialog, DialogActions, DialogTitle, IconButton, Stack, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
//--------------------------------------------------------------------------------------

const DeleteButton = (props) => {
    const { handleDelete } = props
    const [open, setOpen] = useState(false)

    const handleDialogOpen = () => {
        setOpen(true)
    }

    const handleDialogClose = () => {
        setOpen(false)
    }

    const handleDeleteAndClose = () => {
        handleDelete()
        setOpen(false)
    }

    return (
        <div>

            <IconButton color="error" onClick={handleDialogOpen}>
                <DeleteIcon />
            </IconButton>


            <Dialog
                open={open}
                onClose={handleDialogClose}
            >
                <Stack spacing={1} p={5} >
                    <DialogTitle>
                        <Stack alignItems='center' spacing={2}>
                            <WarningIcon fontSize="large" color="warning" />

                            <Typography variant="h5" textAlign='center'>
                                Are you sure ?
                                <Typography variant="body2">
                                    This will delete all related fields.
                                </Typography>
                            </Typography>

                        </Stack>
                    </DialogTitle>

                    <DialogActions>
                        <Button onClick={handleDialogClose} size='small' variant="outlined">Cancel</Button>
                        <Button onClick={handleDeleteAndClose} size='small' variant="outlined" color="error">Delete</Button>
                    </DialogActions>
                </Stack>
            </Dialog>
        </div>
    )
}

export default DeleteButton