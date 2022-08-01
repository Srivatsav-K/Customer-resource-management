import { useState } from "react";
import Calculator from "awesome-react-calculator";
//--------------------------------------------------------------------------------------
import { Box, IconButton, Menu, MenuItem } from "@mui/material"
import CalculateIcon from '@mui/icons-material/Calculate';
//--------------------------------------------------------------------------------------

const Calculate = () => {
    const [anchorEle, setAnchorEle] = useState(null)
    const [open, setOpen] = useState(false)

    //dropdown menu
    const handleMenuOpen = (e) => {
        setAnchorEle(e.target)
        setOpen(true)
    }
    //drop down menu
    const handleMenuClose = () => {
        setAnchorEle(null)
        setOpen(false)
    }

    return (
        <>
            <IconButton color='inherit' onClick={handleMenuOpen} >
                <CalculateIcon />
            </IconButton>

            <Menu anchorEl={anchorEle} open={open} onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
            >
                <MenuItem>
                    <Box width={250} height={300}>
                        <Calculator />
                    </Box>
                </MenuItem>
            </Menu>

        </>
    )
}

export default Calculate