import { Redirect, Route } from "react-router-dom"

const PrivateRoute = ({ component: Component, data, ...rest }) => {
    return (
        <Route {...rest} render={(props) => {
            return (
                (localStorage.getItem('token')) ? (
                    < Component {...props} data={data} />
                ) : (
                    <Redirect to={{ pathname: '/login' }} />
                )
            )
        }} />
    )
}

export default PrivateRoute