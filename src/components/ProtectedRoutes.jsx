import Login from "../pages/Login"

const ProtectedRoutes = ({ Component, isLoggedIn }) => {
    if (!isLoggedIn) {
        return <div className="flex justify-center items-center relative z-30 bg-[#D9F1FF] height">
            <div className="dot-spinner">
                <div className="dot-spinner__dot" />
                <div className="dot-spinner__dot" />
                <div className="dot-spinner__dot" />
                <div className="dot-spinner__dot" />
                <div className="dot-spinner__dot" />
                <div className="dot-spinner__dot" />
                <div className="dot-spinner__dot" />
                <div className="dot-spinner__dot" />
            </div>
        </div>
    }

    if (!isLoggedIn) {
        return <Login />
    } else {
        return <Component />
    }
}

export default ProtectedRoutes