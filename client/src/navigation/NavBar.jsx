import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//--------------------------------------------------------------------------------------
import { startGetUserData, startUserIsNew } from '../actions/userActions';
import { toggleSideBar } from '../actions/sidebarActions';
import DropdownMenu from './DropdownMenu';
//------------------------------------------------------------------------------------------
import { AppBar, IconButton, Toolbar, Typography, Button, Box } from '@mui/material'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GoogleIcon from '@mui/icons-material/Google';
import MenuIcon from '@mui/icons-material/Menu';
import Calculate from './Calculate';
//------------------------------------------------------------------------------------------

const NavBar = (props) => {

    const user = useSelector((state) => {
        return state.user
    })

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startUserIsNew())
        if (localStorage.getItem('token')) {
            dispatch(startGetUserData(null, props.history))
        }
    }, [dispatch, props.history])

    //redirection helper function
    const redirectTo = (dest) => {
        props.history.push(dest)
    }

    return (
        <AppBar
            position='fixed'
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >

            <Toolbar sx={{
                marginInline: {
                    xs: 'none',
                    sm: '2rem'
                },
            }}>
                <Box
                    sx={{ flexGrow: 1 }}
                    display='flex'
                    alignItems='center'
                >
                    {/* sidebar */}
                    <IconButton
                        color='inherit'
                        edge='start'
                        sx={{
                            display: {
                                xs: 'block',
                                md: 'none'
                            },
                        }}
                        onClick={() => dispatch(toggleSideBar())}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* logo */}
                    <IconButton
                        onClick={() => redirectTo('/')}
                        color='inherit'
                        edge='start'
                        sx={{
                            display: {
                                xs: 'none',
                                md: 'block'
                            }
                        }}
                    >
                        <ManageAccountsIcon />
                    </IconButton>

                    {/* heading */}
                    <Typography
                        variant='h6'
                        component='div'
                    >
                        CRM
                    </Typography>
                </Box>

                <Box>
                    {(user.isLoggedIn) ? (
                        <>
                            <Calculate />

                            <IconButton color='inherit' type='a' target='#' href='https://www.google.com/' >
                                <GoogleIcon />
                            </IconButton>

                            <DropdownMenu />
                        </>
                    ) : (
                        <>
                            <Button color='inherit' onClick={() => redirectTo('/')}>
                                Home
                            </Button>

                            {user.isNew && (
                                <Button color='inherit' onClick={() => redirectTo('/signup')}>
                                    Signup
                                </Button>
                            )}

                            <Button color='inherit' onClick={() => redirectTo('/login')}>
                                Login
                            </Button>

                        </>
                    )}
                </Box>

            </Toolbar>

        </AppBar>
    )
}

export default withRouter(NavBar)