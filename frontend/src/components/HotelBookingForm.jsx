import React, { useEffect, useState } from "react";
import hotels from "../data/hotels.json";
import useBooking from "../context/useBooking";

const HotelBookingForm = () => {
    const [selectedHotel, setSelectedHotel] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookingDetails, setBookingDetails] = useState({
        datetime: "",
        guests: "",
    });
    const { bookingResponse, bookHotel, errorMessage, setErrorMessage } = useBooking()

    const handleBook = (hotel) => {
        setSelectedHotel(hotel);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setBookingDetails({ datetime: "", guests: "" });
        setErrorMessage("");
    };

    const handleInputChange = (e) => {
        setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await bookHotel({
          hotelId: selectedHotel.id,
          ...bookingDetails
        });
    };

    useEffect(() => {
      console.log("🚀 ~ HotelBookingForm.jsx:39 ~ useEffect ~ bookingResponse:", bookingResponse);
      if (bookingResponse) {
        handleCloseModal();
      }
    }, [bookingResponse]);

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
                                <button onClick={() => handleBook(hotel)} className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300">
                                    Book
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center">
                    <div className="absolute inset-0 bg-black opacity-20"></div>
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 z-10 relative">
                        <h3 className="text-xl font-semibold mb-4">Booking Details for {selectedHotel.name}</h3>
                        {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Date Time:</label>
                                <input type="datetime-local" name="datetime" value={bookingDetails.datetime} onChange={handleInputChange} className="mt-1 p-2 border rounded-md w-full" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Number of Guests:</label>
                                <input type="number" name="guests" value={bookingDetails.guests} onChange={handleInputChange} className="mt-1 p-2 border rounded-md w-full" required />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button type="button" onClick={handleCloseModal} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-300">
                                    Cancel
                                </button>
                                <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300">
                                    Confirm Booking
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HotelBookingForm;
