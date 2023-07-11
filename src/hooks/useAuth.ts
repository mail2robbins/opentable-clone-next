import { AuthenticationContext } from "@/app/context/AuthContext"
import axios from "axios"
import { useContext } from "react"

const useAuth = () => {
    const { data, error, loading, setAuthState } = useContext(AuthenticationContext)

    const signin = async ({ email, password }: { email: string, password: string }) => {
        setAuthState({ data: null, error: null, loading: true })
        try {
            const signinResponse = await axios.post("http://localhost:5001/api/auth/signin", { email, password })

            console.log(signinResponse)
            setAuthState({ data: signinResponse.data, error: null, loading: false })
        } catch (err: any) {
            setAuthState({ data: null, error: err.response.data.errorMessage, loading: false })
        }
    }

    const signup = async () => { }


    return {
        signin, signup
    }
}

export default useAuth