import Login from "../pages/Login"

const ProtectedRoutes = ({ Component, isLoggedIn }) => {
    if (!isLoggedIn) {
        return <Login />
    } else {
        return <Component />
    }
}

export default ProtectedRoutes