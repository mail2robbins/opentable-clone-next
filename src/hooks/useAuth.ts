import { AuthenticationContext } from "@/app/context/AuthContext"
import axios from "axios"
import { useContext } from "react"
import { deleteCookie } from "cookies-next";

const useAuth = () => {
    const { data, error, loading, setAuthState } = useContext(AuthenticationContext)

    const signin = async ({ email, password }:
        { email: string, password: string }, handleClose: () => void) => {
        setAuthState({ data: null, error: null, loading: true })
        try {
            const signinResponse = await axios.post(`https://opentable-clone-next-liard.vercel.app/api/auth/signin`, { email, password })

            setAuthState({ data: signinResponse.data, error: null, loading: false })
            handleClose()
        } catch (err: any) {
            setAuthState({ data: null, error: err.response?.data?.errorMessage ? err.response?.data?.errorMessage : err.message, loading: false })
        }
    }

    const signup = async ({ email,
        password,
        firstName,
        lastName,
        city,
        phone }: {
            email: string,
            password: string,
            firstName: string,
            lastName: string,
            city: string,
            phone: string
        },
        handleClose: () => void) => {
        setAuthState({ data: null, error: null, loading: true })
        try {
            const signinResponse = await axios.post(`https://opentable-clone-next-liard.vercel.app/api/auth/signup`, {
                email, password, firstName,
                lastName,
                city,
                phone
            })

            setAuthState({ data: signinResponse.data, error: null, loading: false })
            handleClose()
        } catch (err: any) {
            setAuthState({ data: null, error: err.response?.data?.errorMessage ? err.response?.data?.errorMessage : err.message, loading: false })
        }
    }

    const signout = async () => {
        deleteCookie("opentablejwt")
        setAuthState({ data: null, error: null, loading: false })
    }

    return {
        signin, signup, signout
    }
}

export default useAuth