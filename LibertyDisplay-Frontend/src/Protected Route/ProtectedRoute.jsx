import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { Bounce, toast, ToastContainer } from "react-toastify"


export const ProtectedRoute = ({ children }) => {
    const admin = useSelector((state) => state.AirWheel.users)
    const location = useLocation()

    if (admin) {
        return children
    } else {

        toast.error('What Are you Doing 😠 😠 😠!!', {
            position: "top-center",
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            
        });
        return <Navigate to={'/'} replace={true} ></Navigate>
    }
    <ToastContainer></ToastContainer>



}
