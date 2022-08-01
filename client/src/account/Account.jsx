import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//--------------------------------------------------------------------------------------
import CompanyDetails from './CompanyDetails'
import SignupForm from '../components/SignupForm'
import { startEmployeeSignup } from '../actions/accountActions'
import MyAccount from './MyAccount'
//--------------------------------------------------------------------------------------
import { Box, Stack, Tab, Tabs } from '@mui/material'
import { TabPanel, TabContext } from '@mui/lab'
//--------------------------------------------------------------------------------------

const Account = (props) => {
    const [value, setValue] = useState("1")

    const dispatch = useDispatch()

    const user = useSelector((state) => state.user.data)

    const handleChange = (e, newValue) => {
        setValue(newValue)
    }

    const handleSubmission = (formData, resetForm, setErrors) => {
        dispatch(startEmployeeSignup(formData, resetForm, setErrors, props.history))
    }

    return (
        <TabContext value={value}>
            <Box sx={{
                borderBottom: 1,
                borderColor: 'divider'
            }}>
                <Tabs variant='fullWidth' value={value} onChange={handleChange} >
                    <Tab label='My Account' value="1" />
                    {user.role === 'admin' && ([<Tab label='Company Details' value="2" key={2} />, <Tab label='Register Employee' value="3" key={3} />])}
                </Tabs>
            </Box>

            <TabPanel value="1" >
                {Object.keys(user).length > 0 && <MyAccount {...user} />}
            </TabPanel>

            <TabPanel value="2" >
                <CompanyDetails />
            </TabPanel>

            <TabPanel value="3" >
                <Stack p={3} alignItems='center'>
                    <SignupForm handleSubmission={handleSubmission} />
                </Stack>
            </TabPanel>

        </TabContext >
    )
}

export default Account