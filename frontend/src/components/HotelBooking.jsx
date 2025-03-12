import React, { useEffect, useState } from "react";
import hotels from "../data/hotels.json";
import useBooking from "../context/useBooking";
import BookHotelPopUp from "./BookHotelPopUp";
import CheckInPopUp from "./CheckInPopUp";

const HotelBooking = () => {
    const [selectedHotel, setSelectedHotel] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const BOOKING_POPUP = "BOOKING_POPUP";
    const AADHAAR_POPUP = "AADHAAR_POPUP";
    const [popup, setPopup] = useState(BOOKING_POPUP);

    const { bookingsResponse, getBookings } = useBooking();

    const fetchBookings = () => getBookings();
    useEffect(() => {
        fetchBookings();
    }, []);

    const handleBook = (hotel, popup) => {
        setSelectedHotel(hotel);
        setIsModalOpen(true);
        setPopup(popup);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="relative">
            <div className={isModalOpen ? "filter blur-sm" : ""}>
                <div className="max-w-3xl mx-auto p-6 border rounded-lg shadow-md mt-8">
                    <h2 className="text-2xl font-semibold text-center mb-6">Hotel Booking</h2>
                    <ul className="space-y-4">
                        {hotels.map((hotel) => (
                            <li key={hotel.id} className={`p-4 border rounded-lg shadow flex justify-between items-center bg-white ${isModalOpen ? "" : "hover:shadow-lg transition-shadow duration-300"}`}>
                                <div>
                                    <p className="text-lg font-medium">{hotel.name}</p>
                                    <p className="text-gray-600">{hotel.location}</p>
                                    <p className="text-gray-700">${hotel.price}</p>
                                </div>
                                <div>
                                    {bookingsResponse && bookingsResponse.find((value) => {
                                        const match = value.hotelId === hotel.id;
                                        if (match) {
                                            hotel.guestCount = value.guestCount
                                        }
                                        return match
                                    }) && (
                                        <button onClick={() => handleBook(hotel, AADHAAR_POPUP)} className="px-6 py-3 mx-5 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300">
                                            Aadhaar
                                        </button>
                                    )}
                                    <button onClick={() => handleBook(hotel, BOOKING_POPUP)} className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300">
                                        Book
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {isModalOpen && popup === BOOKING_POPUP &&
            <BookHotelPopUp
                selectedHotel={selectedHotel}
                handleCloseModal={handleCloseModal}
                fetchBookings={fetchBookings}
            />}

            {isModalOpen && popup === AADHAAR_POPUP &&
            <CheckInPopUp
                selectedHotel={selectedHotel}
                handleCloseModal={handleCloseModal}
            />}
        </div>
    );
};

export default HotelBooking;
