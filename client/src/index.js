import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';

//-----------------------------------------------------------------------------------

import App from './App'
import configStore from './store/configStore'

//-----------------------------------------------------------------------------------

const store = configStore()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <App />
            </LocalizationProvider>
        </Provider>
    </BrowserRouter>
)