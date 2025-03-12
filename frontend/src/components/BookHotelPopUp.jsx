import React, { useEffect, useState } from "react";
import useBooking from "../context/useBooking";
import toast from "react-hot-toast";

const BookHotelPopUp = ({ selectedHotel, handleCloseModal, fetchBookings }) => {
    const [ bookingDetails, setBookingDetails ] = useState({
        checkIn: "",
        checkOut: "",
        guests: "",
    });

    const handleResetCloseModal = () => {
        setBookingDetails({ checkIn: "", checkOut: "", guests: "" });
        handleCloseModal();
    };

    const { bookingResponse, bookHotel } = useBooking();

    const handleInputChange = (e) => {
        setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
    };

    const validateDates = () => {
        if (!bookingDetails.checkIn || !bookingDetails.checkOut) {
            toast.error("Please select both check-in and check-out dates/times.");
            return false;
        }

        if (new Date(bookingDetails.checkOut) <= new Date(bookingDetails.checkIn)) {
            toast.error("Check-out date/time must be after check-in date/time.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateDates()) {
            await bookHotel({
                hotelId: selectedHotel.id,
                ...bookingDetails,
            });
        }
    };

    useEffect(() => {
        if (bookingResponse) {
            toast.success("Successfully booked a hotel.");
            handleCloseModal();
            fetchBookings();
        }
    }, [bookingResponse]);

    return (
        <div className="fixed inset-0 flex justify-center items-center">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 z-10 relative">
                <h3 className="text-xl font-semibold mb-4">Booking Details for {selectedHotel.name}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Check-in Date/Time:</label>
                        <input type="datetime-local" name="checkIn" value={bookingDetails.checkIn} onChange={handleInputChange} className="mt-1 p-2 border rounded-md w-full" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Check-out Date/Time:</label>
                        <input type="datetime-local" name="checkOut" value={bookingDetails.checkOut} onChange={handleInputChange} className="mt-1 p-2 border rounded-md w-full" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Number of Guests:</label>
                        <input type="number" name="guests" value={bookingDetails.guests} onChange={handleInputChange} className="mt-1 p-2 border rounded-md w-full" required />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={handleResetCloseModal} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-300">
                            Close
                        </button>
                        <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300">
                            Confirm Booking
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookHotelPopUp;
