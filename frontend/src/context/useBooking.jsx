import { useState } from "react";
import axiosInstance from "./../middleware/axiosClient";
import toast from "react-hot-toast";

export default function useBooking() {
    const [bookingResponse, setBookingResponse] = useState(null);
    const [bookingsResponse, setBookingsResponse] = useState([]);
    const [aadhaarsResponse, setAadhaarsResponse] = useState([]);
    const [storeAadhaarsResponse, setStoreAadhaarsResponse] = useState(null);

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

    const getBookings = async () => {
        setBookingsResponse(null);
        try {
            const response = await axiosInstance.get("/api/booking/hotels");
            setBookingsResponse(response);
        } catch (error) {
            if (error.response && error.response.data.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Something went wrong, please try again later.");
            }
        }
    };

    const getAadhaars = async (hotelBookingId) => {
        setAadhaarsResponse(null);
        try {
            const response = await axiosInstance.get(`/api/aadhaar/${hotelBookingId}`);
            setAadhaarsResponse(response);
        } catch (error) {
            if (error.response && error.response.data.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Something went wrong, please try again later.");
            }
        }
    };

    const storeAadhaars = async (hotelBookingId, payload) => {
        setStoreAadhaarsResponse(null);
        try {
            const response = await axiosInstance.post("/api/aadhaar", payload, { params: { hotelBookingId } });
            setStoreAadhaarsResponse(response);
        } catch (error) {
            if (error.response && error.response.data.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Something went wrong, please try again later.");
            }
        }
    };

    return { bookingResponse, bookHotel, bookingsResponse, getBookings, aadhaarsResponse, getAadhaars, storeAadhaarsResponse, storeAadhaars };
}
