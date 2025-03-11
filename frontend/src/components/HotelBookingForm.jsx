import React, { useState } from 'react';
import hotels from '../data/hotels.json';

const HotelBookingForm = () => {
  const [selectedHotel, setSelectedHotel] = useState(null);

  const handleBook = (hotelId) => {
    setSelectedHotel(hotels.find((hotel) => hotel.id === hotelId));
    console.log('Hotel booked: ', hotels.find((hotel) => hotel.id === hotelId));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 border rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Hotel Booking</h2>
      <ul className="space-y-4">
        {hotels.map((hotel) => (
          <li
            key={hotel.id}
            className="p-4 border rounded-lg shadow flex justify-between items-center bg-white hover:shadow-lg transition-shadow duration-300"
          >
            <div>
              <p className="text-lg font-medium">{hotel.name}</p>
              <p className="text-gray-600">{hotel.location}</p>
              <p className="text-gray-700">${hotel.price}</p>
            </div>
            <button
              onClick={() => handleBook(hotel.id)}
              className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Book
            </button>
          </li>
        ))}
      </ul>
      {selectedHotel && (
        <div className="mt-8 p-6 bg-blue-100 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Booking Confirmation</h3>
          <p className="text-gray-700">You have booked: {selectedHotel.name}</p>
        </div>
      )}
    </div>
  );
};

export default HotelBookingForm;