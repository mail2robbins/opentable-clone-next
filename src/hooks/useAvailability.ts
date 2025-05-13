import axios from 'axios'
import React, { useState } from 'react'

const useAvailability = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState<{
        available: boolean
        time: string
    }[] | null>(null)


    const fetchAvailability = async ({ slug, partySize, day, time }: { slug: string, partySize: string, day: string, time: string }) => {
        setLoading(true)
        try {
            const response = await axios.get(`/api/restaurant/${slug}/availability?day=${day}&time=${time}&partySize=${partySize}`)
            setData(response.data)
            setLoading(false)
        } catch (err: any) {
            setError(err.response.data.errorMessage)
            setLoading(false)
        }
    }

    return (
        { loading, data, error, fetchAvailability }
    )
}

export default useAvailability