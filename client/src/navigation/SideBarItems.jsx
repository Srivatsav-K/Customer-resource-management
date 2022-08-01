import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
//--------------------------------------------------------------------------------------
import { closeSideBar } from '../actions/sidebarActions';
//--------------------------------------------------------------------------------------
import { Box, Tab, Tabs } from '@mui/material'
//--------------------------------------------------------------------------------------

const SideBarItems = (props) => {
    const { mobile } = props
    const [value, setValue] = useState('0');

    const dispatch = useDispatch()

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const hideSideBar = () => {
        if (mobile) {
            dispatch(closeSideBar())
        }
    }

    return (
        <Box p={2}>
            <Tabs
                orientation='vertical'
                value={value}
                onChange={handleChange}
                onClick={hideSideBar}
            >
                <Tab value='0' />
                <Tab label='Dashboard' to='/user/dashboard' component={Link} />
                <Tab label='Tasks' to='/user/tasks' component={Link} />
                <Tab label='clients' to='/user/clients' component={Link} />
                <Tab label='contacts' to='/user/contacts' component={Link} />
                <Tab label='products' to='/user/products' component={Link} />
                <Tab label='enquiries' to='/user/enquiries' component={Link} />
                <Tab label='quotations' to='/user/quotations' component={Link} />
                <Tab label='orders' to='/user/orders' component={Link} />

            </Tabs>
        </Box>
    )
}

export default SideBarItems