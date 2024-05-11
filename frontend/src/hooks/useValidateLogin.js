import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'
import { setUserCredentials } from "../store/slices/userSlice"
import axios from "axios";

function useValidateLogin() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()
    useEffect(() => {
        // IIFE
        (async function validateLoginApiCall() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_BASEURL}/refresh`, {
                    withCredentials: true
                });
                if (response.status === 200) {
                    const { _id, name, email } = response.data.user
                    const credentials = {
                        name,
                        _id,
                        email,
                        auth: response.data.auth
                    }
                    dispatch(setUserCredentials(credentials))
                }
            } catch (error) {
                //
            } finally {
                setLoading(false)
            }
        })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return loading
}

export default useValidateLogin