import axios from "axios";
import React, { useState } from "react";

const useReservation = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createReservation = async ({
        slug,
        partySize,
        day,
        time,
        bookerFirstName,
        bookerLastName,
        bookerPhone,
        bookerEmail,
        bookerOccasion,
        bookerRequest,
        setDidBook
    }: {
        slug: string;
        partySize: string;
        day: string;
        time: string;
        bookerFirstName: string;
        bookerLastName: string;
        bookerPhone: string;
        bookerEmail: string;
        bookerOccasion: string;
        bookerRequest: string;
        setDidBook: React.Dispatch<React.SetStateAction<boolean>>
    }) => {
        setLoading(true);
        try {
            const response = await axios.post(
                `${process.env.OPEN_TABLE_API_URL}/api/restaurant/${slug}/reserve?day=${day}&time=${time}&partySize=${partySize}`,
                {
                    bookerFirstName,
                    bookerLastName,
                    bookerPhone,
                    bookerEmail,
                    bookerOccasion,
                    bookerRequest,
                }
            );

            setDidBook(true);
            setLoading(false);
        } catch (err: any) {
            setError(err.response.data.errorMessage);
            setLoading(false);
        }
    };

    return { loading, error, createReservation };
};

export default useReservation;
