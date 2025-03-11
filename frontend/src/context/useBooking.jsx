import { useState } from "react";
import axiosInstance from "./../middleware/axiosClient";

export default function useBooking() {
    const [bookingResponse, setBookingResponse] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const bookHotel = async (payload) => {
        setErrorMessage("");
        setBookingResponse(null);
        try {
            const response = await axiosInstance.post("/api/booking", payload);
            setBookingResponse(response);
        } catch (error) {
            if (error.response && error.response.data.error) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage("Something went wrong, please try again later.");
            }
        }
    };

    return { bookingResponse, bookHotel, errorMessage, setErrorMessage };
}
