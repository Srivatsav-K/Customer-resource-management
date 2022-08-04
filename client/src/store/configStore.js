import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

//-------------------------------------------------------------------------------------

import accountReducer from '../reducers/accountReducer'
import clientsReducer from '../reducers/clientsReducer'
import contactsReducer from '../reducers/contactsReducer'
import enquiriesReducer from '../reducers/enquiriesReducer'
import ordersReducer from '../reducers/ordersReducer'
import productsReducer from '../reducers/productsReducer'
import quotationsReducer from '../reducers/quotationsReducer'
import sidebarReducer from '../reducers/sidebarReducer'
import tasksReducer from '../reducers/tasksReducer'
import userReducer from '../reducers/userReducer'

//-------------------------------------------------------------------------------------

const configStore = () => {
    const store = createStore(combineReducers({
        user: userReducer,
        sidebar: sidebarReducer,
        clients: clientsReducer,
        contacts: contactsReducer,
        enquiries: enquiriesReducer,
        products: productsReducer,
        quotations: quotationsReducer,
        account: accountReducer,
        tasks: tasksReducer,
        orders: ordersReducer
    }), applyMiddleware(thunk))

    return store
}

export default configStore