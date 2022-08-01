import { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
//--------------------------------------------------------------------------------------
import { userLoggedOut } from '../actions/userActions'
//--------------------------------------------------------------------------------------
import { Divider, IconButton, Menu, MenuItem } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings';
//--------------------------------------------------------------------------------------

const DropdownMenu = (props) => {
    const [anchorEle, setAnchorEle] = useState(null)
    const [open, setOpen] = useState(false)

    const dispatch = useDispatch()

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

    //logout
    const handleLogOut = () => {
        localStorage.clear()
        dispatch(userLoggedOut())
        toast.success('Logout success')
        props.history.push('/')
        handleMenuClose()
    }

    //redirect
    const redirectTo = (dest) => {
        props.history.push(dest)
        handleMenuClose()
    }
    return (
        <>
            <IconButton color='inherit' onClick={handleMenuOpen}>
                <SettingsIcon />
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
                <MenuItem onClick={() => redirectTo('/user/account')}>
                    Account
                </MenuItem>

                <Divider />

                <MenuItem color='inherit' onClick={() => redirectTo('/user/dashboard')}>
                    Dashboard
                </MenuItem>

                <Divider />

                <MenuItem color='inherit' onClick={handleLogOut}>
                    Logout
                </MenuItem>
            </Menu>
        </>
    )
}

export default withRouter(DropdownMenu)