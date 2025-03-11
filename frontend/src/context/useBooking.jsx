import { useState } from "react";
import axiosInstance from "./../middleware/axiosClient";
import toast from "react-hot-toast";

export default function useBooking() {
    const [bookingResponse, setBookingResponse] = useState(null);

    const bookHotel = async (payload) => {
        setBookingResponse(null);
        try {
            const response = await axiosInstance.post("/api/booking", payload);
            setBookingResponse(response);
            toast.success("Hotel booked");
        } catch (error) {
            if (error.response && error.response.data.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Something went wrong, please try again later.");
            }
        }
    };

    return { bookingResponse, bookHotel };
}
