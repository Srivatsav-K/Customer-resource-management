import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { startGetClients } from '../actions/clientActions'
import { startGetContacts } from '../actions/contactActions'
import { startGetEnquiries } from '../actions/enquiryActions'

import PrivateRoute from '../helper/PrivateRoute'

import SideBar from '../navigation/Sidebar'

import Dashboard from './Dashboard'

import Clients from '../clients/Clients'
import AddClient from '../clients/AddClient'

import Contacts from '../contacts/Contacts'
import AddContact from '../contacts/AddContact'

import Enquiries from '../enquiries/Enquiries'
import NewEnquiry from '../enquiries/NewEnquiry'

import { Grid } from '@mui/material'
import ClientDetails from '../clients/ClientDetails'
import ContactDetails from '../contacts/ContactDetails'
import EnquiryDetails from '../enquiries/EnquiryDetails'
import { startGetProducts } from '../actions/productActions'
import Products from '../products/Products'
import AddProduct from '../products/AddProduct'
import ProductDetails from '../products/ProductDetails'
import Quotations from '../quotations/Quotations'
import CreateQuotation from '../quotations/CreateQuotation'
import { startGetQuotations } from '../actions/quotationActions'
import QuotationDetails from '../quotations/QuotationDetails'
import Orders from '../orders/Orders'
import CreateOrder from '../orders/CreateOrder'
import OrderDetails from '../orders/OrderDetails'

import Account from '../account/Account'
import { startGetCompanyDetails } from '../actions/accountActions'
import TasksContainer from '../tasks/TasksContainer'
import { startGetTasks } from '../actions/taskActions'
import { startGetOrders } from '../actions/orderActions'

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
                dispatch(startGetOrders('/orders'))
            }
        }
    }, [dispatch, user])

    return (
        <Grid container>
            <Grid item xs={0} md={2}>
                <SideBar />
            </Grid>

            <Grid item xs={12} md={10} px={2} >
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


            </Grid>
        </Grid>
    )
}

export default UserContainer