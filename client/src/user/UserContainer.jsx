import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route } from "react-router-dom"
//--------------------------------------------------------------------------
import { startGetClients } from '../actions/clientActions'
import { startGetContacts } from '../actions/contactActions'
import { startGetEnquiries } from '../actions/enquiryActions'
import { startGetProducts } from '../actions/productActions'
import { startGetQuotations } from '../actions/quotationActions'
import { startGetOrders } from '../actions/orderActions'
import { startGetTasks } from '../actions/taskActions'
import { startGetCompanyDetails } from '../actions/accountActions'

import PrivateRoute from '../helper/PrivateRoute'

import SideBar from '../navigation/Sidebar'

import Dashboard from '../dashboard/Dashboard'

import Clients from '../clients/Clients'
import AddClient from '../clients/AddClient'
import ClientDetails from '../clients/ClientDetails'

import Contacts from '../contacts/Contacts'
import AddContact from '../contacts/AddContact'
import ContactDetails from '../contacts/ContactDetails'

import Enquiries from '../enquiries/Enquiries'
import NewEnquiry from '../enquiries/NewEnquiry'
import EnquiryDetails from '../enquiries/EnquiryDetails'

import Products from '../products/Products'
import AddProduct from '../products/AddProduct'
import ProductDetails from '../products/ProductDetails'

import Quotations from '../quotations/Quotations'
import CreateQuotation from '../quotations/CreateQuotation'
import QuotationDetails from '../quotations/QuotationDetails'

import Orders from '../orders/Orders'
import CreateOrder from '../orders/CreateOrder'
import OrderDetails from '../orders/OrderDetails'

import TasksContainer from '../tasks/TasksContainer'
import Account from '../account/Account'
//--------------------------------------------------------------------------
import { Grid } from '@mui/material'
import Error from '../common/Error'
//--------------------------------------------------------------------------

const UserContainer = () => {
    const user = useSelector((state) => state.user.data)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetClients())
        dispatch(startGetContacts())
        dispatch(startGetProducts())
        dispatch(startGetCompanyDetails())
        dispatch(startGetTasks())
        if (user.role) {
            if (user.role === 'admin') {
                dispatch(startGetEnquiries('enquiries/all'))
                dispatch(startGetQuotations('quotations/all'))
                dispatch(startGetOrders('orders/all'))
            } else {
                dispatch(startGetEnquiries('enquiries'))
                dispatch(startGetQuotations('quotations'))
                dispatch(startGetQuotations('quotations'))
                dispatch(startGetOrders('orders'))
            }
        }
    }, [dispatch, user])

    return (
        <Grid container>
            <Grid item xs={0} md={2}>
                <SideBar />
            </Grid>

            <Grid item xs={12} md={10} px={2} >
                <Switch>
                    <PrivateRoute path='/user/dashboard' component={Dashboard} />
                    <PrivateRoute path='/user/account' component={Account} />

                    <PrivateRoute path='/user/clients' component={Clients} exact />
                    <PrivateRoute path='/user/add-client' component={AddClient} />
                    <PrivateRoute path='/user/clients/:id' component={ClientDetails} />

                    <PrivateRoute path='/user/contacts' component={Contacts} exact />
                    <PrivateRoute path='/user/add-contact' component={AddContact} />
                    <PrivateRoute path='/user/contacts/:id' component={ContactDetails} />

                    <PrivateRoute path='/user/enquiries' component={Enquiries} exact />
                    <PrivateRoute path='/user/new-enquiry' component={NewEnquiry} />
                    <PrivateRoute path='/user/enquiries/:id' component={EnquiryDetails} />

                    <PrivateRoute path='/user/products' component={Products} exact />
                    <PrivateRoute path='/user/add-product' component={AddProduct} />
                    <PrivateRoute path='/user/products/:id' component={ProductDetails} />

                    <PrivateRoute path='/user/quotations' component={Quotations} exact />
                    <PrivateRoute path='/user/new-quotation' component={CreateQuotation} />
                    <PrivateRoute path='/user/quotations/:id' component={QuotationDetails} />

                    <PrivateRoute path='/user/orders' component={Orders} exact />
                    <PrivateRoute path='/user/new-order' component={CreateOrder} />
                    <PrivateRoute path='/user/orders/:id' component={OrderDetails} />

                    <PrivateRoute path='/user/tasks' component={TasksContainer} exact />

                    <Route path='*' component={Error}  />
                </Switch>
            </Grid>
        </Grid>
    )
}

export default UserContainer